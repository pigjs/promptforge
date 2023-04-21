import { weekdayEnum } from '@/enums/dateTime';
import dayjs from 'dayjs';

export function getCurrentDateTime(targetDateString?: string) {
    let day = dayjs();
    if (targetDateString) {
        // 解析日期字符串
        const parsedDate = dayjs(targetDateString, 'YYYY-MM-DD HH:mm:ss');
        if (parsedDate.isValid()) {
            // 如果日期合法，则使用解析的日期
            day = parsedDate;
        } else {
            // 如果日期不合法，则使用当前日期
            console.warn(`Invalid date string: ${targetDateString}`);
        }
    }

    const w = day.day() as keyof typeof weekdayEnum;

    // 当前日期
    const dateString = day.format(`YYYY年MM月DD日 星期${weekdayEnum[w]}`);

    // 当前时间
    const timeString = day.format('HH:mm');

    // 当前秒数
    const secondsString = day.format('ss');

    return {
        dateString,
        timeString,
        secondsString
    };
}
