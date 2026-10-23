import React from 'react';
import QRCode from 'react-qr-code';
import { X, Award, CheckCircle2, QrCode, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { generateStudentQrPayload } from '../utils/portalLogic';

export default function IDCardModal({ student, isOpen, onClose }) {
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  if (!isOpen || !student) return null;

  const qrValue = generateStudentQrPayload({
    id: student.id,
    nis: student.nis,
    name: student.name,
    classGrade: student.classGrade,
  });

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="idCardTitle"
    >
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Controls */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 id="idCardTitle" className="text-sm font-bold tracking-tight">
              Kartu Siswa Digital (ID Card)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Kartu Siswa"
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Digital Card Body */}
        <div className="p-5">
          <div className="rounded-2xl border-2 border-indigo-100 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 p-4 shadow-sm relative overflow-hidden">
            
            {/* Watermark / Background design */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-xl pointer-events-none" />

            {/* Header Sekolah / Akademi */}
            <div className="flex items-center justify-between border-b border-indigo-100/80 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                  G
                </div>
                <div>
                  <div className="text-[11px] font-black tracking-wide text-indigo-950 uppercase">
                    Garuda Muda Academy
                  </div>
                  <div className="text-[9px] text-slate-500 font-medium">
                    Kartu Anggota Resmi Siswa
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>AKTIF</span>
              </div>
            </div>

            {/* Student Info & Photo */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-1 shadow-xs">
                  <Award className="w-3 h-3 stroke-[2.5]" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 text-sm truncate leading-snug">
                  {student.name}
                </h3>
                <div className="text-[11px] font-mono font-semibold text-indigo-700 mt-0.5">
                  NIS: {student.nis}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {student.classGrade}
                </div>
                <div className="text-[9px] text-slate-400 truncate">
                  Gol. Darah: <span className="font-semibold text-slate-600">{student.bloodType || 'O'}</span> • Pelatih: <span className="font-semibold text-slate-600">{student.coach.split(',')[0]}</span>
                </div>
              </div>
            </div>

            {/* QR Code Container with react-qr-code */}
            <div className="bg-white p-3.5 rounded-xl border border-indigo-100 flex flex-col items-center justify-center shadow-inner">
              <div className="p-2 bg-white rounded-lg">
                <QRCode
                  value={qrValue}
                  size={140}
                  level="M"
                  fgColor="#1e1b4b"
                  bgColor="#ffffff"
                />
              </div>
              <div className="text-center mt-2">
                <p className="font-mono text-xs font-bold text-slate-800 tracking-wider">
                  {student.nis}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-center gap-1">
                  <QrCode className="w-3 h-3 text-indigo-500" />
                  <span>Pindai untuk presensi kehadiran</span>
                </p>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleSimulateDownload}
              className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? '✓ Tersimpan di Galeri' : 'Simpan ID Card'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition active:scale-95"
            >
              Tutup
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center mt-2.5">
            Tunjukkan QR code ini kepada petugas/pelatih saat tiba di sesi latihan.
          </p>
        </div>

      </div>
    </div>
  );
}
