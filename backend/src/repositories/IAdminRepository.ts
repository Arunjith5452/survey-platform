import { IAdmin } from '../models/Admin.js';
import { IRepository } from './baseRepository.js';

export interface IAdminRepository extends IRepository<IAdmin> {
  findByUsername(username: string): Promise<IAdmin | null>;
  existsByUsername(username: string): Promise<boolean>;
}
