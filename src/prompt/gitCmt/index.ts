import { colorEnum } from '@/enums/feature';
import { prompt } from './prompt';
import { initialValues, schema } from './schema';

import { defineConfig } from '../base';

export default defineConfig({
    title: 'git commit 信息生成器',
    description: '根据输入的描述信息，生成对应的 git commit 信息',
    featureCategory: 'develop',
    prompt,
    schema,
    initialValues,
    cardInfo: {
        name: 'git commit',
        icon: 'G',
        color: colorEnum[2]
    }
});
