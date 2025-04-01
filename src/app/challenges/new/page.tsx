'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { ChallengeFormData, ChallengeCategory } from '@/types';
import Step1Basics from './components/Step1Basics';
import Step2Media from './components/Step2Media';
import Step3Deadline from './components/Step3Deadline';
import Step4Review from './components/Step4Review';

const initialFormData: ChallengeFormData = {
  title: '',
  category: ChallengeCategory.technical,
  description: '',
  videoUrl: '',
  reward: '',
  deadline: new Date(),
};

export default function NewChallengePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ChallengeFormData>(initialFormData);

  const handleSubmit = async () => {
    try {
      await fetch('/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      redirect('/dashboard/xpro');
    } catch (error) {
      console.error('Error creating challenge:', error);
      // TODO: Add error handling UI
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Basics
            formData={formData}
            onUpdate={(data: Partial<ChallengeFormData>) => setFormData({ ...formData, ...data })}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Step2Media
            formData={formData}
            onUpdate={(data: Partial<ChallengeFormData>) => setFormData({ ...formData, ...data })}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <Step3Deadline
            formData={formData}
            onUpdate={(data: Partial<ChallengeFormData>) => setFormData({ ...formData, ...data })}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <Step4Review
            formData={formData}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep(3)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Challenge</h1>
      <div className="max-w-2xl mx-auto">{renderStep()}</div>
    </div>
  );
} 