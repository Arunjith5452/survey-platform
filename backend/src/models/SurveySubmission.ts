import mongoose, { Document, Schema } from 'mongoose';

export interface ISurveySubmission extends Document {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const SurveySubmissionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[\d\s\-\+\(\)]{10,}$/, 'Please enter a valid phone number'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      minlength: [5, 'Address must be at least 5 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

SurveySubmissionSchema.index({ createdAt: -1 });
SurveySubmissionSchema.index({ email: 1 });

export default mongoose.model<ISurveySubmission>('SurveySubmission', SurveySubmissionSchema);
