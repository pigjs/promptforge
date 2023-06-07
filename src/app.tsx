import { colorEnum } from '@/enums/feature';
import { getCategory } from '@/services/forge';
import '@/utils/request';

export async function getInitialState() {
    const res = await getCategory();
    const data = res.data || [];
    const categoryEnum: Record<string, string> = {};
    const categoryColorEnum: Record<string, string> = {};
    const len = Object.keys(colorEnum).length;
    data.forEach((item, index) => {
        categoryEnum[item.id] = item.name;
        const count = (index + 1) % len;
        // @ts-ignore
        categoryColorEnum[item.id] = colorEnum[count];
    });
    return {
        categoryEnum,
        categoryOptions: data,
        categoryColorEnum
    };
}
