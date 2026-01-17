'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import DateDisplay from './components/DateDisplay';
import QuoteDisplay from './components/QuoteDisplay';
import SimplifiedMenu from './components/SimplifiedMenu';
import BackgroundManager from './components/BackgroundManager';
import { getRandomQuote } from '@/lib/quotes-data';

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState({ quote_content: '', quote_source: '' });
  const [currentBackground, setCurrentBackground] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const bgTriggerRef = useRef<(() => void) | null>(null);
  const chimeAudio = useRef<HTMLAudioElement | null>(null);

  const refreshQuote = useCallback(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  useEffect(() => {
    refreshQuote();
    chimeAudio.current = new Audio('/zs.mp3');
    setIsLoaded(true);

    // 整点任务调度
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        const isChimeActive = localStorage.getItem('setting-chime') === 'true';
        const isRefreshActive = localStorage.getItem('setting-auto-refresh') === 'true';
        if (isChimeActive) chimeAudio.current?.play().catch(() => {});
        if (isRefreshActive) {
          setTimeout(() => {
            refreshQuote();
            bgTriggerRef.current?.();
          }, isChimeActive ? 5000 : 0);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [refreshQuote]);

  const handleLotusClick = () => {
    const engine = localStorage.getItem('zen-search-engine');
    if (!engine) return; 

    const query = encodeURIComponent(`${currentQuote.quote_content} 是什么意思？`);
    const targetUrl = engine === 'google' 
      ? `https://www.google.com/search?q=${query}`
      : `https://m.sogou.com/web/searchList.jsp?keyword=${query}`;

    // PWA 环境下直接外跳以避开 iframe 的跨域链接白屏问题
    window.open(targetUrl, '_blank');
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-noto-serif-sc bg-[#1a1a1a]">
      {/* 增强版呼吸动画：透明度范围 0.2 -> 1.0，节奏 3s */}
      <style jsx global>{`
        @keyframes lotus-breath {
          0% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 1; transform: translate(-50%, 0) scale(1.1); }
          100% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
        }
        @-webkit-keyframes lotus-breath {
          0% { opacity: 0.2; -webkit-transform: translate(-50%, 0) scale(1); }
          50% { opacity: 1; -webkit-transform: translate(-50%, 0) scale(1.1); }
          100% { opacity: 0.2; -webkit-transform: translate(-50%, 0) scale(1); }
        }
        .animate-breath { 
          animation: lotus-breath 5s ease-in-out infinite !important;
          -webkit-animation: lotus-breath 5s ease-in-out infinite !important;
        }
      `}</style>

      <BackgroundManager setCurrentBackground={setCurrentBackground} triggerRef={bgTriggerRef} />

      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: currentBackground ? `url('${currentBackground}')` : 'none', backgroundColor: '#1a1a1a' }} />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className={`relative z-10 h-screen flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex-shrink-0 pt-16 md:pt-24 pb-6"><DateDisplay /></div>
        
        <div className="flex-1 flex flex-col justify-center items-center px-6 max-w-5xl mx-auto w-full text-center relative">
          <div className="w-full min-h-[250px] flex items-center justify-center pb-44">
            <QuoteDisplay currentQuote={currentQuote} setCurrentQuote={setCurrentQuote} />
          </div>
        </div>

        {/* 底部呼吸 Logo - 已调高最大透明度至 1.0 */}
        <div 
          className="fixed bottom-24 left-1/2 -translate-x-1/2 animate-breath z-50 cursor-pointer select-none"
          onClick={handleLotusClick}
          style={{ width: '48px', height: '48px' }}
        >
          <img 
            src="/logo-white.png" 
            alt="Zen Logo" 
            className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = '/icon.png'; }}
          />
        </div>

        <SimplifiedMenu setCurrentBackground={setCurrentBackground} onRefreshQuote={refreshQuote} />
      </div>
    </div>
  );
}
