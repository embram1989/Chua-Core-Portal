export interface StudentData {
  id: string;
  name: string;
  nickname: string;
  nis: string;
  classGrade: string;
  category: string;
  coach: string;
  avatar: string;
  gender: string;
  birthDate: string;
  bloodType: string;
  guardianName: string;
  guardianRelation: string;
  phone: string;
  address: string;
  sppStatus: 'Lunas' | 'Belum Lunas';
  sppAmount: number;
  sppPeriod: string;
  sppDueDate: string;
  sppPaidDate?: string;
  vaNumber: string;
  attendanceRate: number;
  totalSessions: number;
  attendedSessions: number;
}

export const INITIAL_STUDENTS: StudentData[] = [
  {
    id: 'STD-001',
    name: 'Bintang Pratama',
    nickname: 'Bintang',
    nis: '2024-08-9921',
    classGrade: 'Kelompok U-10 (Kelas 4B)',
    category: 'Akademi Sepakbola & Futsal Junior',
    coach: 'Coach Bambang Pamungkas, S.Pd',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&auto=format&fit=crop&q=80',
    gender: 'Laki-laki',
    birthDate: '12 Mei 2016 (10 Tahun)',
    bloodType: 'O',
    guardianName: 'Bapak Hendra Pratama',
    guardianRelation: 'Ayah Kandung',
    phone: '0812-3456-7890',
    address: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan',
    sppStatus: 'Lunas',
    sppAmount: 250000,
    sppPeriod: 'Oktober 2026',
    sppDueDate: '10 Oktober 2026',
    sppPaidDate: '02 Oktober 2026, 09:15 WIB',
    vaNumber: '8801-9921-8472-001',
    attendanceRate: 94,
    totalSessions: 16,
    attendedSessions: 15,
  },
  {
    id: 'STD-002',
    name: 'Aisyah Putri Pratama',
    nickname: 'Aisyah',
    nis: '2025-01-1044',
    classGrade: 'Kelompok U-7 (Kelas 1A)',
    category: 'Sanggar Senam & Tari Artistik',
    coach: 'Kak Siti Nurhaliza, M.Sn',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    gender: 'Perempuan',
    birthDate: '24 September 2019 (7 Tahun)',
    bloodType: 'A',
    guardianName: 'Bapak Hendra Pratama',
    guardianRelation: 'Ayah Kandung',
    phone: '0812-3456-7890',
    address: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan',
    sppStatus: 'Belum Lunas',
    sppAmount: 250000,
    sppPeriod: 'Oktober 2026',
    sppDueDate: '10 Oktober 2026',
    sppPaidDate: undefined,
    vaNumber: '8801-1044-8472-002',
    attendanceRate: 88,
    totalSessions: 16,
    attendedSessions: 14,
  },
];

export interface ScheduleEvent {
  id: string;
  title: string;
  day: string;
  date: string;
  time: string;
  category: 'Latihan Rutin' | 'Pertandingan' | 'Fisik' | 'Ujian / Evaluasi';
  location: string;
  coach: string;
  uniform: string;
  notes: string;
  isUpcoming: boolean;
  statusText: string;
}

export const INITIAL_SCHEDULES: Record<string, ScheduleEvent[]> = {
  'STD-001': [
    {
      id: 'SCH-01',
      title: 'Latihan Pemula & Ball Mastery',
      day: 'Senin',
      date: '27 Okt 2026',
      time: '15:00 - 17:00 WIB',
      category: 'Latihan Rutin',
      location: 'Lapangan Rumput Sintetis A',
      coach: 'Coach Bambang',
      uniform: 'Jersey Biru Utama + Kaos Kaki Panjang',
      notes: 'Wajib membawa botol air minum pribadi dan pelindung tulang kering (deker).',
      isUpcoming: true,
      statusText: 'Terjadwal',
    },
    {
      id: 'SCH-02',
      title: 'Latihan Taktik & Game Situations',
      day: 'Rabu',
      date: '29 Okt 2026',
      time: '15:30 - 17:30 WIB',
      category: 'Latihan Rutin',
      location: 'Lapangan Utama Arcamanik',
      coach: 'Coach Dian & Coach Bambang',
      uniform: 'Jersey Putih Latihan',
      notes: 'Fokus koordinasi passing segitiga dan penyelesaian akhir (finishing).',
      isUpcoming: true,
      statusText: 'Terjadwal',
    },
    {
      id: 'SCH-03',
      title: 'Uji Tanding Friendly Match vs SSB Bintang Muda',
      day: 'Sabtu',
      date: '01 Nov 2026',
      time: '08:00 - 10:30 WIB',
      category: 'Pertandingan',
      location: 'Stadion Mini Arcamanik',
      coach: 'Coach Bambang',
      uniform: 'Jersey Biru Utama (Matchday)',
      notes: 'Kumpul 30 menit sebelum kick-off untuk pemanasan bersama.',
      isUpcoming: true,
      statusText: 'Mendatang',
    },
    {
      id: 'SCH-04',
      title: 'Latihan Ketahanan & Kelincahan (Agility)',
      day: 'Kamis Lalu',
      date: '23 Okt 2026',
      time: '15:00 - 17:00 WIB',
      category: 'Fisik',
      location: 'Gym & Lintasan Atletik',
      coach: 'Coach Dian',
      uniform: 'Kaos Olahraga Bebas Rapi',
      notes: 'Pengukuran VO2 Max dan sprint 20 meter.',
      isUpcoming: false,
      statusText: 'Selesai (Hadir)',
    },
  ],
  'STD-002': [
    {
      id: 'SCH-11',
      title: 'Senam Irama & Kelenturan Dasar',
      day: 'Selasa',
      date: '28 Okt 2026',
      time: '14:00 - 15:30 WIB',
      category: 'Latihan Rutin',
      location: 'Studio Tari Lantai 2',
      coach: 'Kak Siti Nurhaliza',
      uniform: 'Leotard Pink + Legging Hitam',
      notes: 'Membawa pita senam dan handuk kecil.',
      isUpcoming: true,
      statusText: 'Terjadwal',
    },
    {
      id: 'SCH-12',
      title: 'Koreografi Panggung & Ekspresi Gerak',
      day: 'Jumat',
      date: '31 Okt 2026',
      time: '14:30 - 16:00 WIB',
      category: 'Latihan Rutin',
      location: 'Studio Tari Lantai 2',
      coach: 'Kak Siti Nurhaliza',
      uniform: 'Kostum Latihan Khusus',
      notes: 'Persiapan pertunjukan akhir semester bulan Desember.',
      isUpcoming: true,
      statusText: 'Terjadwal',
    },
  ],
};

export interface PaymentHistory {
  id: string;
  month: string;
  amount: number;
  status: 'Lunas' | 'Belum Lunas' | 'Menunggu Verifikasi';
  date: string;
  method: string;
  receiptNumber: string;
}

export const PAYMENT_HISTORIES: Record<string, PaymentHistory[]> = {
  'STD-001': [
    {
      id: 'PAY-10',
      month: 'Oktober 2026',
      amount: 250000,
      status: 'Lunas',
      date: '02 Okt 2026',
      method: 'BCA Virtual Account',
      receiptNumber: 'RCP/2026/10/00912',
    },
    {
      id: 'PAY-09',
      month: 'September 2026',
      amount: 250000,
      status: 'Lunas',
      date: '04 Sep 2026',
      method: 'Mandiri Virtual Account',
      receiptNumber: 'RCP/2026/09/00845',
    },
    {
      id: 'PAY-08',
      month: 'Agustus 2026',
      amount: 250000,
      status: 'Lunas',
      date: '05 Agu 2026',
      method: 'QRIS Gopay',
      receiptNumber: 'RCP/2026/08/00732',
    },
  ],
  'STD-002': [
    {
      id: 'PAY-20',
      month: 'Oktober 2026',
      amount: 250000,
      status: 'Belum Lunas',
      date: 'Batas: 10 Okt 2026',
      method: 'Menunggu Pembayaran',
      receiptNumber: 'INV/2026/10/01140',
    },
    {
      id: 'PAY-19',
      month: 'September 2026',
      amount: 250000,
      status: 'Lunas',
      date: '06 Sep 2026',
      method: 'BCA Virtual Account',
      receiptNumber: 'RCP/2026/09/01011',
    },
  ],
};

export const ANNOUNCEMENTS = [
  {
    id: 'ANN-1',
    title: 'Libur Nasional & Jadwal Pengganti',
    date: '24 Okt 2026',
    desc: 'Latihan pada hari libur nasional akan dialihkan ke sesi akhir pekan. Silakan cek menu Jadwal.',
    tag: 'Info Penting',
  },
  {
    id: 'ANN-2',
    title: 'Pengukuran Seragam Musim Baru 2027',
    date: '20 Okt 2026',
    desc: 'Wali murid dipersilakan melakukan fitting ukuran jersey baru di sekretariat hingga akhir bulan.',
    tag: 'Akademik',
  },
];
