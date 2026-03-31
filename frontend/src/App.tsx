import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SurveyForm } from './components/SurveyForm';
import { AdminLogin } from './components/AdminLogin';
import { SurveyList } from './components/SurveyList';
import { Header } from './components/Header';
import { AdminHeader } from './components/AdminHeader';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" replace />
  );
}

function AppContent() {
  const { toast } = useToast();
  const location = window.location.pathname;
  const isAdminPage = location.startsWith('/admin/dashboard');

  useEffect(() => {
    if (!sessionStorage.getItem('welcomeToastShown')) {
      sessionStorage.setItem('welcomeToastShown', 'true');
      toast({
        title: "Welcome!",
        description: "Fill out the survey form or login as admin.",
      });
    }
  }, [toast]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {isAdminPage && <AdminHeader title="Submissions Dashboard" />}
        {!isAdminPage && <Header showAdminLink={false} />}
        <main className="flex-1 w-full relative">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SurveyForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <SurveyList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

function App() {
  return <AppContent />;
}

export default App;
