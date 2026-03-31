declare global {
  namespace Express {
    export interface Request {
      username: string;
      role: string;
      iat?: number;
      exp?: number;
    }
  }
}

export {};
