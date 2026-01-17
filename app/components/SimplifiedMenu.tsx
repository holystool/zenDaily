'use client';

import { useState, useEffect, useRef } from 'react';

interface SimplifiedMenuProps {
  setCurrentBackground: (bg: string) => void;
  onRefreshQuote?: () => void; 
}

export default function SimplifiedMenu({ setCurrentBackground, onRefreshQuote }: SimplifiedMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ambience, setAmbience] = useState(false);
  const [hourlyChime, setHourlyChime] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [useSogou, setUseSogou] = useState(false);
  const [useGoogle, setUseGoogle] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const envAudio = useRef<HTMLAudioElement | null>(null);
  const chimeAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    envAudio.current = new Audio('/hj.mp3');
    envAudio.current.loop = true;
    chimeAudio.current = new Audio('/zs.mp3');

    setAmbience(localStorage.getItem('setting-ambience') === 'true');
    setHourlyChime(localStorage.getItem('setting-chime') === 'true');
    setAutoRefresh(localStorage.getItem('setting-auto-refresh') === 'true');
    
    const savedEngine = localStorage.getItem('zen-search-engine');
    setUseSogou(savedEngine === 'sogou');
    setUseGoogle(savedEngine === 'google');

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (ambience) {
      envAudio.current?.play().catch(() => {});
    } else {
      envAudio.current?.pause();
    }
    localStorage.setItem('setting-ambience', String(ambience));
  }, [ambience]);

  const toggleSogou = (val: boolean) => {
    setUseSogou(val);
    if (val) {
      setUseGoogle(false);
      localStorage.setItem('zen-search-engine', 'sogou');
    } else {
      localStorage.removeItem('zen-search-engine');
    }
  };

  const toggleGoogle = (val: boolean) => {
    setUseGoogle(val);
    if (val) {
      setUseSogou(false);
      localStorage.setItem('zen-search-engine', 'google');
    } else {
      localStorage.removeItem('zen-search-engine');
    }
  };

  const handleChimeToggle = (val: boolean) => {
    setHourlyChime(val);
    localStorage.setItem('setting-chime', String(val));
    if (val) {
      chimeAudio.current?.play().catch(() => {}); // 开启即响铃
    }
  };

  return (
    <div ref={menuRef} className="fixed top-6 left-6 z-[60]">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full border border-white/10 transition-all hover:bg-black/50"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-white text-xl`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-48 md:w-56 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="space-y-5">
            <ToggleItem label="声临其境" checked={ambience} onChange={setAmbience} />
            <ToggleItem label="整点钟声" checked={hourlyChime} onChange={handleChimeToggle} />
            <ToggleItem label="整点刷新" checked={autoRefresh} onChange={(val) => {
              setAutoRefresh(val);
              localStorage.setItem('setting-auto-refresh', String(val));
            }} />
            
            <div className="pt-4 border-t border-white/10 space-y-4">
              <p className="text-[10px] text-white/40 tracking-widest uppercase">搜索引擎</p>
              <ToggleItem label="搜狗搜索" checked={useSogou} onChange={toggleSogou} />
              <ToggleItem label="谷歌搜索" checked={useGoogle} onChange={toggleGoogle} />
            </div>

            {/* 仅保留换一条格言功能 */}
            <div className="pt-4 border-t border-white/10">
              <button 
                onClick={() => { onRefreshQuote?.(); setIsOpen(false); }}
                className="w-full text-left text-sm text-white/60 hover:text-white flex items-center gap-2 py-1 transition-colors"
              >
                <i className="fas fa-sync-alt text-[10px]"></i> 换一条格言
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleItem({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-sm text-white/70 group-hover:text-white transition-colors">{label}</span>
      <button 
        onClick={() => onChange(!checked)} 
        className={`w-8 h-4 rounded-full transition-all relative ${checked ? 'bg-white/40' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${checked ? 'left-5' : 'left-1'}`} />
      </button>
    </div>
  );
}