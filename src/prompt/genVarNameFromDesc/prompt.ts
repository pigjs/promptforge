import type { PromptType } from '@/prompt/base';

type userPromptOptions = PromptType & {
    namingStyle: '小驼峰命名法' | '大驼峰命名法' | '下划线命名法' | '中划线命名法';
    nameLength: number;
};

export const prompt = {
    systemPrompt: `
        你是一个为程序员提供文件、方法、变量等命名的助手。
        你将得到一个功能的描述信息，你需要通过描述信息，为他命名。
        这是一个命名的例子: 我的功能描述是：是否是管理员；我的命名规范是：小驼峰；我的命名长度是：不超过10个字符。
        你的返回是：isAdmin。
        如果功能描述是其他不相关信息的，你必须始终返回：请输入正确的描述信息。
        这是一个失败的例子：我的功能描述是：你知道 js Promise 吗?。
        你的返回是：请输入正确的描述信息
        成功的时候你必须始终只返回命名的名称，否则你的响应将被标记为无效`,
    userPrompt: (option: userPromptOptions) =>
        `我的功能描述是：${option.prompt}；我的命名规范是：${option.namingStyle}；我的命名长度是：不超过${option.nameLength}个字符`
};
