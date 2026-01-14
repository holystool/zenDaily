
'use client';

import { useState, useRef, useEffect } from 'react';
import { audioConfig, fallbackAudioConfig, checkAudioFile } from '@/lib/audio-config';

interface AudioState {
  environment: { isPlaying: boolean, volume: number };
  chanting: { isPlaying: boolean, volume: number };
  bell: { volume: number };
}

export default function AudioControls() {
  const [audioState, setAudioState] = useState<AudioState>({
    environment: { isPlaying: false, volume: 0.5 },
    chanting: { isPlaying: false, volume: 0.5 },
    bell: { volume: 0.7 }
  });

  const environmentAudioRef = useRef<HTMLAudioElement | null>(null);
  const chantingAudioRef = useRef<HTMLAudioElement | null>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 初始化音频实例
    const initAudio = async () => {
      // 检查本地音频文件是否存在，不存在则使用备用音频
      const envExists = await checkAudioFile(audioConfig.environment);
      const chantExists = await checkAudioFile(audioConfig.chanting);
      const bellExists = await checkAudioFile(audioConfig.bell);

      environmentAudioRef.current = new Audio(
        envExists ? audioConfig.environment : fallbackAudioConfig.environment
      );
      chantingAudioRef.current = new Audio(
        chantExists ? audioConfig.chanting : fallbackAudioConfig.chanting
      );
      bellAudioRef.current = new Audio(
        bellExists ? audioConfig.bell : fallbackAudioConfig.bell
      );

      // 设置循环播放和音量
      if (environmentAudioRef.current) {
        environmentAudioRef.current.loop = true;
        environmentAudioRef.current.volume = audioState.environment.volume;
      }
      if (chantingAudioRef.current) {
        chantingAudioRef.current.loop = true;
        chantingAudioRef.current.volume = audioState.chanting.volume;
      }
      if (bellAudioRef.current) {
        bellAudioRef.current.volume = audioState.bell.volume;
      }
    };

    initAudio();

    return () => {
      // 清理音频资源
      [environmentAudioRef.current, chantingAudioRef.current, bellAudioRef.current].forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const toggleEnvironment = async () => {
    if (!environmentAudioRef.current) return;
    
    try {
      if (audioState.environment.isPlaying) {
        environmentAudioRef.current.pause();
      } else {
        await environmentAudioRef.current.play();
      }
      setAudioState(prev => ({
        ...prev,
        environment: { ...prev.environment, isPlaying: !prev.environment.isPlaying }
      }));
    } catch (error) {
      console.log('Environment audio play failed:', error);
    }
  };

  const toggleChanting = async () => {
    if (!chantingAudioRef.current) return;
    
    try {
      if (audioState.chanting.isPlaying) {
        chantingAudioRef.current.pause();
      } else {
        await chantingAudioRef.current.play();
      }
      setAudioState(prev => ({
        ...prev,
        chanting: { ...prev.chanting, isPlaying: !prev.chanting.isPlaying }
      }));
    } catch (error) {
      console.log('Chanting audio play failed:', error);
    }
  };

  const playBell = async () => {
    if (!bellAudioRef.current) return;
    
    try {
      bellAudioRef.current.currentTime = 0;
      await bellAudioRef.current.play();
    } catch (error) {
      console.log('Bell audio play failed:', error);
    }
  };

  const updateVolume = (audioType: 'environment' | 'chanting' | 'bell', volume: number) => {
    setAudioState(prev => ({
      ...prev,
      [audioType]: { ...prev[audioType], volume }
    }));

    // 更新实际音频音量
    if (audioType === 'environment' && environmentAudioRef.current) {
      environmentAudioRef.current.volume = volume;
    } else if (audioType === 'chanting' && chantingAudioRef.current) {
      chantingAudioRef.current.volume = volume;
    } else if (audioType === 'bell' && bellAudioRef.current) {
      bellAudioRef.current.volume = volume;
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {/* 环境音控制 */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={toggleEnvironment}
          className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          title="环境音"
        >
          <i className={`fas ${audioState.environment.isPlaying ? 'fa-pause' : 'fa-play'} text-white text-lg`} />
        </button>
        <span className="text-white/80 text-xs">环境音</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={audioState.environment.volume}
          onChange={(e) => updateVolume('environment', parseFloat(e.target.value))}
          className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* 诵经控制 */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={toggleChanting}
          className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          title="诵经"
        >
          <i className={`fas ${audioState.chanting.isPlaying ? 'fa-pause' : 'fa-volume-up'} text-white text-lg`} />
        </button>
        <span className="text-white/80 text-xs">诵经</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={audioState.chanting.volume}
          onChange={(e) => updateVolume('chanting', parseFloat(e.target.value))}
          className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* 钟声控制 */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={playBell}
          className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          title="钟声"
        >
          <i className="fas fa-bell text-white text-lg" />
        </button>
        <span className="text-white/80 text-xs">钟声</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={audioState.bell.volume}
          onChange={(e) => updateVolume('bell', parseFloat(e.target.value))}
          className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
}
