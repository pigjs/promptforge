import { colorEnum } from '@/enums/feature';
import { defineConfig } from '../base';

export default defineConfig({
    title: '会话',
    description: '可以进行会话的机器人',
    featureCategory: 'other',
    conversation: true,
    prompt: {
        systemPrompt: ''
    },
    schema: [],
    initialValues: {},
    cardInfo: {
        name: '会话',
        icon: '聊',
        color: colorEnum[1]
    }
});
