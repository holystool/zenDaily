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
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchUrl, setSearchUrl] = useState('');
  
  const bgTriggerRef = useRef<(() => void) | null>(null);
  const chimeAudio = useRef<HTMLAudioElement | null>(null);

  // 刷新格言逻辑
  const refreshQuote = useCallback(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  useEffect(() => {
    refreshQuote();
    chimeAudio.current = new Audio('/zs.mp3');
    setIsLoaded(true);

    // 整点任务调度逻辑
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        const isChimeActive = localStorage.getItem('setting-chime') === 'true';
        const isRefreshActive = localStorage.getItem('setting-auto-refresh') === 'true';

        if (isChimeActive) chimeAudio.current?.play().catch(() => {});
        
        if (isRefreshActive) {
          // 同时开启时，刷新延迟 5 秒以避开钟声
          setTimeout(() => {
            refreshQuote();
            bgTriggerRef.current?.();
          }, isChimeActive ? 5000 : 0);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [refreshQuote]);

  // 处理莲花 Logo 点击逻辑
  const handleLotusClick = () => {
    const engine = localStorage.getItem('zen-search-engine');
    if (!engine) return; 

    const query = encodeURIComponent(`${currentQuote.quote_content} 是什么意思？`);
    const targetUrl = engine === 'google' 
      ? `https://www.google.com/search?q=${query}`
      : `https://m.sogou.com/web/searchList.jsp?keyword=${query}`;

    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    
    // 谷歌由于 X-Frame-Options 限制强制外跳，搜狗普通模式用浮窗
    if (engine === 'google' || isPWA) {
      window.open(targetUrl, '_blank');
    } else {
      setSearchUrl(targetUrl);
      setShowSearchModal(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-noto-serif-sc bg-[#1a1a1a]">
      {/* 呼吸动画：节奏已调整为 3s */}
      <style jsx global>{`
        @keyframes lotus-breath {
          0% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, 0) scale(1.05); }
          100% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
        }
        @-webkit-keyframes lotus-breath {
          0% { opacity: 0.15; -webkit-transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.5; -webkit-transform: translate(-50%, 0) scale(1.05); }
          100% { opacity: 0.15; -webkit-transform: translate(-50%, 0) scale(1); }
        }
        .animate-breath { 
          animation: lotus-breath 3s ease-in-out infinite !important;
          -webkit-animation: lotus-breath 3s ease-in-out infinite !important;
        }
      `}</style>

      <BackgroundManager setCurrentBackground={setCurrentBackground} triggerRef={bgTriggerRef} />

      {/* 背景图片层 */}
      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: currentBackground ? `url('${currentBackground}')` : 'none', backgroundColor: '#1a1a1a' }} />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* 内容主容器 */}
      <div className={`relative z-10 h-screen flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex-shrink-0 pt-16 md:pt-24 pb-6"><DateDisplay /></div>
        
        <div className="flex-1 flex flex-col justify-center items-center px-6 max-w-5xl mx-auto w-full text-center relative">
          {/* pb-44 确保格言不与底部的呼吸 Logo 重叠 */}
          <div className="w-full min-h-[250px] flex items-center justify-center pb-44">
            <QuoteDisplay currentQuote={currentQuote} setCurrentQuote={setCurrentQuote} />
          </div>
        </div>

        {/* 底部呼吸 Logo */}
        <div 
          className="fixed bottom-24 left-1/2 -translate-x-1/2 animate-breath z-50 cursor-pointer select-none"
          onClick={handleLotusClick}
          style={{ width: '48px', height: '48px' }}
        >
          <img src="/logo-white.png" alt="Zen Logo" className="w-full h-full object-contain"
               onError={(e) => { (e.target as HTMLImageElement).src = '/icon.png'; }} />
        </div>

        {/* 菜单放置在左上角 */}
        <SimplifiedMenu setCurrentBackground={setCurrentBackground} onRefreshQuote={refreshQuote} />
      </div>

      {/* 搜索释义浮窗 */}
      <div className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-opacity duration-500 ${showSearchModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/75" onClick={() => setShowSearchModal(false)} />
        <div className="relative w-full h-[85vh] sm:max-w-2xl sm:h-[70vh] bg-white rounded-t-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">释义</span>
              {/* 外部浏览器打开按钮 */}
              <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
            <button onClick={() => setShowSearchModal(false)} className="p-2 text-gray-400 text-3xl leading-none">&times;</button>
          </div>
          <div className="flex-1 bg-white">
            {showSearchModal && (
              <iframe src={searchUrl} className="w-full h-full border-none" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
