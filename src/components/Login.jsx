import React, { useState } from 'react';
import { ShieldCheck, Phone, IdCard, Sparkles, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Halaman Login (Login.jsx)
 * Memverifikasi data langsung ke koleksi "students" di Firestore menggunakan:
 * - ID Siswa (ID pendek visual, studentId)
 * - Nomor HP Wali (parentPhone)
 */
export default function Login({ onLoginSuccess }) {
  // 1. State Input untuk studentId dan parentPhone
  const [studentId, setStudentId] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [permissionNotice, setPermissionNotice] = useState('');

  // Validasi keamanan dasar: tombol submit dinonaktifkan jika salah satu input kosong
  const isInputEmpty = !studentId.trim() || !parentPhone.trim();

  // 2. Fungsi Verifikasi (handleLogin)
  const handleLogin = async (e) => {
    e?.preventDefault();
    if (isInputEmpty || isLoading) return;

    setErrorMessage('');
    setPermissionNotice('');
    setIsLoading(true);

    const cleanStudentId = studentId.trim();
    const cleanParentPhone = parentPhone.trim();

    try {
      // Query ke koleksi "students" dengan .trim()
      const studentsRef = collection(db, 'students');
      const q = query(
        studentsRef,
        where('studentId', '==', cleanStudentId),
        where('parentPhone', '==', cleanParentPhone)
      );

      const querySnapshot = await getDocs(q);

      // 3. Hasil Verifikasi
      if (!querySnapshot.empty) {
        // Ambil data dokumen pertama & sertakan id dokumen aslinya
        const firstDoc = querySnapshot.docs[0];
        const rawData = firstDoc.data();

        const studentData = {
          id: firstDoc.id,
          ...rawData,
          // Fallback properti default jika field visual belum lengkap di ERP
          studentId: rawData.studentId || cleanStudentId,
          nis: rawData.nis || rawData.studentId || cleanStudentId,
          name: rawData.name || rawData.studentName || rawData.namaLengkap || 'Siswa ' + cleanStudentId,
          nickname: rawData.nickname || rawData.namaPanggilan || (rawData.name ? rawData.name.split(' ')[0] : 'Siswa'),
          classGrade: rawData.classGrade || rawData.kelas || rawData.grade || 'Kelompok Siswa Aktif',
          category: rawData.category || rawData.kategori || 'Akademi Olahraga',
          coach: rawData.coach || rawData.pelatih || 'Pelatih Pembina',
          avatar: rawData.avatar || rawData.foto || 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&auto=format&fit=crop&q=80',
          parentPhone: cleanParentPhone,
          phone: rawData.phone || cleanParentPhone,
          guardianName: rawData.guardianName || rawData.namaWali || 'Wali Murid',
          guardianRelation: rawData.guardianRelation || 'Wali Murid',
          address: rawData.address || rawData.alamat || 'Alamat Terdaftar',
          birthDate: rawData.birthDate || rawData.tanggalLahir || '-',
          bloodType: rawData.bloodType || rawData.golDarah || 'O',
          sppStatus: rawData.sppStatus || 'Lunas',
          sppAmount: Number(rawData.sppAmount || rawData.nominalSpp || 250000),
          sppPeriod: rawData.sppPeriod || 'Bulan Ini',
          sppDueDate: rawData.sppDueDate || '10 Bulan Ini',
          vaNumber: rawData.vaNumber || '8801-' + cleanStudentId.slice(-4),
          attendanceRate: Number(rawData.attendanceRate || 95),
          totalSessions: Number(rawData.totalSessions || 16),
          attendedSessions: Number(rawData.attendedSessions || 15),
        };

        // Simpan ke localStorage dengan key 'activeStudent'
        localStorage.setItem('activeStudent', JSON.stringify(studentData));
        localStorage.setItem('activeStudentId', firstDoc.id);

        // Redirect pengguna ke /portal
        if (window.location.pathname !== '/portal') {
          window.history.pushState({}, '', '/portal');
        }

        onLoginSuccess?.(studentData);
      } else {
        // Jika data kosong: tampilkan pesan error spesifik
        setErrorMessage('Data ID Siswa atau Nomor HP tidak ditemukan.');
      }
    } catch (err) {
      console.error('Firestore login query error:', err);

      // Tangani jika Security Rules di Firebase Console belum mengizinkan read
      if (err?.code === 'permission-denied' || String(err?.message).includes('permissions')) {
        setPermissionNotice(
          'Catatan: Firestore Security Rules menolak pembacaan koleksi "students". Pastikan aturan keamanan (rules) di Firebase Console mengizinkan akses read.'
        );
      }

      setErrorMessage('Data ID Siswa atau Nomor HP tidak ditemukan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800/10 flex justify-center py-0 sm:py-6 sm:px-4">
      {/* Container Layar HP: max-w-md mx-auto */}
      <div className="max-w-md w-full mx-auto min-h-screen bg-gray-50 shadow-2xl relative flex flex-col justify-between p-6 sm:rounded-[36px] sm:border-[8px] sm:border-slate-800">
        
        {/* Header / Logo Dummy */}
        <div className="pt-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-200 mb-4 ring-4 ring-indigo-50">
            <ShieldCheck className="w-10 h-10 stroke-[2.2]" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Portal Wali Murid
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
            Masuk untuk memantau kehadiran, jadwal latihan, dan status iuran SPP siswa.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-[11px] text-indigo-700 font-semibold mt-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Terhubung ke Firestore ERP</span>
          </div>
        </div>

        {/* Form Login Verifikasi Firestore */}
        <div className="my-auto py-6">
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* 4. UI/UX Form Input 1: ID Siswa (otomatis uppercase saat user mengetik) */}
            <div>
              <label htmlFor="studentIdInput" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                ID Siswa
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IdCard className="w-4 h-4" />
                </div>
                <input
                  id="studentIdInput"
                  type="text"
                  value={studentId}
                  onChange={(e) => {
                    // Otomatis mengubah input menjadi huruf kapital (uppercase)
                    setStudentId(e.target.value.toUpperCase());
                    if (errorMessage) setErrorMessage('');
                    if (permissionNotice) setPermissionNotice('');
                  }}
                  placeholder="Masukkan ID Siswa (contoh: 2024-08-9921)"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 text-sm font-semibold uppercase placeholder:normal-case placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* 4. UI/UX Form Input 2: Nomor HP Wali bertipe tel & numpad */}
            <div>
              <label htmlFor="parentPhoneInput" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nomor HP Wali
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="parentPhoneInput"
                  type="tel"
                  inputMode="numeric"
                  value={parentPhone}
                  onChange={(e) => {
                    setParentPhone(e.target.value);
                    if (errorMessage) setErrorMessage('');
                    if (permissionNotice) setPermissionNotice('');
                  }}
                  placeholder="Nomor HP terdaftar (contoh: 081234567890)"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            {/* Pesan Error: "Data ID Siswa atau Nomor HP tidak ditemukan." */}
            {errorMessage && (
              <div
                className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs animate-in fade-in slide-in-from-top-1 duration-200"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-rose-800">{errorMessage}</p>
                  {permissionNotice && (
                    <p className="text-[11px] text-rose-600 mt-1 leading-relaxed">
                      {permissionNotice}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tombol Submit: Teks "Memeriksa data..." saat disubmit, dinonaktifkan jika kosong */}
            <button
              type="submit"
              disabled={isInputEmpty || isLoading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memeriksa data...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Info Petunjuk Verifikasi */}
          <div className="mt-5 p-3 bg-slate-100/80 rounded-2xl border border-slate-200/60 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Verifikasi Database Langsung:</p>
            <p>
              Data diverifikasi ke koleksi <span className="font-mono font-bold text-indigo-700">students</span> dengan field <span className="font-mono text-slate-700">studentId</span> dan <span className="font-mono text-slate-700">parentPhone</span>.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pb-2">
          <p className="text-xs text-slate-400">
            Kendala login? Hubungi Sekretariat Akademi di <span className="font-semibold text-indigo-600">0811-9876-5432</span>
          </p>
          <p className="text-[10px] text-slate-300 mt-1">
            Chua Sport Core • Database Terintegrasi
          </p>
        </div>

      </div>
    </div>
  );
}
