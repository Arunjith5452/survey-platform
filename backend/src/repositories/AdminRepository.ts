import'mongoose';
import { injectable } from'inversify';
import Admin, { IAdmin } from '../models/Admin.js';
import { IAdminRepository } from './IAdminRepository.js';

@injectable()
export class AdminRepository implements IAdminRepository {
  async findById(id: string): Promise<IAdmin | null> {
  return await Admin.findById(id).exec();
  }

  async findAll(): Promise<IAdmin[]> {
  return await Admin.find().exec();
  }

  async findByPage(page: number, limit: number): Promise<IAdmin[]> {
  const skip = (page -1) * limit;
  return await Admin.find().skip(skip).limit(limit).exec();
  }

  async count(): Promise<number> {
  return await Admin.countDocuments();
  }

  async create(data: Partial<IAdmin>): Promise<IAdmin> {
  const admin = new Admin(data);
  return await admin.save();
  }

  async update(id: string, data: Partial<IAdmin>): Promise<IAdmin | null> {
  return await Admin.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async delete(id: string): Promise<boolean> {
  const result = await Admin.findByIdAndDelete(id).exec();
  return result !== null;
  }

  async findByUsername(username: string): Promise<IAdmin | null> {
  return await Admin.findOne({ username }).exec();
  }

  async existsByUsername(username: string): Promise<boolean> {
  const admin = await this.findByUsername(username);
  return admin !== null;
  }
}
