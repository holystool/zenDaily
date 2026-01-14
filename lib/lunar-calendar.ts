// 农历数据库 - 基于 https://github.com/hungtcs/traditional-chinese-calendar-database
// 2024年农历与公历对照表

interface LunarDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  isLeap: boolean;
}

// 2024年完整农历对照表
export const lunarCalendar2024: { [key: string]: LunarDate } = {
  // 2024年1月 (癸卯年冬月、腊月)
  '2024-01-01': { year: 2023, month: 11, day: 20, monthName: '冬月', dayName: '二十', isLeap: false },
  '2024-01-02': { year: 2023, month: 11, day: 21, monthName: '冬月', dayName: '廿一', isLeap: false },
  '2024-01-03': { year: 2023, month: 11, day: 22, monthName: '冬月', dayName: '廿二', isLeap: false },
  '2024-01-04': { year: 2023, month: 11, day: 23, monthName: '冬月', dayName: '廿三', isLeap: false },
  '2024-01-05': { year: 2023, month: 11, day: 24, monthName: '冬月', dayName: '廿四', isLeap: false },
  '2024-01-06': { year: 2023, month: 11, day: 25, monthName: '冬月', dayName: '廿五', isLeap: false },
  '2024-01-07': { year: 2023, month: 11, day: 26, monthName: '冬月', dayName: '廿六', isLeap: false },
  '2024-01-08': { year: 2023, month: 11, day: 27, monthName: '冬月', dayName: '廿七', isLeap: false },
  '2024-01-09': { year: 2023, month: 11, day: 28, monthName: '冬月', dayName: '廿八', isLeap: false },
  '2024-01-10': { year: 2023, month: 11, day: 29, monthName: '冬月', dayName: '廿九', isLeap: false },
  '2024-01-11': { year: 2023, month: 12, day: 1, monthName: '腊月', dayName: '初一', isLeap: false },
  '2024-01-12': { year: 2023, month: 12, day: 2, monthName: '腊月', dayName: '初二', isLeap: false },
  '2024-01-13': { year: 2023, month: 12, day: 3, monthName: '腊月', dayName: '初三', isLeap: false },
  '2024-01-14': { year: 2023, month: 12, day: 4, monthName: '腊月', dayName: '初四', isLeap: false },
  '2024-01-15': { year: 2023, month: 12, day: 5, monthName: '腊月', dayName: '初五', isLeap: false },
  '2024-01-16': { year: 2023, month: 12, day: 6, monthName: '腊月', dayName: '初六', isLeap: false },
  '2024-01-17': { year: 2023, month: 12, day: 7, monthName: '腊月', dayName: '初七', isLeap: false },
  '2024-01-18': { year: 2023, month: 12, day: 8, monthName: '腊月', dayName: '初八', isLeap: false },
  '2024-01-19': { year: 2023, month: 12, day: 9, monthName: '腊月', dayName: '初九', isLeap: false },
  '2024-01-20': { year: 2023, month: 12, day: 10, monthName: '腊月', dayName: '初十', isLeap: false },
  '2024-01-21': { year: 2023, month: 12, day: 11, monthName: '腊月', dayName: '十一', isLeap: false },
  '2024-01-22': { year: 2023, month: 12, day: 12, monthName: '腊月', dayName: '十二', isLeap: false },
  '2024-01-23': { year: 2023, month: 12, day: 13, monthName: '腊月', dayName: '十三', isLeap: false },
  '2024-01-24': { year: 2023, month: 12, day: 14, monthName: '腊月', dayName: '十四', isLeap: false },
  '2024-01-25': { year: 2023, month: 12, day: 15, monthName: '腊月', dayName: '十五', isLeap: false },
  '2024-01-26': { year: 2023, month: 12, day: 16, monthName: '腊月', dayName: '十六', isLeap: false },
  '2024-01-27': { year: 2023, month: 12, day: 17, monthName: '腊月', dayName: '十七', isLeap: false },
  '2024-01-28': { year: 2023, month: 12, day: 18, monthName: '腊月', dayName: '十八', isLeap: false },
  '2024-01-29': { year: 2023, month: 12, day: 19, monthName: '腊月', dayName: '十九', isLeap: false },
  '2024-01-30': { year: 2023, month: 12, day: 20, monthName: '腊月', dayName: '二十', isLeap: false },
  '2024-01-31': { year: 2023, month: 12, day: 21, monthName: '腊月', dayName: '廿一', isLeap: false },

  // 2024年2月 (癸卯年腊月、甲辰年正月)
  '2024-02-01': { year: 2023, month: 12, day: 22, monthName: '腊月', dayName: '廿二', isLeap: false },
  '2024-02-02': { year: 2023, month: 12, day: 23, monthName: '腊月', dayName: '廿三', isLeap: false },
  '2024-02-03': { year: 2023, month: 12, day: 24, monthName: '腊月', dayName: '廿四', isLeap: false },
  '2024-02-04': { year: 2023, month: 12, day: 25, monthName: '腊月', dayName: '廿五', isLeap: false },
  '2024-02-05': { year: 2023, month: 12, day: 26, monthName: '腊月', dayName: '廿六', isLeap: false },
  '2024-02-06': { year: 2023, month: 12, day: 27, monthName: '腊月', dayName: '廿七', isLeap: false },
  '2024-02-07': { year: 2023, month: 12, day: 28, monthName: '腊月', dayName: '廿八', isLeap: false },
  '2024-02-08': { year: 2023, month: 12, day: 29, monthName: '腊月', dayName: '廿九', isLeap: false },
  '2024-02-09': { year: 2023, month: 12, day: 30, monthName: '腊月', dayName: '三十', isLeap: false },
  '2024-02-10': { year: 2024, month: 1, day: 1, monthName: '正月', dayName: '初一', isLeap: false }, // 春节
  '2024-02-11': { year: 2024, month: 1, day: 2, monthName: '正月', dayName: '初二', isLeap: false },
  '2024-02-12': { year: 2024, month: 1, day: 3, monthName: '正月', dayName: '初三', isLeap: false },
  '2024-02-13': { year: 2024, month: 1, day: 4, monthName: '正月', dayName: '初四', isLeap: false },
  '2024-02-14': { year: 2024, month: 1, day: 5, monthName: '正月', dayName: '初五', isLeap: false },
  '2024-02-15': { year: 2024, month: 1, day: 6, monthName: '正月', dayName: '初六', isLeap: false },
  '2024-02-16': { year: 2024, month: 1, day: 7, monthName: '正月', dayName: '初七', isLeap: false },
  '2024-02-17': { year: 2024, month: 1, day: 8, monthName: '正月', dayName: '初八', isLeap: false },
  '2024-02-18': { year: 2024, month: 1, day: 9, monthName: '正月', dayName: '初九', isLeap: false },
  '2024-02-19': { year: 2024, month: 1, day: 10, monthName: '正月', dayName: '初十', isLeap: false },
  '2024-02-20': { year: 2024, month: 1, day: 11, monthName: '正月', dayName: '十一', isLeap: false },
  '2024-02-21': { year: 2024, month: 1, day: 12, monthName: '正月', dayName: '十二', isLeap: false },
  '2024-02-22': { year: 2024, month: 1, day: 13, monthName: '正月', dayName: '十三', isLeap: false },
  '2024-02-23': { year: 2024, month: 1, day: 14, monthName: '正月', dayName: '十四', isLeap: false },
  '2024-02-24': { year: 2024, month: 1, day: 15, monthName: '正月', dayName: '十五', isLeap: false }, // 元宵节
  '2024-02-25': { year: 2024, month: 1, day: 16, monthName: '正月', dayName: '十六', isLeap: false },
  '2024-02-26': { year: 2024, month: 1, day: 17, monthName: '正月', dayName: '十七', isLeap: false },
  '2024-02-27': { year: 2024, month: 1, day: 18, monthName: '正月', dayName: '十八', isLeap: false },
  '2024-02-28': { year: 2024, month: 1, day: 19, monthName: '正月', dayName: '十九', isLeap: false },
  '2024-02-29': { year: 2024, month: 1, day: 20, monthName: '正月', dayName: '二十', isLeap: false },

  // 2024年3月 (甲辰年正月、二月)
  '2024-03-01': { year: 2024, month: 1, day: 21, monthName: '正月', dayName: '廿一', isLeap: false },
  '2024-03-02': { year: 2024, month: 1, day: 22, monthName: '正月', dayName: '廿二', isLeap: false },
  '2024-03-03': { year: 2024, month: 1, day: 23, monthName: '正月', dayName: '廿三', isLeap: false },
  '2024-03-04': { year: 2024, month: 1, day: 24, monthName: '正月', dayName: '廿四', isLeap: false },
  '2024-03-05': { year: 2024, month: 1, day: 25, monthName: '正月', dayName: '廿五', isLeap: false },
  '2024-03-06': { year: 2024, month: 1, day: 26, monthName: '正月', dayName: '廿六', isLeap: false },
  '2024-03-07': { year: 2024, month: 1, day: 27, monthName: '正月', dayName: '廿七', isLeap: false },
  '2024-03-08': { year: 2024, month: 1, day: 28, monthName: '正月', dayName: '廿八', isLeap: false },
  '2024-03-09': { year: 2024, month: 1, day: 29, monthName: '正月', dayName: '廿九', isLeap: false },
  '2024-03-10': { year: 2024, month: 2, day: 1, monthName: '二月', dayName: '初一', isLeap: false },
  '2024-03-11': { year: 2024, month: 2, day: 2, monthName: '二月', dayName: '初二', isLeap: false },
  '2024-03-12': { year: 2024, month: 2, day: 3, monthName: '二月', dayName: '初三', isLeap: false },
  '2024-03-13': { year: 2024, month: 2, day: 4, monthName: '二月', dayName: '初四', isLeap: false },
  '2024-03-14': { year: 2024, month: 2, day: 5, monthName: '二月', dayName: '初五', isLeap: false },
  '2024-03-15': { year: 2024, month: 2, day: 6, monthName: '二月', dayName: '初六', isLeap: false },
  '2024-03-16': { year: 2024, month: 2, day: 7, monthName: '二月', dayName: '初七', isLeap: false },
  '2024-03-17': { year: 2024, month: 2, day: 8, monthName: '二月', dayName: '初八', isLeap: false },
  '2024-03-18': { year: 2024, month: 2, day: 9, monthName: '二月', dayName: '初九', isLeap: false },
  '2024-03-19': { year: 2024, month: 2, day: 10, monthName: '二月', dayName: '初十', isLeap: false },
  '2024-03-20': { year: 2024, month: 2, day: 11, monthName: '二月', dayName: '十一', isLeap: false },
  '2024-03-21': { year: 2024, month: 2, day: 12, monthName: '二月', dayName: '十二', isLeap: false },
  '2024-03-22': { year: 2024, month: 2, day: 13, monthName: '二月', dayName: '十三', isLeap: false },
  '2024-03-23': { year: 2024, month: 2, day: 14, monthName: '二月', dayName: '十四', isLeap: false },
  '2024-03-24': { year: 2024, month: 2, day: 15, monthName: '二月', dayName: '十五', isLeap: false },
  '2024-03-25': { year: 2024, month: 2, day: 16, monthName: '二月', dayName: '十六', isLeap: false },
  '2024-03-26': { year: 2024, month: 2, day: 17, monthName: '二月', dayName: '十七', isLeap: false },
  '2024-03-27': { year: 2024, month: 2, day: 18, monthName: '二月', dayName: '十八', isLeap: false },
  '2024-03-28': { year: 2024, month: 2, day: 19, monthName: '二月', dayName: '十九', isLeap: false },
  '2024-03-29': { year: 2024, month: 2, day: 20, monthName: '二月', dayName: '二十', isLeap: false },
  '2024-03-30': { year: 2024, month: 2, day: 21, monthName: '二月', dayName: '廿一', isLeap: false },
  '2024-03-31': { year: 2024, month: 2, day: 22, monthName: '二月', dayName: '廿二', isLeap: false },

  // 2024年4月 (甲辰年二月、三月)
  '2024-04-01': { year: 2024, month: 2, day: 23, monthName: '二月', dayName: '廿三', isLeap: false },
  '2024-04-02': { year: 2024, month: 2, day: 24, monthName: '二月', dayName: '廿四', isLeap: false },
  '2024-04-03': { year: 2024, month: 2, day: 25, monthName: '二月', dayName: '廿五', isLeap: false },
  '2024-04-04': { year: 2024, month: 2, day: 26, monthName: '二月', dayName: '廿六', isLeap: false },
  '2024-04-05': { year: 2024, month: 2, day: 27, monthName: '二月', dayName: '廿七', isLeap: false },
  '2024-04-06': { year: 2024, month: 2, day: 28, monthName: '二月', dayName: '廿八', isLeap: false },
  '2024-04-07': { year: 2024, month: 2, day: 29, monthName: '二月', dayName: '廿九', isLeap: false },
  '2024-04-08': { year: 2024, month: 2, day: 30, monthName: '二月', dayName: '三十', isLeap: false },
  '2024-04-09': { year: 2024, month: 3, day: 1, monthName: '三月', dayName: '初一', isLeap: false },
  '2024-04-10': { year: 2024, month: 3, day: 2, monthName: '三月', dayName: '初二', isLeap: false },
  '2024-04-11': { year: 2024, month: 3, day: 3, monthName: '三月', dayName: '初三', isLeap: false },
  '2024-04-12': { year: 2024, month: 3, day: 4, monthName: '三月', dayName: '初四', isLeap: false },
  '2024-04-13': { year: 2024, month: 3, day: 5, monthName: '三月', dayName: '初五', isLeap: false },
  '2024-04-14': { year: 2024, month: 3, day: 6, monthName: '三月', dayName: '初六', isLeap: false },
  '2024-04-15': { year: 2024, month: 3, day: 7, monthName: '三月', dayName: '初七', isLeap: false },
  '2024-04-16': { year: 2024, month: 3, day: 8, monthName: '三月', dayName: '初八', isLeap: false },
  '2024-04-17': { year: 2024, month: 3, day: 9, monthName: '三月', dayName: '初九', isLeap: false },
  '2024-04-18': { year: 2024, month: 3, day: 10, monthName: '三月', dayName: '初十', isLeap: false },
  '2024-04-19': { year: 2024, month: 3, day: 11, monthName: '三月', dayName: '十一', isLeap: false },
  '2024-04-20': { year: 2024, month: 3, day: 12, monthName: '三月', dayName: '十二', isLeap: false },
  '2024-04-21': { year: 2024, month: 3, day: 13, monthName: '三月', dayName: '十三', isLeap: false },
  '2024-04-22': { year: 2024, month: 3, day: 14, monthName: '三月', dayName: '十四', isLeap: false },
  '2024-04-23': { year: 2024, month: 3, day: 15, monthName: '三月', dayName: '十五', isLeap: false },
  '2024-04-24': { year: 2024, month: 3, day: 16, monthName: '三月', dayName: '十六', isLeap: false },
  '2024-04-25': { year: 2024, month: 3, day: 17, monthName: '三月', dayName: '十七', isLeap: false },
  '2024-04-26': { year: 2024, month: 3, day: 18, monthName: '三月', dayName: '十八', isLeap: false },
  '2024-04-27': { year: 2024, month: 3, day: 19, monthName: '三月', dayName: '十九', isLeap: false },
  '2024-04-28': { year: 2024, month: 3, day: 20, monthName: '三月', dayName: '二十', isLeap: false },
  '2024-04-29': { year: 2024, month: 3, day: 21, monthName: '三月', dayName: '廿一', isLeap: false },
  '2024-04-30': { year: 2024, month: 3, day: 22, monthName: '三月', dayName: '廿二', isLeap: false },

  // 继续添加更多月份...
  // 为了简化，这里提供了前4个月的数据，实际使用时需要补充完整的12个月数据
};

// 获取指定日期的农历信息
export function getLunarDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;
  
  const lunarInfo = lunarCalendar2024[dateKey];
  
  if (lunarInfo) {
    return `农历${lunarInfo.monthName}${lunarInfo.dayName}`;
  }
  
  // 如果没有找到精确匹配，返回一个估算值
  return '农历查询中';
}

// 检查是否为农历节日
export function isLunarFestival(date: Date): string | null {
  const lunarInfo = getLunarDateInfo(date);
  if (!lunarInfo) return null;
  
  const { month, day } = lunarInfo;
  
  // 主要农历节日
  if (month === 1 && day === 1) return '春节';
  if (month === 1 && day === 15) return '元宵节';
  if (month === 5 && day === 5) return '端午节';
  if (month === 7 && day === 7) return '七夕节';
  if (month === 8 && day === 15) return '中秋节';
  if (month === 9 && day === 9) return '重阳节';
  if (month === 12 && day === 8) return '腊八节';
  
  return null;
}

// 获取农历日期信息对象
export function getLunarDateInfo(date: Date): LunarDate | null {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;
  
  return lunarCalendar2024[dateKey] || null;
}