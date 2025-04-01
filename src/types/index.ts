export enum ChallengeCategory {
  technical = 'technical',
  fitness = 'fitness',
  lifestyle = 'lifestyle',
  mindset = 'mindset',
  nutrition = 'nutrition',
}

export interface ChallengeFormData {
  category: ChallengeCategory;
  title: string;
  description: string;
  videoUrl: string;
  reward?: string;
  deadline: Date;
}

export interface UploadThingResponse {
  fileUrl: string;
} 