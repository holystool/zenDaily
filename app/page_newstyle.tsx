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
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  const bgTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setTimeout(() => { setIsLoaded(true); }, 500);
  }, []);

  const searchQuery = encodeURIComponent(`${currentQuote.quote_content} 是什么意思？`);
  const searchUrl = `https://m.sogou.com/web/searchList.jsp?keyword=${searchQuery}`;

  return (
    <div className="min-h-screen relative overflow-hidden font-noto-serif-sc bg-[#1a1a1a]">
      <style jsx global>{`
        @keyframes lotus-breath {
          0% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, 0) scale(1.05); }
          100% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
        }
        .animate-breath { animation: lotus-breath 4s ease-in-out infinite; }
      `}</style>

      <BackgroundManager setCurrentBackground={setCurrentBackground} triggerRef={bgTriggerRef} />

      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: currentBackground ? `url('${currentBackground}')` : 'none', filter: 'blur(1px)' }} />
      <div className="absolute inset-0 bg-black/35" />
      
      <div className={`relative z-10 h-screen flex flex-col transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex-shrink-0 pt-20 md:pt-24 pb-8"><DateDisplay /></div>
        
        {/* 修改 1：格言容器 - 将 pb-32 增加到 pb-40，彻底解决 Logo 重叠 */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 max-w-5xl mx-auto w-full text-center relative">
          <div className="w-full min-h-[300px] flex items-center justify-center pb-40">
            <QuoteDisplay currentQuote={currentQuote} setCurrentQuote={setCurrentQuote} />
          </div>
        </div>

        {/* 修改 2：底部装饰 Logo - 将 bottom-24 下移到 bottom-20，避开文字区域 */}
        <div 
          className="fixed bottom-10 left-1/2 animate-breath z-20 cursor-pointer select-none transition-all hover:opacity-100"
          onClick={() => setShowSearchModal(true)}
        >
          <img 
            src="/logo-white.png" 
            alt="Zen Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = '/icon.png'; }} 
          />
        </div>

        <div className="flex-shrink-0"><SimplifiedMenu setCurrentBackground={setCurrentBackground} /></div>
      </div>

      {/* 搜索释义浮窗 - 保持原有顺滑动画逻辑 */}
      <div 
        className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-opacity duration-300 ${
          showSearchModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSearchModal(false)} />
        
        <div 
          className={`relative w-full h-[85vh] sm:max-w-2xl sm:h-[70vh] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
            showSearchModal ? 'translate-y-0' : 'translate-y-full sm:translate-y-10'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <span className="text-sm font-medium text-gray-500">AI 释义</span>
            <button 
              onClick={() => setShowSearchModal(false)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <i className="fas fa-times text-gray-400 text-lg"></i>
            </button>
          </div>
          
          <div className="flex-1 w-full overflow-hidden bg-white">
            {showSearchModal && (
              <iframe 
                src={searchUrl} 
                className="w-full h-full border-none"
                title="Search Interpretation"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}