'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface BackgroundManagerProps {
  setCurrentBackground: (bg: string) => void;
  triggerRef?: React.MutableRefObject<(() => void) | null>;
}

export default function BackgroundManager({ setCurrentBackground, triggerRef }: BackgroundManagerProps) {
  const [isChanging, setIsChanging] = useState(false);
  // 使用 Ref 记录当前图片，防止重复渲染
  const lastUrlRef = useRef('');

  const changeRandomBackground = useCallback(() => {
    if (isChanging || typeof setCurrentBackground !== 'function') return;
    
    setIsChanging(true);

    const isMobile = typeof window !== 'undefined' && window.innerHeight > window.innerWidth;
    const width = isMobile ? 1080 : 1920;
    const height = isMobile ? 1920 : 1080;

    /**
     * 方案：Unsplash 开发者专用随机接口 (无需 Key 也能稳定调用)
     * 格式：https://images.unsplash.com/featured/分辨率?关键词&sig=随机数
     */
    const randomUrl = `https://images.unsplash.com/featured/${width}x${height}?zen,nature,temple,meditation&sig=${Math.random()}`;

    const img = new Image();
    img.src = randomUrl;

    img.onload = () => {
      // 只有当新图加载完成后才更新状态
      console.log("✅ 图片加载成功，来源: Unsplash", randomUrl);
      setCurrentBackground(randomUrl);
      lastUrlRef.current = randomUrl;
      localStorage.setItem('daily-background', randomUrl);
      
      // 增加延时防止连续点击导致的逻辑混乱
      setTimeout(() => setIsChanging(false), 1000);
    };

    img.onerror = () => {
      // 容错方案
      const fallback = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
      setCurrentBackground(fallback);
      setIsChanging(false);
    };
  }, [isChanging, setCurrentBackground]);

  // 关键：将函数注册到 Ref 供外部（如菜单按钮）调用
  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = changeRandomBackground;
    }
  }, [triggerRef, changeRandomBackground]);

  // 关键：页面初次加载时执行一次，且依赖数组为空，防止无限循环
  useEffect(() => {
    changeRandomBackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return null;
}