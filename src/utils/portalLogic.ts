export interface Student {
  id: string;
  name: string;
  nis: string;
  classGrade: string;
  category: string;
  coach: string;
  avatar: string;
  guardianName: string;
  phone: string;
  sppStatus: 'Lunas' | 'Belum Lunas';
  sppAmount: number;
  sppDueDate: string;
  sppPaidDate?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  day: string;
  date: string;
  time: string;
  category: string;
  location: string;
  coach: string;
  notes?: string;
  isUpcoming: boolean;
  attendanceStatus?: 'Hadir' | 'Izin' | 'Belum Presensi' | 'Selesai';
}

/**
 * Format number into Indonesian Rupiah currency format
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate QR code payload string for Student Digital ID card
 */
export function generateStudentQrPayload(student: Pick<Student, 'id' | 'nis' | 'name' | 'classGrade'>): string {
  return JSON.stringify({
    app: 'PORTAL_WALI_MURID',
    id: student.id,
    nis: student.nis,
    name: student.name,
    grade: student.classGrade,
    timestamp: Date.now(),
  });
}

/**
 * Filter upcoming schedules
 */
export function getUpcomingSchedules(schedules: ScheduleItem[], limit: number = 2): ScheduleItem[] {
  return schedules
    .filter((s) => s.isUpcoming)
    .slice(0, limit);
}

/**
 * Calculate SPP status summary
 */
export function calculateSppSummary(student: Student) {
  const isPaid = student.sppStatus === 'Lunas';
  return {
    status: student.sppStatus,
    isPaid,
    badgeColor: isPaid ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200',
    cardBorder: isPaid ? 'border-emerald-300' : 'border-rose-300',
    headerBg: isPaid ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-rose-500 to-red-600',
    actionText: isPaid ? 'Lihat Bukti Bayar' : 'Bayar Sekarang',
    message: isPaid ? 'Terima kasih, kewajiban SPP bulan ini telah terselesaikan.' : 'Harap melakukan pembayaran sebelum tanggal jatuh tempo.',
  };
}
