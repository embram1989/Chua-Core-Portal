import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import PortalLayout from './components/PortalLayout';
import Dashboard from './components/Dashboard';
import Jadwal from './components/Jadwal';
import ProfilAnak from './components/ProfilAnak';
import { INITIAL_STUDENTS, INITIAL_SCHEDULES, StudentData } from './data/mockData';

export default function App() {
  // Ambil data siswa yang tersimpan di localStorage (jika ada)
  const getStoredStudent = (): StudentData | null => {
    try {
      const stored = localStorage.getItem('activeStudent');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Gagal membaca activeStudent dari localStorage:', e);
    }
    return null;
  };

  const initialStored = getStoredStudent();
  const searchParams = new URLSearchParams(window.location.search);
  const autostart = searchParams.get('autostart') === '1' || searchParams.get('preview') === '1';

  // Status login aktif jika ada sesi localStorage, autostart, atau path /portal
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return Boolean(initialStored || autostart || window.location.pathname.startsWith('/portal'));
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState<StudentData[]>(() => {
    if (initialStored) {
      const exists = INITIAL_STUDENTS.some((s) => s.id === initialStored.id);
      return exists ? INITIAL_STUDENTS : [initialStored, ...INITIAL_STUDENTS];
    }
    return INITIAL_STUDENTS;
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    return initialStored?.id || 'STD-001';
  });

  const [schedulesMap, setSchedulesMap] = useState(INITIAL_SCHEDULES);

  // Siswa aktif saat ini
  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const currentSchedules = schedulesMap[selectedStudentId] || schedulesMap['STD-001'] || [];

  // Sinkronisasi saat URL browser berubah (misal tombol Back)
  useEffect(() => {
    const handlePopState = () => {
      const hasActive = Boolean(localStorage.getItem('activeStudent'));
      if (window.location.pathname.startsWith('/portal') || hasActive) {
        setIsLoggedIn(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = (studentData?: any) => {
    if (studentData && studentData.id) {
      setStudents((prev) => {
        const index = prev.findIndex((s) => s.id === studentData.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = { ...updated[index], ...studentData };
          return updated;
        }
        return [studentData, ...prev];
      });
      setSelectedStudentId(studentData.id);
    }
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('activeStudent');
    localStorage.removeItem('activeStudentId');
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  // Toggle SPP status untuk testing demonstrasi
  const handleToggleSppStatus = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const newStatus: 'Lunas' | 'Belum Lunas' = s.sppStatus === 'Lunas' ? 'Belum Lunas' : 'Lunas';
        const updatedStudent: StudentData = {
          ...s,
          sppStatus: newStatus,
          sppPaidDate:
            newStatus === 'Lunas'
              ? 'Hari ini, ' +
                new Date().toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                }) +
                ' WIB'
              : undefined,
        };
        // Update di localStorage juga
        if (localStorage.getItem('activeStudentId') === studentId) {
          localStorage.setItem('activeStudent', JSON.stringify(updatedStudent));
        }
        return updatedStudent;
      })
    );
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <PortalLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      currentStudent={currentStudent}
      allStudents={students}
      onSelectStudent={(id: string) => setSelectedStudentId(id)}
    >
      {activeTab === 'dashboard' && (
        <Dashboard
          student={currentStudent}
          schedules={currentSchedules}
          onNavigateTab={setActiveTab}
          onToggleSppStatus={handleToggleSppStatus}
        />
      )}

      {activeTab === 'jadwal' && (
        <Jadwal
          student={currentStudent}
          schedules={currentSchedules}
        />
      )}

      {activeTab === 'profil' && (
        <ProfilAnak
          student={currentStudent}
          allStudents={students}
          onSelectStudent={(id: string) => setSelectedStudentId(id)}
          onLogout={handleLogout}
        />
      )}
    </PortalLayout>
  );
}
