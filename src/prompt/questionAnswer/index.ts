import { colorEnum } from '@/enums/feature';
import { defineConfig } from '../base';

export default defineConfig({
    title: '问答',
    description: '问答机器人',
    featureCategory: 'home',
    prompt: {
        systemPrompt: '你是一个问答机器人'
    },
    schema: [],
    initialValues: {},
    cardInfo: {
        name: '问答',
        icon: '问',
        color: colorEnum[2]
    }
});
