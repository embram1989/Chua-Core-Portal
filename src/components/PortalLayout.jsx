import React from 'react';
import { Home, Calendar, User, Bell, ChevronDown } from 'lucide-react';

/**
 * PortalLayout Component
 * Didesain khusus Mobile-First dengan kontainer max-w-md di tengah layar.
 * Memiliki Bottom Navigation Bar tetap di bagian bawah dengan 3 menu:
 * 1. Dashboard (Home)
 * 2. Jadwal (Calendar)
 * 3. Profil Anak (User)
 */
export default function PortalLayout({
  activeTab = 'dashboard',
  onTabChange,
  currentStudent,
  allStudents,
  onSelectStudent,
  children,
}) {
  const studentsList = allStudents || [];
  const [showStudentMenu, setShowStudentMenu] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jadwal', label: 'Jadwal', icon: Calendar },
    { id: 'profil', label: 'Profil Anak', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-800/10 flex justify-center py-0 sm:py-6 sm:px-4">
      {/* Container Layar HP: max-w-md mx-auto min-h-screen bg-gray-50 shadow-xl relative */}
      <div className="max-w-md w-full mx-auto min-h-screen bg-gray-50 shadow-2xl relative flex flex-col overflow-hidden sm:rounded-[36px] sm:border-[8px] sm:border-slate-800">
        
        {/* Top App Bar / Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-base shadow-sm shadow-indigo-200">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-slate-800 tracking-tight">Portal Wali Murid</h1>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Mobile
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Garuda Muda Academy</p>
            </div>
          </div>

          {/* Student Selector Switcher Pill */}
          {currentStudent && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowStudentMenu(!showStudentMenu)}
                className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition text-xs font-semibold text-slate-700 active:scale-95"
                title="Ganti Siswa"
                aria-label="Pilih Siswa"
              >
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-5 h-5 rounded-full object-cover border border-white"
                />
                <span className="truncate max-w-[85px] text-[11px] font-medium">{currentStudent.nickname}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Dropdown switch student */}
              {showStudentMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowStudentMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Pilih Data Anak
                    </div>
                    {studentsList.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => {
                          onSelectStudent?.(student.id);
                          setShowStudentMenu(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition ${
                          student.id === currentStudent.id
                            ? 'bg-indigo-50 text-indigo-900 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate">{student.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{student.classGrade}</p>
                        </div>
                        {student.id === currentStudent.id && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </header>

        {/* Konten Halaman Aktif (Dashboard / Jadwal / Profil) */}
        <main className="flex-1 pb-24 overflow-y-auto">
          {children}
        </main>

        {/* Bottom Navigation Bar (Menu Bawah Menempel / Fixed) */}
        <nav
          className="fixed sm:absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
          aria-label="Menu Utama Bawah"
        >
          <div className="flex items-center justify-around max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  aria-label={item.label}
                  className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-200 active:scale-95 relative ${
                    isActive
                      ? 'text-indigo-600 font-bold'
                      : 'text-slate-400 hover:text-slate-600 font-medium'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-xl transition-all ${
                      isActive ? 'bg-indigo-50 text-indigo-600 scale-110 shadow-xs' : 'text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

      </div>
    </div>
  );
}
