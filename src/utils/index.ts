import { openAIApiKey } from '@/config';

/** 获取 openAIApiKey */
export function getOpenAIApiKey() {
    const key = localStorage.getItem('OPENAI_API_KEY');
    return key || openAIApiKey;
}

/** 设置 openAIApiKey */
export function setOpenAIApiKey(key: string) {
    localStorage.setItem('OPENAI_API_KEY', key);
}

/** 清除 openAIApiKey */
export function clearOpenAIApiKey() {
    localStorage.removeItem('OPENAI_API_KEY');
}
