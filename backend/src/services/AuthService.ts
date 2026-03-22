import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';
import { injectable, inject } from'inversify';
import { AdminRepository } from '../repositories/AdminRepository.js';
import type { IAdmin } from '../models/Admin.js';
import { TYPES } from '../inversify/types.js';

export interface LoginResult {
  token: string;
  username: string;
 expiresIn: string;
}

export interface AdminInfo {
  id: string;
  username: string;
}

@injectable()
export class AuthService {
  private adminRepo: AdminRepository;

  constructor(@inject(TYPES.AdminRepository) adminRepo: AdminRepository) {
   this.adminRepo = adminRepo;
  }

  async registerAdmin(username: string, password: string): Promise<void> {
   // Check if admin already exists
   const existingAdmin = await this.adminRepo.findByUsername(username);
    if (existingAdmin) {
     throw new Error('Admin already exists');
    }

   // Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   // Create admin
   await this.adminRepo.create({
     username,
     password: hashedPassword,
   });
  }

  async loginAdmin(username: string, password: string): Promise<LoginResult> {
   // Find admin by username
   const admin = await this.adminRepo.findByUsername(username);
    if (!admin) {
     throw new Error('Invalid credentials');
    }

   // Verify password
   const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
     throw new Error('Invalid credentials');
    }

   // Generate JWT token
   const secret = process.env.JWT_SECRET || 'default-secret';
   const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
   const token = jwt.sign(
     { adminId: admin._id.toString(), username: admin.username },
     secret,
     { expiresIn } as jwt.SignOptions
   );

   return {
     token,
     username: admin.username,
     expiresIn,
   };
  }

  async getCurrentAdmin(adminId: string): Promise<AdminInfo | null> {
   const admin = await this.adminRepo.findById(adminId);
    
    if (!admin) {
     return null;
    }

   return {
     id: admin._id.toString(),
     username: admin.username,
   };
  }
}
