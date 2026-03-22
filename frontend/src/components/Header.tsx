import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface HeaderProps {
  showAdminLink?: boolean;
}

export function Header({ showAdminLink = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-indigo-600/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-colors">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">SurveyForm</h1>
          </Link>
          
          {showAdminLink && (
            <nav className="flex items-center space-x-4">
              <Link
                to="/admin/login"
                className="text-white/90 font-medium hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all"
              >
                Admin Access
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
