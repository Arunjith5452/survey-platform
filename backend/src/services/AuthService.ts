import { injectable } from 'inversify';
import { LoginDto, AdminDto } from '../dtos/auth.dto.js';

@injectable()
export class AuthService {
  async loginAdmin(loginDto: LoginDto): Promise<AdminDto> {
    const envUsername = process.env.ADMIN_USERNAME;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envUsername || !envPassword) {
      console.error('Admin credentials not fully configured in environment variables');
      throw new Error('Server configuration error');
    }

    // Check if login username matches env username and password matches env password
    const isUserMatch = loginDto.username === envUsername;
    const isPassMatch = loginDto.password === envPassword;

    if (!isUserMatch || !isPassMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      username: envUsername,
    };
  }
}
