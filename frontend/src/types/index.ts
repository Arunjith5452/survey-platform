export interface SurveySubmission {
  _id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyFormData {
  name: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    currentPage: number;
   totalPages: number;
   totalItems: number;
    limit: number;
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
}
