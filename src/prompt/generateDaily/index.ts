import { colorEnum } from '@/enums/feature';
import { prompt } from './prompt';

import { defineConfig } from '../base';

export default defineConfig({
    title: '日报生成',
    description: '根据输入内容，生成对应的日报',
    featureCategory: 'home',
    prompt,
    schema: [],
    initialValues: {},
    cardInfo: {
        name: '日报生成',
        icon: '日',
        color: colorEnum[1]
    }
});
