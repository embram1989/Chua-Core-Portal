import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Award,
  CreditCard,
  LogOut,
  Users,
  CheckCircle,
  Clock,
  Shield,
  FileText,
} from 'lucide-react';
import { formatRupiah } from '../utils/portalLogic';
import { PAYMENT_HISTORIES } from '../data/mockData';

export default function ProfilAnak({
  student,
  allStudents,
  onSelectStudent,
  onLogout,
}) {
  const studentsList = allStudents || [];
  const [activeSubTab, setActiveSubTab] = useState('biodata'); // 'biodata' | 'spp_history'
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!student) return null;

  const paymentHistory = PAYMENT_HISTORIES[student.id] || [];

  return (
    <div className="p-4 space-y-4">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600" />
        
        <div className="relative pt-6">
          <div className="relative inline-block">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-white shadow-lg mx-auto"
            />
            <span className="absolute bottom-0 right-0 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white shadow-xs" />
          </div>

          <h2 className="text-base font-extrabold text-slate-900 mt-2 tracking-tight">
            {student.name}
          </h2>
          <p className="text-xs font-mono font-semibold text-indigo-600">
            NIS: {student.nis}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {student.classGrade}
          </p>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle className="w-3 h-3" />
              Siswa Aktif
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Shield className="w-3 h-3" />
              {student.category.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Switch child selector if parent has multiple registered students */}
      {studentsList.length > 1 && (
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2 px-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Pilih Profil Anak:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {studentsList.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectStudent?.(s.id)}
                className={`p-2 rounded-xl flex items-center gap-2 text-left transition ${
                  s.id === student.id
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-300 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs'
                }`}
              >
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="text-xs truncate">{s.nickname}</div>
                  <div className="text-[10px] text-slate-400 truncate">{s.classGrade.split(' ')[0]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sub tabs: Biodata vs Riwayat SPP */}
      <div className="flex p-1 bg-slate-200/60 rounded-2xl text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSubTab('biodata')}
          className={`flex-1 py-1.5 rounded-xl transition ${
            activeSubTab === 'biodata'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'text-slate-600'
          }`}
        >
          Data Siswa & Wali
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('spp_history')}
          className={`flex-1 py-1.5 rounded-xl transition ${
            activeSubTab === 'spp_history'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'text-slate-600'
          }`}
        >
          Riwayat SPP ({paymentHistory.length})
        </button>
      </div>

      {activeSubTab === 'biodata' ? (
        <div className="space-y-3">
          {/* Card Data Siswa */}
          <div className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span>Informasi Akademik Siswa</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Tanggal Lahir / Usia</span>
                <span className="font-bold text-slate-800">{student.birthDate}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Golongan Darah</span>
                <span className="font-bold text-slate-800">{student.bloodType}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl col-span-2">
                <span className="text-[10px] text-slate-400 block">Cabang & Kelompok</span>
                <span className="font-bold text-slate-800">{student.category}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl col-span-2">
                <span className="text-[10px] text-slate-400 block">Pelatih Pembina</span>
                <span className="font-bold text-slate-800">{student.coach}</span>
              </div>
            </div>
          </div>

          {/* Card Data Wali Murid */}
          <div className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              <span>Data Wali Murid & Kontak</span>
            </h3>

            <div className="space-y-2 pt-1">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Nama Wali:</span>
                <span className="font-bold text-slate-800">{student.guardianName} ({student.guardianRelation})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Nomor Telepon/WA:</span>
                <span className="font-bold text-indigo-600 font-mono">{student.phone}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Alamat Domisili:</span>
                <span className="font-medium text-slate-700 text-right max-w-[200px]">{student.address}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Riwayat Pembayaran SPP */
        <div className="space-y-2.5">
          {paymentHistory.map((pay) => (
            <div
              key={pay.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    pay.status === 'Lunas'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{pay.month}</h4>
                  <p className="text-[10px] text-slate-400">{pay.method} • {pay.date}</p>
                  <p className="text-[9px] font-mono text-slate-400">{pay.receiptNumber}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-slate-900 block">
                  {formatRupiah(pay.amount)}
                </span>
                <span
                  className={`inline-block mt-0.5 px-2 py-0.5 rounded-md text-[9px] font-bold ${
                    pay.status === 'Lunas'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {pay.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Logout button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Portal</span>
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Konfirmasi Keluar?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Anda akan kembali ke halaman login Portal Wali Murid.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout?.();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
