export interface ISurveyService {
  submitSurvey(data: SurveyData): Promise<SurveySubmission>;
  getAllSubmissions(page: number, limit: number): Promise<PaginatedResult<SurveySubmission>>;
  getSubmissionById(id: string): Promise<SurveySubmission | null>;
  deleteSubmission(id: string): Promise<boolean>;
}

export interface IAuthService {
  registerAdmin(username: string, password: string): Promise<void>;
  loginAdmin(username: string, password: string): Promise<LoginResult>;
  getCurrentAdmin(adminId: string): Promise<AdminInfo | null>;
}

export interface SurveyData {
  name: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export interface SurveySubmission extends SurveyData {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

export interface LoginResult {
  token: string;
  username: string;
  expiresIn: string;
}

export interface AdminInfo {
  id: string;
  username: string;
}
