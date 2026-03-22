import axios from 'axios';
import type { ApiResponse, SurveyFormData, SurveySubmission, LoginCredentials, LoginResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
 baseURL: API_BASE_URL,
 headers: {
   'Content-Type': 'application/json',
 },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
 const token = localStorage.getItem('authToken');
 if (token) {
  config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
});

// Handle response errors
api.interceptors.response.use(
 (response) => response,
 (error) => {
   if (error.response?.status === 401) {
     localStorage.removeItem('authToken');
     window.location.href = '/admin/login';
   }
   return Promise.reject(error);
 }
);

export const surveyApi = {
 // Submit survey form (public)
 submitSurvey: async (data: SurveyFormData): Promise<ApiResponse<SurveySubmission>> => {
  const response = await api.post<ApiResponse<SurveySubmission>>('/survey', data);
   return response.data;
 },

 // Get all submissions (protected - requires auth)
 getAllSubmissions: async (page = 1, limit = 10): Promise<ApiResponse<SurveySubmission[]>> => {
  const response = await api.get<ApiResponse<SurveySubmission[]>>(`/survey?page=${page}&limit=${limit}`);
   return response.data;
 },

 // Get single submission by ID (protected)
 getSubmissionById: async (id: string): Promise<ApiResponse<SurveySubmission>> => {
  const response = await api.get<ApiResponse<SurveySubmission>>(`/survey/${id}`);
   return response.data;
 },

 // Delete submission (protected)
 deleteSubmission: async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/survey/${id}`);
   return response.data;
 },
};

export const authApi = {
 // Login admin
 login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
  const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
   return response.data;
 },

 // Get current admin info
 getCurrentAdmin: async (): Promise<ApiResponse<{ id: string; username: string }>> => {
  const response = await api.get<ApiResponse<{ id: string; username: string }>>('/auth/me');
   return response.data;
 },
};

export default api;
