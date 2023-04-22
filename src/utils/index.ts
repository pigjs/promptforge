import { openAIApiKey, openAIModel } from '@/config';

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

/** 获取 openAIModel */
export function getOpenAIModel() {
    const key = localStorage.getItem('OPENAI_Model');
    return key || openAIModel;
}

/** 设置 openAIModel */
export function setOpenAIModel(key: string) {
    localStorage.setItem('OPENAI_Model', key);
}
