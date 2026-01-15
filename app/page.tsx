'use client';

import { useState, useEffect, useRef } from 'react';
import DateDisplay from './components/DateDisplay';
import QuoteDisplay from './components/QuoteDisplay';
import SimplifiedMenu from './components/SimplifiedMenu';
import BackgroundManager from './components/BackgroundManager';

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState({ quote_content: '', quote_source: '' });
  const [currentBackground, setCurrentBackground] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 用于连接菜单和背景控制的引用
  const bgTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // 页面加载入场动画
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden font-noto-serif-sc bg-[#1a1a1a]">
      {/* 1. 背景逻辑控制 */}
      <BackgroundManager 
        setCurrentBackground={setCurrentBackground} 
        triggerRef={bgTriggerRef} 
      />

      {/* 2. 背景图片层 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: currentBackground ? `url('${currentBackground}')` : 'none',
          filter: 'blur(1px)'
        }}
      />
      
      {/* 3. 暗色遮罩 */}
      <div className="absolute inset-0 bg-black/35" />
      
      {/* 4. 内容容器 */}
      <div className={`relative z-10 h-screen flex flex-col transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* 顶部日期：位置优化 */}
        <div className="flex-shrink-0 pt-20 md:pt-24 pb-8">
          <DateDisplay />
        </div>
        
        {/* 中央格言：位置上移优化，达到画面平衡 */}
        <div className="flex-1 flex flex-col justify-start pt-12 md:pt-20 px-8 max-w-5xl mx-auto w-full text-center">
          <QuoteDisplay 
            currentQuote={currentQuote}
            setCurrentQuote={setCurrentQuote}
          />
        </div>

        {/* 底部占位 */}
        <div className="flex-shrink-0 h-24" />

        {/* 核心修改：底部中央 Logo */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-80 pointer-events-none select-none z-0">
          <img 
            src="/logo-white.png" 
            alt="Logo" 
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
        </div>

        {/* 5. 极简菜单 */}
        <SimplifiedMenu setCurrentBackground={setCurrentBackground} />
      </div>
    </div>
  );
}