import { injectable } from 'inversify';
import { LoginDto, AdminDto } from '../dtos/auth.dto.js';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService {
  async loginAdmin(loginDto: LoginDto): Promise<AdminDto> {
    
    const envUsername = process.env.ADMIN_USERNAME;
    const envPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET || 'default-secret-key-change-this';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';

    if (!envUsername || !envPassword) {
      console.error('Admin credentials not fully configured in environment variables');
      throw new Error('Server configuration error');
    }
    const isUserMatch = loginDto.username === envUsername;
    const isPassMatch = loginDto.password === envPassword;

    if (!isUserMatch || !isPassMatch) {
      throw new Error('Invalid credentials');
    }

    const options: jwt.SignOptions = {
      expiresIn: jwtExpiresIn as any
    };

    const accessToken = jwt.sign(
      { username: envUsername, role: 'admin' },
      jwtSecret,
      options
    );

    return {
      username: envUsername,
      accessToken,
    };
  }
}
