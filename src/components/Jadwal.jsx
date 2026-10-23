import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Shirt,
  Info,
  CheckCircle,
  AlertTriangle,
  User,
  Filter,
  Check,
} from 'lucide-react';

export default function Jadwal({ student, schedules }) {
  const scheduleList = schedules || [];
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'completed'
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState({});

  const filteredSchedules = scheduleList.filter((s) => {
    if (filter === 'upcoming') return s.isUpcoming;
    if (filter === 'completed') return !s.isUpcoming;
    return true;
  });

  const handleConfirmAttendance = (id, status) => {
    setConfirmStatus((prev) => ({ ...prev, [id]: status }));
    setSelectedSchedule(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Jadwal Latihan & Kegiatan
          </h2>
          <p className="text-xs text-slate-500">
            Jadwal aktif untuk <span className="font-bold text-indigo-600">{student?.name}</span>
          </p>
        </div>
        <div className="p-2 rounded-2xl bg-indigo-50 text-indigo-600">
          <CalendarIcon className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1 bg-slate-200/70 rounded-2xl text-xs font-semibold">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-xl transition ${
            filter === 'all'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Semua ({scheduleList.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('upcoming')}
          className={`flex-1 py-1.5 rounded-xl transition ${
            filter === 'upcoming'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Mendatang
        </button>
        <button
          type="button"
          onClick={() => setFilter('completed')}
          className={`flex-1 py-1.5 rounded-xl transition ${
            filter === 'completed'
              ? 'bg-white text-indigo-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Selesai
        </button>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3">
        {filteredSchedules.map((schedule) => {
          const attendance = confirmStatus[schedule.id] || schedule.statusText;
          const isConfirmedHadir = attendance === 'Hadir' || attendance.includes('Hadir');
          const isIzin = attendance === 'Izin / Berhalangan';

          return (
            <div
              key={schedule.id}
              className={`p-4 rounded-3xl bg-white border transition shadow-xs ${
                schedule.isUpcoming ? 'border-indigo-100 hover:border-indigo-300' : 'border-slate-200 opacity-90'
              }`}
            >
              {/* Top Row: Date badge + Category */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
                    <span className="block text-[10px] font-bold uppercase text-indigo-600">
                      {schedule.day}
                    </span>
                    <span className="block text-xs font-black text-slate-800">
                      {schedule.date.split(' ')[0]} {schedule.date.split(' ')[1]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {schedule.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 font-semibold text-indigo-700">
                        <Clock className="w-3 h-3 text-indigo-500" />
                        {schedule.time}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                  {schedule.category}
                </span>
              </div>

              {/* Location & Coach */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium truncate">{schedule.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium truncate">Pelatih: {schedule.coach}</span>
                </div>
                {schedule.uniform && (
                  <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50/70 px-2 py-1 rounded-xl text-[10px]">
                    <Shirt className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">Seragam: {schedule.uniform}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {schedule.notes && (
                <p className="text-[10px] text-slate-400 mt-2 bg-slate-50 p-2 rounded-xl italic">
                  💡 {schedule.notes}
                </p>
              )}

              {/* Status & Confirmation Button */}
              {schedule.isUpcoming && (
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">
                    Status Presensi:{' '}
                    <strong
                      className={
                        isConfirmedHadir
                          ? 'text-emerald-600'
                          : isIzin
                          ? 'text-amber-600'
                          : 'text-indigo-600'
                      }
                    >
                      {attendance}
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedSchedule(schedule)}
                    className="py-1 px-2.5 rounded-lg text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                  >
                    Konfirmasi Kehadiran
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Attendance confirmation popup modal */}
      {selectedSchedule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900">
              Konfirmasi Kehadiran Siswa
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Untuk kegiatan: <span className="font-semibold text-slate-800">{selectedSchedule.title}</span> ({selectedSchedule.day}, {selectedSchedule.time})
            </p>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => handleConfirmAttendance(selectedSchedule.id, 'Hadir')}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Pasti Hadir</span>
              </button>

              <button
                type="button"
                onClick={() => handleConfirmAttendance(selectedSchedule.id, 'Izin / Berhalangan')}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Izin Sakit / Berhalangan</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSchedule(null)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
