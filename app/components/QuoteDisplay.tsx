'use client';

import { useEffect } from 'react';
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
    <div className="text-center px-4 w-full flex flex-col items-center justify-center">
      <div className="quote-content transition-all duration-300 ease-in-out max-w-full sm:max-w-4xl mx-auto">
        
        {/* 金句内容区域 - 强化移动端适配 */}
        <blockquote 
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-relaxed mb-8 text-center"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
            lineHeight: '1.6',
            textWrap: 'balance', // 保持视觉平衡
            wordBreak: 'break-all', // 确保极窄屏下不会撑破边界
            display: 'block',
            width: '100%'
          }}
        >
          <span className="block px-2">
            {currentQuote.quote_content}
          </span>
        </blockquote>
        
        {/* 金句出处 */}
        <div className="w-full flex justify-end mt-4">
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