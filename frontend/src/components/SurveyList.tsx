import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { surveyApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import type { SurveySubmission } from '@/types';
import { Trash2, RefreshCw, BarChart3, Inbox, Calendar, User, Mail, Phone, MapPin, Globe } from 'lucide-react';

export function SurveyList() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<SurveySubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await surveyApi.getAllSubmissions(currentPage, 10);
      
      if (response.data) {
        setSubmissions(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
        setTotalSubmissions(response.pagination?.totalItems || 0);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load submissions',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) return;

    try {
      await surveyApi.deleteSubmission(id);
      toast({
        title: 'Success',
        description: 'Submission deleted successfully',
        variant: 'default',
        className: 'bg-green-50 text-green-900 border-green-200',
      });
      fetchSubmissions();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete submission',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col pt-0 w-full rounded-none">
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/80 to-slate-50 pointer-events-none" />

      <main className="container mx-auto py-8 px-4 sm:px-6 relative z-10 flex-grow">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-500" />
              Survey Submissions
            </h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Manage and review feedback from your users
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Card className="flex items-center gap-3 bg-white shadow-sm border-slate-200 px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <Inbox className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total</p>
                <p className="text-lg font-bold text-slate-900 leading-none">{totalSubmissions}</p>
              </div>
            </Card>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-300 text-slate-600 shadow-sm"
              onClick={fetchSubmissions}
              disabled={isLoading}
              title="Refresh submissions"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin text-indigo-500' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200">
            <RefreshCw className="h-10 w-10 animate-spin text-indigo-500 mb-4" />
            <p className="text-lg font-medium text-slate-600">Loading submissions...</p>
            <p className="text-sm text-slate-400 mt-1">Fetching latest data from server</p>
          </div>
        ) : submissions.length === 0 ? (
          <Card className="border-dashed border-2 bg-white/50 backdrop-blur-md">
            <CardContent className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Inbox className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-1">No Submissions Found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                There are currently no survey submissions available. Direct users to the survey form to start gathering responses.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission._id} className="overflow-hidden bg-white hover:shadow-md transition-all duration-300 border-slate-200">
                <div className="px-6 py-4 flex justify-between items-start sm:items-center border-b border-slate-100 bg-slate-50/50 flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-cyan-100 items-center justify-center">
                      <User className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900">{submission.name}</CardTitle>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{submission.email}</span>
                        <span className="hidden sm:inline text-slate-300">•</span>
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{submission.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-full opacity-90 hover:opacity-100 hover:scale-105 transition-all"
                      onClick={() => handleDelete(submission._id)}
                      title="Delete Submission"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Gender</p>
                      <p className="text-sm font-medium text-slate-800 bg-slate-50 inline-block px-3 py-1 rounded-md border border-slate-100">{submission.gender}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Nationality</p>
                      <p className="text-sm font-medium text-slate-800">{submission.nationality}</p>
                    </div>
                    
                    <div className="space-y-1 lg:col-span-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Located Address</p>
                      <p className="text-sm font-medium text-slate-800 line-clamp-2">{submission.address}</p>
                    </div>
                    
                    <div className="md:col-span-2 lg:col-span-4 bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/50 mt-2">
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Message inside</p>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">"{submission.message}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-8 pb-4">
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-200 hover:bg-white hover:text-indigo-600 h-10 px-5 font-semibold text-sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-500">Page</span>
                  <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {currentPage}
                  </span>
                  <span className="text-sm font-medium text-slate-500">of {totalPages}</span>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-200 hover:bg-white hover:text-indigo-600 h-10 px-5 font-semibold text-sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
