
import React from 'react';
import type { JournalPromptResponse } from '../types';

interface PromptDisplayProps {
  result: JournalPromptResponse | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-6 bg-soft-green/50 rounded w-3/4"></div>
        <div className="h-4 bg-soft-green/30 rounded w-1/2"></div>
    </div>
);


function PromptDisplay({ result, isLoading, error }: PromptDisplayProps) {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <p className="text-red-600 text-center">{error}</p>;
    }
    if (result) {
      return (
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold text-deep-teal leading-relaxed">
            "{result.prompt}"
          </p>
          <p className="text-md text-light-teal italic">
            {result.encouragement}
          </p>
        </div>
      );
    }
    return (
      <div className="text-center text-light-teal">
        <p className="text-lg">Your personal journaling prompt will appear here.</p>
        <p>Take a deep breath and start your reflection journey.</p>
      </div>
    );
  };

  return (
    <div className="min-h-[150px] flex items-center justify-center bg-white/60 p-6 rounded-lg shadow-inner backdrop-blur-sm border border-soft-green/50">
      {renderContent()}
    </div>
  );
}

export default PromptDisplay;
