
import React, { useState, useCallback } from 'react';
import type { JournalPromptResponse } from './types';
import { generateJournalPrompt } from './services/geminiService';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import PromptDisplay from './components/PromptDisplay';
import Footer from './components/Footer';

function App() {
  const [mood, setMood] = useState('Neutral');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [theme, setTheme] = useState('');
  
  const [result, setResult] = useState<JournalPromptResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrompt = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateJournalPrompt(mood, timeOfDay, theme);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError('Sorry, I couldn\'t generate a prompt right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [mood, timeOfDay, theme]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-10">
          <PromptForm
            mood={mood}
            setMood={setMood}
            timeOfDay={timeOfDay}
            setTimeOfDay={setTimeOfDay}
            theme={theme}
            setTheme={setTheme}
            onSubmit={handleGeneratePrompt}
            isLoading={isLoading}
          />
          <PromptDisplay
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
