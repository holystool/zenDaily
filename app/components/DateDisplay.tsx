'use client';

import { useState, useEffect } from 'react';
// @ts-ignore
import { Lunar, Solar } from 'lunar-javascript';
import { getLunarDate } from './lunar-calendar';

interface BuddhistEvent {
  name: string;
  daysLeft: number;
}

const FESTIVAL_LIST = [
{ name: '弥勒菩萨圣诞', month: 1, day: 1 },
{ name: '定光古佛圣诞', month: 1, day: 6 },
{ name: '释迦牟尼佛出家日', month: 2, day: 8 },
{ name: '释迦牟尼佛涅槃日', month: 2, day: 15 },
{ name: '观世音菩萨圣诞', month: 2, day: 19 },
{ name: '普贤菩萨圣诞', month: 2, day: 21 },
{ name: '准提菩萨圣诞', month: 3, day: 16 },
{ name: '文殊菩萨圣诞', month: 4, day: 4 },
{ name: '释迦牟尼佛圣诞（浴佛节）', month: 4, day: 8 },
{ name: '佛吉祥日（卫塞节）', month: 4, day: 15 },
{ name: '药王菩萨圣诞', month: 4, day: 28 },
{ name: '伽蓝菩萨圣诞', month: 5, day: 13 },
{ name: '韦驮菩萨圣诞', month: 6, day: 3 },
{ name: '观世音菩萨成道日', month: 6, day: 19 },
{ name: '大势至菩萨圣诞', month: 7, day: 13 },
{ name: '佛欢喜日（盂兰盆节）', month: 7, day: 15 },
{ name: '地藏菩萨圣诞', month: 7, day: 30 },
{ name: '燃灯古佛圣诞', month: 8, day: 22 },
{ name: '观世音菩萨出家日', month: 9, day: 19 },
{ name: '药师佛圣诞', month: 9, day: 30 },
{ name: '达摩祖师圣诞', month: 10, day: 5 },
{ name: '阿弥陀佛圣诞', month: 11, day: 17 },
{ name: '释迦牟尼佛成道日（腊八节）', month: 12, day: 8 },
{ name: '华严菩萨圣诞', month: 12, day: 29 }
];

export default function DateDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [buddhistEvent, setBuddhistEvent] = useState<BuddhistEvent | null>(null);

  useEffect(() => {
    const updateDateInfo = () => {
      const now = new Date();
      setCurrentDate(now);
      const todayCheck = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      let nearest = null;
      let minDiff = Infinity;

      // 获取当前日期的农历信息
      const currentLunar = Lunar.fromDate(now);
      const currentLunarYear = currentLunar.getYear();

      FESTIVAL_LIST.forEach(fest => {
        try {
          // 检查三个可能的农历年份：去年、今年、明年，确保覆盖跨年情况
          [currentLunarYear - 1, currentLunarYear, currentLunarYear + 1].forEach(lYear => {
            const lunarObj = Lunar.fromYmd(lYear, fest.month, fest.day);
            const solarObj = lunarObj.getSolar();
            const festivalSolarDate = new Date(solarObj.getYear(), solarObj.getMonth() - 1, solarObj.getDay());

            const diffTime = festivalSolarDate.getTime() - todayCheck.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // 只取未来的节日，且是最近的一个
            if (diffDays >= 0 && diffDays < minDiff) {
              minDiff = diffDays;
              nearest = { name: fest.name, daysLeft: diffDays };
            }
          });
        } catch (e) {
          // 忽略部分农历不存在的日期报错
        }
      });

      setBuddhistEvent(nearest);
    };

    updateDateInfo();
    const timer = setInterval(updateDateInfo, 60000); 
    return () => clearInterval(timer);
  }, []);

  const getWeekDay = (date: Date): string => {
    return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
  };

  const getLunarString = (date: Date) => {
    const lunar = Solar.fromDate(date).getLunar();
    return `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  };

  return (
    <div className="text-center text-white">
      {/* 农历月日 */}
      <div className="text-lg font-medium text-white/90 mb-2 tracking-wide">
        {getLunarString(currentDate)}
      </div>
      
      {/* 星期与节日倒计时 */}
      <div className="text-xs text-white/80 mb-8 leading-relaxed h-4">
        <span>{getWeekDay(currentDate)}</span>
        {buddhistEvent && (
          <>
            <span className="mx-2">·</span>
            <span>
              {buddhistEvent.daysLeft === 0 
                ? `今日即是${buddhistEvent.name}` 
                : `距${buddhistEvent.name}还有 ${buddhistEvent.daysLeft} 日`}
            </span>
          </>
        )}
      </div>

      {/* 公历日 */}
      <div 
        className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-white mb-8"
        style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
      >
        {currentDate.getDate()}
      </div>

      {/* 公历年月 */}
      <div className="text-sm tracking-[0.2em] text-white/70">
        {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
      </div>
    </div>
  );
}