import'mongoose';
import { injectable } from'inversify';
import SurveySubmission, { ISurveySubmission } from '../models/SurveySubmission.js';
import { IRepository } from './IRepository.js';

@injectable()
export class SurveySubmissionRepository implements IRepository<ISurveySubmission> {
  async findById(id: string): Promise<ISurveySubmission | null> {
   return await SurveySubmission.findById(id).exec();
  }

  async findAll(): Promise<ISurveySubmission[]> {
   return await SurveySubmission.find().sort({ createdAt: -1 }).exec();
  }

  async findByPage(page: number, limit: number): Promise<ISurveySubmission[]> {
   const skip = (page - 1) * limit;
   return await SurveySubmission.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async count(): Promise<number> {
   return await SurveySubmission.countDocuments();
  }

  async create(data: Partial<ISurveySubmission>): Promise<ISurveySubmission> {
   const submission= new SurveySubmission(data);
   return await submission.save();
  }

  async update(
    id: string,
    data: Partial<ISurveySubmission>
  ): Promise<ISurveySubmission | null> {
   return await SurveySubmission.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async delete(id: string): Promise<boolean> {
   const result = await SurveySubmission.findByIdAndDelete(id).exec();
   return result !== null;
  }

  async findByEmail(email: string): Promise<ISurveySubmission[]> {
   return await SurveySubmission.find({ email }).exec();
  }
}
