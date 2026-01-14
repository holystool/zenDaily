'use client';

import { useState, useEffect, useRef } from 'react';

export default function SimplifiedMenu({ setCurrentBackground }: { setCurrentBackground: (bg: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ambience, setAmbience] = useState(false);
  const [hourlyChime, setHourlyChime] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const envAudio = useRef<HTMLAudioElement | null>(null);
  const chimeAudio = useRef<HTMLAudioElement | null>(null);
  // 使用 Ref 保持对最新刷新函数的引用
  const refreshFnRef = useRef<() => void>(() => {});

  // 1. 初始化设置与音频
  useEffect(() => {
    const env = new Audio('/hj.mp3');
    env.loop = true;
    envAudio.current = env;
    chimeAudio.current = new Audio('/zs.mp3');

    // 载入持久化设置
    const savedAmbience = localStorage.getItem('setting-ambience') === 'true';
    const savedChime = localStorage.getItem('setting-chime') === 'true';
    const savedAutoRefresh = localStorage.getItem('setting-auto-refresh') === 'true';

    setAmbience(savedAmbience);
    setHourlyChime(savedChime);
    setAutoRefresh(savedAutoRefresh);

    // 音频续播逻辑
    const savedTime = localStorage.getItem('ambience-current-time');
    if (savedTime && env) env.currentTime = parseFloat(savedTime);

    // 记录音频时间，用于下次续播
    const timeTracker = setInterval(() => {
      if (envAudio.current && !envAudio.current.paused) {
        localStorage.setItem('ambience-current-time', String(envAudio.current.currentTime));
      }
    }, 2000);

    return () => clearInterval(timeTracker);
  }, []);

  // 2. 核心报时系统：整点监控（包含声钟错开逻辑）
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      // 每一小时整点触发
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        // A. 如果开启了钟声
        if (hourlyChime) {
          chimeAudio.current?.play();
        }
        
        // B. 如果开启了刷新，则在钟声响起 1.5 秒后（错开负载）刷新背景
        if (autoRefresh) {
          setTimeout(() => {
            window.location.reload(); // 整点时采取全页刷新以确保格言同步
          }, 5000);
        }
      }
    };

    const timer = setInterval(checkTime, 1000);
    return () => clearInterval(timer);
  }, [hourlyChime, autoRefresh]);

  // 3. 处理音频开关
  useEffect(() => {
    if (ambience) {
      envAudio.current?.play().catch(() => {
        const playOnGesture = () => {
          envAudio.current?.play();
          document.removeEventListener('click', playOnGesture);
        };
        document.addEventListener('click', playOnGesture);
      });
    } else {
      envAudio.current?.pause();
    }
    localStorage.setItem('setting-ambience', String(ambience));
  }, [ambience]);

  // 4. 点击外部收回菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const ToggleItem = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
    <div className="flex items-center justify-between cursor-pointer py-1" onClick={() => onChange(!checked)}>
      <span className="text-sm text-white/80 tracking-widest">{label}</span>
      <div className={`relative w-10 h-5 flex items-center rounded-full px-1 transition-colors duration-300 md:hidden ${checked ? 'bg-white/40' : 'bg-white/10'}`}>
        <div className={`bg-white w-3 h-3 rounded-full shadow-md transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
      <input 
        type="checkbox" 
        checked={checked} 
        readOnly
        className="hidden md:block w-4 h-4 accent-white/60 cursor-pointer appearance-none checked:bg-white/60 checked:after:content-['✓'] checked:after:text-black checked:after:text-[10px] checked:after:flex checked:after:justify-center checked:after:items-center border border-white/20 rounded"
      />
    </div>
  );

  return (
    <div ref={menuRef} className="fixed top-4 left-2 md:top-8 md:left-8 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 flex items-center justify-center opacity-40 hover:opacity-100">
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-white text-xl`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-10 left-2 w-48 md:w-56 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="space-y-5">
            <ToggleItem label="声临其境" checked={ambience} onChange={setAmbience} />
            
            <ToggleItem label="整点钟声" checked={hourlyChime} onChange={(val) => {
              setHourlyChime(val);
              localStorage.setItem('setting-chime', String(val));
              if (val) chimeAudio.current?.play(); // 勾选当下试听一次
            }} />
            
            <ToggleItem label="整点刷新" checked={autoRefresh} onChange={(val) => {
              setAutoRefresh(val);
              localStorage.setItem('setting-auto-refresh', String(val));
            }} />
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <button 
              onClick={() => {
                window.location.reload();
              }}
              className="w-full text-left text-xs text-white/40 hover:text-white/100 tracking-widest transition-colors"
            >
              手动更新背景与文字
            </button>
          </div>
        </div>
      )}
    </div>
  );
}