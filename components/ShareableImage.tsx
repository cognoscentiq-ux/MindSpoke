import React, { forwardRef } from 'react';
import type { JournalPromptResponse } from '../types';

interface ShareableImageProps {
  result: JournalPromptResponse;
}

const ShareableImage = forwardRef<HTMLDivElement, ShareableImageProps>(({ result }, ref) => {
  if (!result) return null;
  
  // Inline styles are used here to ensure they are correctly captured by html-to-image
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        width: '1080px',
        height: '1080px',
        padding: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#F5F5DC', // calm-beige
        color: '#003C43', // deep-teal
      }}
    >
      <div className="space-y-8">
        <p style={{ fontSize: '64px', fontWeight: 600, lineHeight: 1.3 }}>
          "{result.prompt}"
        </p>
        <p style={{ fontSize: '36px', fontStyle: 'italic', color: '#135D66' }}>
          {result.encouragement}
        </p>
      </div>

      <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '2px solid rgba(168, 216, 185, 0.8)', width: '80%' }}>
         <h3 style={{ fontSize: '28px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#135D66', marginBottom: '16px'}}>Today's Affirmation</h3>
         <p style={{ fontSize: '48px', fontWeight: 500 }}>
             {result.affirmation}
         </p>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', fontSize: '32px', fontWeight: 700, color: '#135D66' }}>
        MindSpoke
      </div>
    </div>
  );
});

export default ShareableImage;