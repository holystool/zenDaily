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
          {/* 核心改动：使用 relative 容器包裹文字，图标设为绝对定位 */}
          <span className="relative inline">
            {currentQuote.quote_content}
            
            {/* 搜索按钮：使用 absolute 确保它不参与父元素的居中宽度计算 */}
            <a 
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute opacity-70 active:opacity-100 transition-opacity p-1"
              title="AI 释义"
              style={{ 
                top: '-0.6em',    // 垂直微调，使其在右上角
                right: '-1.2em',  // 核心参数：向右偏移，使其悬浮在文字范围之外
                width: '1em'      // 固定宽度
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