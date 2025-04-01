'use client';

import { Button } from '@/components/ui/button';
import { ChallengeCategory, ChallengeFormData } from '@/types';

interface Step1BasicsProps {
  formData: Pick<ChallengeFormData, 'category' | 'title'>;
  onUpdate: (data: Pick<ChallengeFormData, 'category' | 'title'>) => void;
  onNext: () => void;
}

export default function Step1Basics({ formData, onUpdate, onNext }: Step1BasicsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Challenge Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            onUpdate({ ...formData, category: e.target.value as ChallengeCategory })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {Object.values(ChallengeCategory).map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Challenge Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => onUpdate({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter a compelling title for your challenge"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
} 