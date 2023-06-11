import { RoleEnum } from '@/components/messageList';
import PromptRender from '@/components/promptRender';
import { usePerformQueryStream } from '@/hooks/usePerformQueryStream';
import { usePromptStorage } from '@/hooks/usePromptStorage';
import { getApiKey } from '@/services/openai';
import { GPTTokens } from '@/utils/gptTokens';
import { useRequest } from 'ahooks';
import React from 'react';

import type { MessageType } from '@/components/messageList';
import { isArray } from '@pigjs/utils';

export type OpenAIMessagesType = {
    role: MessageType['role'];
    content: string;
};

const Index = (props: { id: string; setName: (value: string) => void }) => {
    const { id, setName } = props;
    // const { mobile } = useModel('uaModel');

    const [messageList = [], setMessageList] = usePromptStorage<MessageType>(id);
    const { streamMessage, loading, streamLoading, run } = usePerformQueryStream();

    const { data: res } = useRequest(getApiKey);
    const apiKey = res?.data;

    const getMessages = (message: OpenAIMessagesType) => {
        const systemMessage = {
            role: RoleEnum.system,
            content: `You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.`
        };
        // 过滤掉错误的信息，和无用字段
        const resetMessageList = messageList.filter((item) => !item.error || !item.usedTokens);
        const list = [...resetMessageList, message];
        let tokens = 0;
        let messages: any[] = [];
        while (list.length > 0 && tokens < 3400) {
            const item = list.pop();
            tokens += item.usedTokens;
            if (tokens < 3000) {
                messages = [item, ...messages];
            }
        }
        const resetMessages = messages.map((item) => {
            const { role, content } = item;
            return { role, content };
        });
        return [systemMessage, ...resetMessages] as unknown as OpenAIMessagesType[];
    };

    const getUsedTokens = (options) => {
        const { model = 'gpt-3.5-turbo', messages, message } = options;
        const usageInfo = new GPTTokens({
            model,
            messages: isArray(messages) ? messages : [message]
        });
        return usageInfo.usedTokens;
    };

    const onSend = async (value: string) => {
        const message = {
            role: RoleEnum.user,
            content: value
        };
        const usedTokens = getUsedTokens({ message });
        message.usedTokens = usedTokens;
        const messages = getMessages(message);
        const isSetName = messageList.length === 0;
        // @ts-ignore
        setMessageList((list) => [...list, message]);
        const assistantMessage = await run({ apiKey, content: { messages } });
        const assistantUsedTokens = getUsedTokens({ message: assistantMessage });
        // @ts-ignore
        setMessageList((list) => [...list, { ...assistantMessage, usedTokens: assistantUsedTokens }]);
        if (isSetName) {
            setName(value);
        }
    };

    const promptRenderProps = {
        dataSource: messageList,
        loading,
        streamMessage,
        onSend,
        streamLoading
    };

    return <PromptRender {...promptRenderProps} />;
};

export default Index;
