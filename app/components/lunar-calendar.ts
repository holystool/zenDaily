// @ts-ignore
import { Lunar } from 'lunar-javascript';

/**
 * 获取指定日期的农历文字描述
 */
export function getLunarDate(date: Date): string {
  try {
    // @ts-ignore
    const lunar = Lunar.fromDate(date);
    return `农历${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  } catch (e) {
    return '农历日期获取失败';
  }
}