import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ArrowRight,
  Clock,
  MapPin,
  ChevronRight,
  CreditCard,
  Sparkles,
  Award,
  Bell,
  Copy,
  Check,
} from 'lucide-react';
import IDCardModal from './IDCardModal';
import { formatRupiah, calculateSppSummary, getUpcomingSchedules } from '../utils/portalLogic';

export default function Dashboard({
  student,
  schedules,
  onNavigateTab,
  onToggleSppStatus,
}) {
  const scheduleList = schedules || [];
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [copiedVa, setCopiedVa] = useState(false);

  if (!student) {
    return (
      <div className="p-6 text-center text-slate-500">
        Data siswa tidak ditemukan.
      </div>
    );
  }

  const sppSummary = calculateSppSummary(student);
  const upcomingSchedules = getUpcomingSchedules(scheduleList, 2);

  const handleCopyVa = () => {
    navigator.clipboard?.writeText(student.vaNumber);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  const handleSimulatePayment = () => {
    onToggleSppStatus?.(student.id);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      
      {/* Header Sambutan: "Halo, Wali Murid dari [Nama Siswa Dummy]" */}
      <section className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 rounded-3xl p-5 text-white shadow-lg shadow-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-indigo-100 text-[11px] font-medium backdrop-blur-xs mb-2">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Tahun Ajaran 2026/2027</span>
            </div>
            <h1 className="text-lg font-extrabold tracking-tight text-white leading-snug">
              Halo, Wali Murid dari <br />
              <span className="text-amber-300">{student.name}</span>
            </h1>
            <p className="text-xs text-indigo-100/90 mt-1">
              {student.classGrade} • {student.category}
            </p>
          </div>

          <img
            src={student.avatar}
            alt={student.name}
            className="w-13 h-13 rounded-2xl object-cover border-2 border-white/60 shadow-md shrink-0"
          />
        </div>

        {/* Quick summary strip */}
        <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-indigo-200 block uppercase font-medium">Kehadiran Latihan</span>
            <span className="font-bold text-white text-sm">{student.attendanceRate}%</span>
            <span className="text-[10px] text-indigo-200 ml-1">({student.attendedSessions}/{student.totalSessions} Sesi)</span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-200 block uppercase font-medium">Pelatih Pembina</span>
            <span className="font-bold text-white text-sm truncate block">{student.coach.split(',')[0]}</span>
          </div>
        </div>
      </section>

      {/* CARD 1: STATUS SPP (Kotak Hijau / Merah: "SPP Bulan Ini: Lunas / Belum Lunas") */}
      <section
        className={`rounded-3xl p-4.5 border-2 transition-all shadow-sm ${
          sppSummary.isPaid
            ? 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-emerald-200/90'
            : 'bg-gradient-to-br from-rose-50 via-red-50/40 to-white border-rose-200/90'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-xl ${
                sppSummary.isPaid
                  ? 'bg-emerald-500 text-white shadow-xs shadow-emerald-200'
                  : 'bg-rose-500 text-white shadow-xs shadow-rose-200'
              }`}
            >
              {sppSummary.isPaid ? (
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Administrasi Iuran
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 leading-none mt-0.5">
                SPP Bulan Ini:{' '}
                <span
                  className={
                    sppSummary.isPaid ? 'text-emerald-700' : 'text-rose-600'
                  }
                >
                  {sppSummary.status}
                </span>
              </h2>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-black border ${sppSummary.badgeColor}`}
          >
            {sppSummary.status.toUpperCase()}
          </span>
        </div>

        {/* SPP Content Details */}
        <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-end justify-between">
          <div>
            <p className="text-[11px] text-slate-500">
              Periode: <strong className="text-slate-700">{student.sppPeriod}</strong>
            </p>
            <p className="text-base font-extrabold text-slate-900 tracking-tight mt-0.5">
              {formatRupiah(student.sppAmount)}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {sppSummary.isPaid
                ? `Dibayar pada: ${student.sppPaidDate || 'Bulan ini'}`
                : `Jatuh tempo: ${student.sppDueDate}`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPaymentModalOpen(true)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition shadow-xs active:scale-95 flex items-center gap-1.5 ${
              sppSummary.isPaid
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{sppSummary.isPaid ? 'Kuitansi' : 'Bayar Sekarang'}</span>
          </button>
        </div>
      </section>

      {/* CARD 2: JADWAL TERDEKAT (Daftar 1-2 jadwal latihan terdekat) */}
      <section className="bg-white rounded-3xl p-4.5 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Calendar className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Jadwal Terdekat
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                Agenda sesi latihan dan kegiatan terdekat
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('jadwal')}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 transition"
          >
            <span>Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List 1-2 Jadwal */}
        <div className="space-y-2.5">
          {upcomingSchedules.length > 0 ? (
            upcomingSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="p-3 bg-slate-50 hover:bg-indigo-50/40 rounded-2xl border border-slate-200/70 transition flex items-start gap-3"
              >
                {/* Day / Date Badge */}
                <div className="w-14 shrink-0 rounded-xl bg-white border border-slate-200 p-1.5 text-center shadow-2xs">
                  <span className="block text-[10px] font-bold uppercase text-indigo-600 tracking-wider">
                    {schedule.day}
                  </span>
                  <span className="block text-xs font-black text-slate-800">
                    {schedule.date.split(' ')[0]} {schedule.date.split(' ')[1]}
                  </span>
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {schedule.title}
                    </h3>
                    <span className="shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100/70 text-indigo-800">
                      {schedule.category}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      {schedule.time}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{schedule.location}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic text-center py-3">
              Tidak ada jadwal latihan terdekat saat ini.
            </p>
          )}
        </div>
      </section>

      {/* CARD 3: ID CARD DIGITAL (Tombol modal berisi QR Code dengan react-qr-code) */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-4.5 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none pr-3 pb-3">
          <QrCode className="w-28 h-28 text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/10 text-amber-300 backdrop-blur-xs">
                <QrCode className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                  Kartu Siswa Digital
                </span>
                <h2 className="text-sm font-extrabold text-white">
                  ID Card & QR Presensi
                </h2>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/15 text-slate-200">
              NIS: {student.nis}
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-2.5 max-w-[260px] leading-relaxed">
            Gunakan QR Code digital siswa ini untuk absensi mandiri saat datang ke sesi latihan.
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsIdModalOpen(true)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-amber-400/20"
            >
              <QrCode className="w-4 h-4 stroke-[2.5]" />
              <span>Buka Kartu ID & QR Siswa</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Announcement / Notification Card */}
      <section className="bg-white rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
          <Bell className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-amber-700 uppercase">Pengumuman Terbaru</p>
          <p className="text-xs font-bold text-slate-800 truncate">Libur Nasional & Jadwal Pengganti</p>
          <p className="text-[10px] text-slate-400 truncate">Cek detail penyesuaian lapangan di menu Jadwal.</p>
        </div>
      </section>

      {/* Modal ID Card Digital with react-qr-code */}
      <IDCardModal
        student={student}
        isOpen={isIdModalOpen}
        onClose={() => setIsIdModalOpen(false)}
      />

      {/* Payment Simulator / Detail Modal */}
      {isPaymentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-5 border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-800">
                  {student.sppStatus === 'Lunas' ? 'Kuitansi Pembayaran SPP' : 'Pembayaran SPP Siswa'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Nama Siswa:</span>
                  <span className="font-bold text-slate-800">{student.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Periode Tagihan:</span>
                  <span className="font-bold text-slate-800">{student.sppPeriod}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Nominal:</span>
                  <span className="font-bold text-indigo-600 text-sm">{formatRupiah(student.sppAmount)}</span>
                </div>
                <div className="flex justify-between py-1 border-t border-slate-200 mt-1 pt-1">
                  <span className="text-slate-500">Status Saat Ini:</span>
                  <span className={`font-bold ${student.sppStatus === 'Lunas' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {student.sppStatus}
                  </span>
                </div>
              </div>

              {student.sppStatus === 'Belum Lunas' ? (
                <>
                  <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 block">
                      Nomor Virtual Account (BCA / Mandiri / BRI)
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-sm font-extrabold text-slate-900">
                        {student.vaNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyVa}
                        className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold flex items-center gap-1 transition"
                      >
                        {copiedVa ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedVa ? 'Disalin' : 'Salin VA'}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-200 flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi Pembayaran (Simulasi Lunas)</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-emerald-900">Pembayaran Sukses Terverifikasi</p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Dibayar pada {student.sppPaidDate || '02 Okt 2026, 09:15 WIB'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      // Toggle back to Belum Lunas for easy testing of both states
                      onToggleSppStatus?.(student.id);
                      setIsPaymentModalOpen(false);
                    }}
                    className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                  >
                    Ubah Kembali ke "Belum Lunas" (Tes Preview)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
