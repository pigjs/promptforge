import { getCategory } from '@/services/forge';
import '@/utils/request';

export async function getInitialState() {
    const res: any = await getCategory();
    const data = res.data || [];
    const categoryEnum: any = {};
    data.forEach((item: any) => {
        categoryEnum[item.id] = item.name;
    });
    const categoryOptions = data;
    return {
        categoryEnum,
        categoryOptions
    };
}
