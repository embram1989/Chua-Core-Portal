import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatRupiah,
  generateStudentQrPayload,
  getUpcomingSchedules,
  calculateSppSummary,
  type Student,
  type ScheduleItem,
} from './portalLogic.ts';

const mockStudentPaid: Student = {
  id: 'STD-001',
  name: 'Bintang Pratama',
  nis: '2024-08-9921',
  classGrade: 'Kelas 4B / U-10',
  category: 'Akademi Sepakbola Junior',
  coach: 'Coach Bambang',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  guardianName: 'Bapak Hendra Pratama',
  phone: '081234567890',
  sppStatus: 'Lunas',
  sppAmount: 250000,
  sppDueDate: '10 November 2026',
  sppPaidDate: '03 November 2026',
};

const mockStudentUnpaid: Student = {
  ...mockStudentPaid,
  id: 'STD-002',
  name: 'Aisyah Putri',
  sppStatus: 'Belum Lunas',
  sppPaidDate: undefined,
};

const mockSchedules: ScheduleItem[] = [
  {
    id: 'SCH-1',
    title: 'Latihan Dribbling & Finishing',
    day: 'Senin',
    date: '27 Okt 2026',
    time: '15:00 - 17:00 WIB',
    category: 'Latihan Rutin',
    location: 'Lapangan Utama A',
    coach: 'Coach Bambang',
    isUpcoming: true,
  },
  {
    id: 'SCH-2',
    title: 'Uji Tanding Persahabatan (Friendly Match)',
    day: 'Rabu',
    date: '29 Okt 2026',
    time: '16:00 - 18:00 WIB',
    category: 'Pertandingan',
    location: 'Stadion Mini Arcamanik',
    coach: 'Coach Bambang & Coach Dian',
    isUpcoming: true,
  },
  {
    id: 'SCH-3',
    title: 'Latihan Fisik & Kelincahan',
    day: 'Sabtu',
    date: '01 Nov 2026',
    time: '07:30 - 09:30 WIB',
    category: 'Latihan Fisik',
    location: 'Gym & Lintasan Atletik',
    coach: 'Coach Dian',
    isUpcoming: true,
  },
  {
    id: 'SCH-0',
    title: 'Evaluasi Mingguan',
    day: 'Jumat Lalu',
    date: '20 Okt 2026',
    time: '15:00 WIB',
    category: 'Evaluasi',
    location: 'Ruang Teori',
    coach: 'Coach Bambang',
    isUpcoming: false,
  },
];

test('formatRupiah formats values to standard Indonesian currency', () => {
  const formatted = formatRupiah(250000);
  assert.match(formatted, /250\.000/);
});

test('generateStudentQrPayload produces valid JSON string containing NIS and Name', () => {
  const payloadStr = generateStudentQrPayload(mockStudentPaid);
  const parsed = JSON.parse(payloadStr);
  assert.equal(parsed.id, 'STD-001');
  assert.equal(parsed.nis, '2024-08-9921');
  assert.equal(parsed.name, 'Bintang Pratama');
});

test('getUpcomingSchedules filters only upcoming events and limits count', () => {
  const upcoming = getUpcomingSchedules(mockSchedules, 2);
  assert.equal(upcoming.length, 2);
  assert.equal(upcoming[0].id, 'SCH-1');
  assert.equal(upcoming[1].id, 'SCH-2');
});

test('calculateSppSummary returns correct status, badges and copy', () => {
  const paidSummary = calculateSppSummary(mockStudentPaid);
  assert.equal(paidSummary.status, 'Lunas');
  assert.equal(paidSummary.isPaid, true);
  assert.match(paidSummary.badgeColor, /emerald/);

  const unpaidSummary = calculateSppSummary(mockStudentUnpaid);
  assert.equal(unpaidSummary.status, 'Belum Lunas');
  assert.equal(unpaidSummary.isPaid, false);
  assert.match(unpaidSummary.badgeColor, /rose/);
});
