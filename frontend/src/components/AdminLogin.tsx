import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, User, Lock, LogIn } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login(credentials);
      
      if (response.data) {
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin dashboard!',
          variant: 'default',
          className: "bg-green-50 text-green-900 border-green-200 shadow-lg",
        });

        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials. Please try again.';
      
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden bg-slate-50 flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] sm:top-0 right-[-10%] sm:right-[10%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-indigo-300/30 blur-[80px] sm:blur-[100px] animate-pulse mix-blend-multiply" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] sm:bottom-[10%] left-[-5%] sm:left-[10%] w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] rounded-full bg-cyan-300/30 blur-[100px] sm:blur-[120px] animate-pulse mix-blend-multiply" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <Card className="w-full max-w-md mx-auto border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl relative z-10 transition-all duration-300">
        <CardHeader className="text-center space-y-4 pb-6 pt-8 border-b border-slate-100/50">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-200/50">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Admin Login
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Securely access the management dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-8 px-6 sm:px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2.5 group">
              <Label htmlFor="username" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="bg-white/50 border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl h-11"
                required
              />
            </div>

            <div className="space-y-2.5 group">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-white/50 border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl h-11"
                required
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold text-base shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/60 transform transition-all duration-200 hover:-translate-y-0.5" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Sign In to Dashboard
                    <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
