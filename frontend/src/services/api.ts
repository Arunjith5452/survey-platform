
import { api } from '@/lib/axios';
import type { ApiResponse, SurveyFormData, SurveySubmission, LoginCredentials, LoginResponse } from '@/types';


export const surveyApi = {

  submitSurvey: async (data: SurveyFormData): Promise<ApiResponse<SurveySubmission>> => {
  const response = await api.post<ApiResponse<SurveySubmission>>('/survey', data);
   return response.data;
 },

 getAllSubmissions: async (page = 1, limit = 10): Promise<ApiResponse<SurveySubmission[]>> => {
  const response = await api.get<ApiResponse<SurveySubmission[]>>(`/survey?page=${page}&limit=${limit}`);
   return response.data;
 },


 getSubmissionById: async (id: string): Promise<ApiResponse<SurveySubmission>> => {
  const response = await api.get<ApiResponse<SurveySubmission>>(`/survey/${id}`);
   return response.data;
 },


 deleteSubmission: async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/survey/${id}`);
   return response.data;
 },
};

export const authApi = {

  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return response.data;
  },
};

export default api;
