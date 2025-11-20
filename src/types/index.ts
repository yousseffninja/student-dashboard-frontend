export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RefreshToken {
  _id: string;
  token: string;
  userId: string;
  expiresDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResetToken {
  _id: string;
  token: string;
  userId: string;
  expiresDate: string;
  createdAt: string;
  updatedAt: string;
}

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';