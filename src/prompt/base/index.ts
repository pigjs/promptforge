import type { SchemaProps } from '@/components/fieldRender';

export type PromptType = {
    prompt: string;
};

export type PromptSchemaType = {
    /** 功能分类 */
    featureCategory: 'home';
    /** 功能标题 */
    title: string;
    /** 功能描述信息 */
    description: string;
    /** Prompt 信息 */
    prompt: {
        systemPrompt: ((options: any) => string) | string;
        userPrompt?: ((options: any) => string) | string;
    };
    /** 表单配置 */
    schema?: SchemaProps[];
    /** 表单初始值 */
    initialValues?: Record<string, any>;
    /** 卡片信息 */
    cardInfo: {
        /** 名称 最好不要超过 4个字 */
        name: string;
        /** icon 可以文字或者图片地址 */
        icon: string;
        /** 卡片背景颜色 */
        color?: string;
    };
    /** 开启会话模式（上下文） */
    conversation?: boolean;
};

export function defineConfig(options: PromptSchemaType) {
    return options;
}
