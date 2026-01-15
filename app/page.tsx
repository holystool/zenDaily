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
  
  const bgTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  // 构造搜索链接
  const searchQuery = encodeURIComponent(`${currentQuote.quote_content} 是什么意思？`);
  const searchUrl = `https://sogou.com/web?query=${searchQuery}`;

  return (
    <div className="min-h-screen relative overflow-hidden font-noto-serif-sc bg-[#1a1a1a]">
      {/* 注入呼吸动画样式 */}
      <style jsx global>{`
        @keyframes lotus-breath {
          0% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, 0) scale(1.05); }
          100% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
        }
        .animate-breath {
          animation: lotus-breath 4s ease-in-out infinite;
        }
      `}</style>

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
      
      {/* 4. 内容主容器 */}
      <div className={`relative z-10 h-screen flex flex-col transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* 顶部日期区域 */}
        <div className="flex-shrink-0 pt-20 md:pt-24 pb-8">
          <DateDisplay />
        </div>

        {/* 中央格言容器 */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 max-w-5xl mx-auto w-full text-center relative">
          <div className="w-full min-h-[300px] flex items-center justify-center pb-24">
            <QuoteDisplay 
              currentQuote={currentQuote}
              setCurrentQuote={setCurrentQuote}
            />
          </div>
        </div>

        {/* 5. 底部装饰 Logo - 修复 PWA 跳转外部浏览器 */}
        <a 
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer external"
          className="fixed bottom-6 left-1/2 animate-breath z-20 cursor-pointer select-none transition-all hover:opacity-100"
          title="点击查看释义"
          onClick={(e) => {
            // 检测是否在 PWA (Standalone) 模式下
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
            
            if (isStandalone) {
              e.preventDefault();
              // 使用动态创建隐藏 A 标签的方法强制唤起外部浏览器
              const a = document.createElement('a');
              a.href = searchUrl;
              a.target = '_blank';
              a.rel = 'noopener noreferrer';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          }}
        >
          <img 
            src="/logo-white.png" 
            alt="Zen Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.src = '/icon.png'; 
            }}
          />
        </a>

        {/* 6. 极简菜单 */}
        <div className="flex-shrink-0">
          <SimplifiedMenu setCurrentBackground={setCurrentBackground} />
        </div>
      </div>
    </div>
  );
}