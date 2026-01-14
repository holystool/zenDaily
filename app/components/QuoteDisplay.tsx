'use client';

import { useState, useEffect } from 'react';
import { getRandomQuote, type Quote } from '@/lib/quotes-data';

interface QuoteDisplayProps {
  currentQuote: Quote;
  setCurrentQuote: (quote: Quote) => void;
}

export default function QuoteDisplay({ currentQuote, setCurrentQuote }: QuoteDisplayProps) {
  useEffect(() => {
    // 页面加载时随机选择一个金句
    const randomQuote = getRandomQuote();
    setCurrentQuote(randomQuote);
  }, [setCurrentQuote]);

  // 构建百度 AI 搜索链接
  const searchQuery = encodeURIComponent(`${currentQuote.quote_content} 是什么意思？`);
  const searchUrl = `https://www.baidu.com/s?wd=${searchQuery}`;

  return (
    <div className="text-center px-4 w-full">
      <div className="quote-content transition-all duration-300 ease-in-out max-w-4xl mx-auto flex flex-col items-center">
        
        {/* 金句内容区域 */}
        <blockquote 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-8 text-center"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
            lineHeight: '1.6',
            textWrap: 'balance' // 优化换行排版，避免末行单字
          }}
        >
          {/* 文字与图标容器 */}
          <span className="inline">
            {currentQuote.quote_content}
            
            {/* AI 搜索按钮：通过 relative 控制偏移 */}
            <a 
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block ml-1 opacity-70 active:opacity-100 transition-opacity"
              style={{ 
                top: '-0.6em',  // 核心调整参数：负值越大，图标越靠上
                left: '0.1em'   // 稍微往右偏一点点，避免紧贴标点
              }}
              title="AI 释义"
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