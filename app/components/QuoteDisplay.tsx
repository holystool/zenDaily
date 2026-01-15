'use client';

import { useState, useEffect } from 'react';
import { getRandomQuote, type Quote } from '@/lib/quotes-data';

interface QuoteDisplayProps {
  currentQuote: Quote;
  setCurrentQuote: (quote: Quote) => void;
}

export default function QuoteDisplay({ currentQuote, setCurrentQuote }: QuoteDisplayProps) {
  useEffect(() => {
    const randomQuote = getRandomQuote();
    setCurrentQuote(randomQuote);
  }, [setCurrentQuote]);

  return (
    <div className="text-center px-4 w-full">
      <div className="quote-content transition-all duration-300 ease-in-out max-w-4xl mx-auto flex flex-col items-center">
        
        {/* 金句内容区域 - 彻底纯净版 */}
        <blockquote 
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-relaxed mb-8 text-center"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
            lineHeight: '1.6',
            textWrap: 'balance',
            wordBreak: 'keep-all', 
          }}
        >
          <span className="inline-block px-1">
            {currentQuote.quote_content}
          </span>
        </blockquote>
        
        {/* 金句出处 */}
        <div className="w-full flex justify-end">
          <cite 
            className="text-lg sm:text-xl text-white/90 font-normal not-italic"
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.4)'
            }}
          >
            —— {currentQuote.quote_source}
          </cite>
        </div>
      </div>
    </div>
  );
}