import { colorEnum } from '@/enums/feature';
import { prompt } from './prompt';
import { initialValues, schema } from './schema';

import { defineConfig } from '../base';

export default defineConfig({
    title: '命名工具',
    description: '根据输入的参数和描述信息，生成对应的方法或变量名称',
    featureCategory: 'develop',
    prompt,
    schema,
    initialValues,
    cardInfo: {
        name: '命名工具',
        icon: '命',
        color: colorEnum[1]
    }
});
