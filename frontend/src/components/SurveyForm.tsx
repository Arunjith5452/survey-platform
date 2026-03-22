'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { surveyApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import type { SurveyFormData } from '@/types';
import { FileText, Send, User, Globe, Mail, Phone, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';

const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say',
] as const;

export function SurveyForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<SurveyFormData>({
    name: '',
    gender: 'Male',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [website] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let filteredValue = value;
    if (name === 'phone') {
      filteredValue = value.replace(/[^\d+()\-\s]/g, '');
    } else if (name === 'name' || name === 'nationality') {
      filteredValue = value.replace(/[^A-Za-z\s]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: filteredValue }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGenderChange = (gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say') => {
    setFormData(prev => ({ ...prev, gender }));
    if (fieldErrors.gender) {
      setFieldErrors(prev => ({ ...prev, gender: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (website) {
      toast({
        title: 'Success!',
        description: 'Your survey has been submitted successfully.',
        variant: 'default',
        className: "bg-green-50 text-green-900 border-green-200",
      });
      setFormData({
        name: '', gender: 'Male', nationality: '', email: '', phone: '', address: '', message: '',
      });
      return;
    }

    setIsLoading(true);

    try {
      await surveyApi.submitSurvey(formData);
      
      toast({
        title: 'Survey Submitted!',
        description: 'Thank you for your valuable feedback.',
        variant: 'default',
        className: "bg-green-50 text-green-900 border-green-200 shadow-lg",
        action: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      });

      // Reset form
      setFormData({
        name: '', gender: 'Male', nationality: '', email: '', phone: '', address: '', message: '',
      });
      setFieldErrors({});
    } catch (error: any) {
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errors: Record<string, string> = {};
        error.response.data.errors.forEach((err: any) => {
          if (err.field) errors[err.field] = err.message;
        });
        setFieldErrors(errors);
        
        toast({
          title: 'Validation Failed',
          description: 'Please check the highlighted fields and try again.',
          variant: 'destructive',
        });
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to submit survey. Please try again.';
        toast({
          title: 'Submission Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-indigo-300/30 blur-[100px] animate-pulse mix-blend-multiply" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-cyan-300/30 blur-[120px] animate-pulse mix-blend-multiply" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-72 h-72 rounded-full bg-purple-300/30 blur-[90px] animate-pulse mix-blend-multiply" style={{ animationDuration: '9s', animationDelay: '1s' }} />
      </div>

      <Card className="w-full max-w-4xl mx-auto border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl relative z-10 transition-all duration-300">
        <CardHeader className="text-center space-y-4 pb-8 pt-10 border-b border-slate-100/50">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-200/50 transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600">
              Customer Feedback Survey
            </CardTitle>
            <CardDescription className="text-base text-slate-500 max-w-lg mx-auto">
              We value your opinion. Please take a moment to fill out this form to help us improve our services.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pt-8 px-6 sm:px-10 pb-10">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={() => {}}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Name */}
              <div className="space-y-2.5 group">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ram raj "
                  className={`bg-white/50 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl h-11 ${fieldErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 bg-red-50/50' : 'border-slate-200'}`}
                  required
                />
                {fieldErrors.name && (
                  <p className="text-[13px] font-medium text-red-500 mt-1.5 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2.5 group">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ram@example.com"
                  className={`bg-white/50 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl h-11 ${fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 bg-red-50/50' : 'border-slate-200'}`}
                  required
                />
                {fieldErrors.email && (
                  <p className="text-[13px] font-medium text-red-500 mt-1.5 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2.5 group">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567810"
                  className={`bg-white/50 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl h-11 ${fieldErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 bg-red-50/50' : 'border-slate-200'}`}
                  required
                />
                {fieldErrors.phone && (
                  <p className="text-[13px] font-medium text-red-500 mt-1.5 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* Nationality */}
              <div className="space-y-2.5 group">
                <Label htmlFor="nationality" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  Nationality <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="e.g. India, American, Canadian"
                  className={`bg-white/50 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl h-11 ${fieldErrors.nationality ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 bg-red-50/50' : 'border-slate-200'}`}
                  required
                />
                {fieldErrors.nationality && (
                  <p className="text-[13px] font-medium text-red-500 mt-1.5 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                    {fieldErrors.nationality}
                  </p>
                )}
              </div>
            </div>

            {/* Gender Selection - Interactive Cards */}
            <div className="space-y-3 pt-2">
              <Label className="text-sm font-semibold text-slate-700">
                Gender <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GENDER_OPTIONS.map((option) => {
                  const isSelected = formData.gender === option;
                  return (
                    <label 
                      key={option} 
                      className={`
                        relative flex cursor-pointer rounded-xl border p-4 text-center items-center justify-center
                        transition-all duration-200 ease-in-out select-none
                        ${isSelected 
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-500 text-indigo-700' 
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'}
                      `}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={isSelected}
                        onChange={() => handleGenderChange(option)}
                        className="sr-only"
                        required
                      />
                      <span className={`text-sm font-medium ${isSelected ? 'font-semibold' : 'font-medium'}`}>
                        {option}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-indigo-500 opacity-60" />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="space-y-2.5 group">
              <Label htmlFor="address" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                Full Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country, ZIP"
                className={`bg-white/50 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm rounded-xl h-11 ${fieldErrors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 bg-red-50/50' : 'border-slate-200'}`}
                required
              />
              {fieldErrors.address && (
                <p className="text-[13px] font-medium text-red-500 mt-1.5 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                  {fieldErrors.address}
                </p>
              )}
            </div>

            {/* Message - Full Width Textarea */}
            <div className="space-y-2.5 group">
              <Label htmlFor="message" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                Additional Message <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please share any additional thoughts or feedback here..."
                rows={4}
                className={`flex w-full rounded-xl border bg-white/50 px-4 py-3 text-sm transition-all shadow-sm placeholder:text-slate-400 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[120px] ${fieldErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 bg-red-50/50' : 'border-slate-200'}`}
                required
                minLength={10}
              />
              {fieldErrors.message && (
                <p className="text-[13px] font-medium text-red-500 mt-1.5 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold text-base shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/60 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Survey...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Submit Survey Feedback
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
