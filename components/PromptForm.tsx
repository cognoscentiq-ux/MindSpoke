
import React from 'react';
import { MOOD_OPTIONS, TIME_OF_DAY_OPTIONS, THEME_SUGGESTIONS } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptFormProps {
  mood: string;
  setMood: (mood: string) => void;
  timeOfDay: string;
  setTimeOfDay: (time: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const FormInputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-light-teal mb-2">{label}</label>
    {children}
  </div>
);

function PromptForm({ mood, setMood, timeOfDay, setTimeOfDay, theme, setTheme, onSubmit, isLoading }: PromptFormProps) {
  
  const handleThemeClick = (suggestion: string) => {
    setTheme(suggestion);
  };

  return (
    <div className="bg-white/60 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-soft-green/50">
      <h2 className="text-xl font-bold text-deep-teal mb-4 text-center">How are you feeling?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormInputGroup label="Select your current mood">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border border-soft-green rounded-md bg-calm-beige/50 focus:ring-2 focus:ring-accent-gold focus:outline-none transition"
          >
            {MOOD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </FormInputGroup>
        <FormInputGroup label="What time is it?">
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-full p-2 border border-soft-green rounded-md bg-calm-beige/50 focus:ring-2 focus:ring-accent-gold focus:outline-none transition"
          >
            {TIME_OF_DAY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </FormInputGroup>
      </div>
      
      <FormInputGroup label="Add a theme (optional)">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g., Gratitude, Focus, Self-love..."
          className="w-full p-2 border border-soft-green rounded-md bg-calm-beige/50 focus:ring-2 focus:ring-accent-gold focus:outline-none transition"
        />
      </FormInputGroup>
      <div className="flex flex-wrap gap-2 mt-3">
        {THEME_SUGGESTIONS.map(suggestion => (
          <button
            key={suggestion}
            onClick={() => handleThemeClick(suggestion)}
            className={`px-3 py-1 text-sm rounded-full transition ${
              theme === suggestion 
                ? 'bg-light-teal text-white' 
                : 'bg-soft-green/50 text-deep-teal hover:bg-soft-green/80'
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-gold text-deep-teal font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            <>
              <SparklesIcon />
              Create My Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PromptForm;
