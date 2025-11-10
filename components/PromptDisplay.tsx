import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import type { JournalPromptResponse } from '../types';
import { ShareIcon } from './icons/ShareIcon';
import ShareableImage from './ShareableImage';

interface PromptDisplayProps {
  result: JournalPromptResponse | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4 w-full text-center">
        <div className="h-6 bg-soft-green/50 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-soft-green/30 rounded w-1/2 mx-auto"></div>
        <div className="mt-8 pt-4 border-t border-soft-green/30">
           <div className="h-3 bg-soft-green/40 rounded w-1/3 mx-auto mb-3"></div>
           <div className="h-5 bg-soft-green/50 rounded w-7/12 mx-auto"></div>
        </div>
    </div>
);


function PromptDisplay({ result, isLoading, error }: PromptDisplayProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!result || !imageRef.current) return;

    setIsSharing(true);
    setIsCopied(false);

    const shareText = `Journaling Prompt:\n"${result.prompt}"\n\nEncouragement:\n${result.encouragement}\n\nToday's Affirmation:\n${result.affirmation}`;

    try {
        const blob = await htmlToImage.toBlob(imageRef.current, {
            quality: 0.95,
            pixelRatio: 1,
        });

        if (blob && navigator.share) {
            const file = new File([blob], 'mindspoke-prompt.png', { type: blob.type });
            const canShareFiles = navigator.canShare && navigator.canShare({ files: [file] });

            if (canShareFiles) {
                await navigator.share({
                    title: 'A MindSpoke Moment',
                    text: shareText,
                    files: [file],
                });
                setIsSharing(false);
                return;
            }
        }

        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);

    } catch (err) {
        console.error('Sharing failed:', err);
        try {
            if ((err as Error).name !== 'AbortError') {
                 await navigator.clipboard.writeText(shareText);
                 setIsCopied(true);
                 setTimeout(() => setIsCopied(false), 2500);
            }
        } catch (copyErr) {
            console.error('Failed to copy text as fallback: ', copyErr);
            alert('Failed to share or copy the prompt.');
        }
    } finally {
        setIsSharing(false);
    }
  };
  
  const getButtonText = () => {
    if (isSharing) return 'Sharing...';
    if (isCopied) return 'Copied!';
    return 'Share';
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <p className="text-red-600 text-center">{error}</p>;
    }
    if (result) {
      return (
        <div className="text-center w-full flex flex-col items-center">
          {/* This component is rendered but positioned off-screen to be used for image generation */}
          <ShareableImage ref={imageRef} result={result} />
          
          <div className="space-y-4 mb-6">
            <p className="text-2xl font-semibold text-deep-teal leading-relaxed">
              "{result.prompt}"
            </p>
            <p className="text-md text-light-teal italic">
              {result.encouragement}
            </p>
          </div>

          <div className="mt-4 border-t border-soft-green/50 pt-4 w-full max-w-md">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-teal mb-2">Today's Affirmation</h3>
            <p className="text-lg font-medium text-deep-teal">
                {result.affirmation}
            </p>
          </div>

           <button
            onClick={handleShare}
            disabled={isSharing}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm bg-soft-green/60 text-deep-teal font-medium rounded-full hover:bg-soft-green transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label="Share this prompt"
          >
            <ShareIcon className="w-4 h-4" />
            {getButtonText()}
          </button>
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