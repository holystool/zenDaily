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
    setIsLoaded(true);
  }, []);

  const searchQuery = encodeURIComponent(currentQuote.quote_content + ' 是什么意思？');
  const searchUrl = `https://m.sogou.com/web/searchList.jsp?keyword=${searchQuery}`;

  return (
    <div className="min-h-screen relative overflow-hidden font-noto-serif-sc bg-[#1a1a1a]">
      <style jsx global>{`
        @keyframes lotus-breath {
          0% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, 0) scale(1.05); }
          100% { opacity: 0.15; transform: translate(-50%, 0) scale(1); }
        }
        .animate-breath { 
          animation: lotus-breath 4s ease-in-out infinite;
          -webkit-animation: lotus-breath 4s ease-in-out infinite;
        }
      `}</style>

      <BackgroundManager setCurrentBackground={setCurrentBackground} triggerRef={bgTriggerRef} />

      {/* 背景层：移除模糊滤镜以保护老手机 GPU */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ 
          backgroundImage: currentBackground ? `url('${currentBackground}')` : 'none',
          backgroundColor: '#1a1a1a' 
        }} 
      />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* 内容主容器 */}
      <div className={`relative z-10 h-screen flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex-shrink-0 pt-16 md:pt-24 pb-6">
          <DateDisplay />
        </div>
        
        {/* 中央格言：使用 pb-44 确保间距 */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 max-w-5xl mx-auto w-full text-center relative">
          <div className="w-full min-h-[250px] flex items-center justify-center pb-44">
            <QuoteDisplay currentQuote={currentQuote} setCurrentQuote={setCurrentQuote} />
          </div>
        </div>

        {/* 底部呼吸 Logo */}
        <div 
          className="fixed bottom-20 left-1/2 -translate-x-1/2 animate-breath z-50 cursor-pointer"
          onClick={() => setShowSearchModal(true)}
          style={{ width: '48px', height: '48px' }}
        >
          <img 
            src="/logo-white.png" 
            alt="Zen Logo" 
            className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = '/icon.png'; }} 
          />
        </div>

        <div className="flex-shrink-0 z-40">
          <SimplifiedMenu setCurrentBackground={setCurrentBackground} />
        </div>
      </div>

      {/* 搜索浮窗：全兼容顺滑版本 */}
      {/* 仅当显隐状态变化时切换 opacity，避免复杂的位移计算 */}
      <div 
        className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-opacity duration-500 ease-in-out ${
          showSearchModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* 背景遮罩：移除 backdrop-blur 以提升渲染速度 */}
        <div className="absolute inset-0 bg-black/75" onClick={() => setShowSearchModal(false)} />
        
        {/* 浮窗主体：取消移动端滑入，改为原地渐显，确保老手机不掉帧 */}
        <div className="relative w-full h-[85vh] sm:max-w-2xl sm:h-[70vh] bg-white rounded-t-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50 flex-shrink-0">
            <span className="text-sm text-gray-500 font-medium">释义</span>
            <button 
              onClick={() => setShowSearchModal(false)} 
              className="p-2 text-gray-400 text-3xl leading-none"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 bg-white">
            {/* 延迟渲染 iframe，防止背景加载卡顿 */}
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