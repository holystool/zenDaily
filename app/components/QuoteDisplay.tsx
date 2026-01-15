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

  const searchQuery = encodeURIComponent(`${currentQuote.quote_content} 是什么意思？`);
  const searchUrl = `https://sogou.com/web?query=${searchQuery}`;

  return (
    <div className="text-center px-4 w-full">
      <div className="quote-content transition-all duration-300 ease-in-out max-w-4xl mx-auto flex flex-col items-center">
        
        {/* 金句内容区域 */}
        <blockquote 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-8 text-center"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
            lineHeight: '1.6',
            textWrap: 'balance' 
          }}
        >
          <span className="relative inline">
            {currentQuote.quote_content}
            
            {/* 核心修改：PWA 兼容性跳转 */}
            <a 
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer external"
              className="absolute opacity-70 active:opacity-100 transition-opacity p-1"
              title="AI 释义"
              style={{ 
                top: '-0.6em',    
                right: '-1.2em',  
                width: '1em'      
              }}
              onClick={(e) => {
                // 如果是 PWA 模式，强制调用浏览器打开
                if (window.matchMedia('(display-mode: standalone)').matches) {
                  e.preventDefault();
                  window.open(searchUrl, '_blank');
                }
              }}
            >
              <i className="fas fa-search text-[10px] sm:text-[12px]"></i>
            </a>
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