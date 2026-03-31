import { Link, useNavigate } from 'react-router-dom';
import { FileText, LogOut, ArrowLeft } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title = "Admin Dashboard" }: AdminHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-indigo-600/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center space-x-3 group transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-colors">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
              <p className="text-xs text-white/80 font-medium tracking-wide hidden sm:block">Manage Submissions</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-white/90 font-medium hover:text-white hover:bg-white/10 px-3 sm:px-4 py-2.5 rounded-xl transition-all text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">View Survey</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 sm:px-4 py-2.5 rounded-xl transition-all shadow-sm text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
