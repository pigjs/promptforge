import FieldRender from '@/components/fieldRender';
import prompt from '@/prompt';
import { performQuery } from '@/services/performQuery';
import { isFunction, useMount, useSetState, useUrlParam } from '@pigjs/utils';
import React from 'react';

import type { MessageListType } from '@/components/fieldRender';

import styles from './index.less';

const Index = () => {
    const [state, setState] = useSetState({
        // 响应信息
        response: null,
        // 响应错误
        error: null,
        loading: false
    });
    const [messageList, setMessageList] = React.useState<MessageListType[]>([]);

    const feature = useUrlParam('feature');

    const promptMemo = React.useMemo(() => {
        // @ts-ignore
        return prompt[feature];
    }, [feature]);

    const onSend = async (values: Record<string, any>) => {
        const { userPrompt, systemPrompt } = promptMemo.prompt;
        const userPromptContent = isFunction(userPrompt) ? userPrompt(values) : values.prompt;
        const systemPromptContent = isFunction(systemPrompt) ? systemPrompt(values) : systemPrompt;
        try {
            // @ts-ignore
            setState({ loading: true });
            const { response } = await performQuery({
                userPrompt: userPromptContent,
                systemPrompt: systemPromptContent
            });
            setState({
                // @ts-ignore
                response,
                error: null,
                loading: false
            });
            setMessageList((list) => [
                ...list,
                {
                    prompt: values.prompt,
                    response
                }
            ]);
        } catch (error: any) {
            setState({
                response: null,
                error,
                loading: false
            });
            setMessageList((list) => [
                ...list,
                {
                    prompt: userPrompt,
                    error
                }
            ]);
        }
    };

    useMount(() => {
        // @ts-ignore
        const { questionAnswer } = window;
        // 从首页搜索过来的
        if (feature === 'questionAnswer' && questionAnswer) {
            // @ts-ignore
            window.questionAnswer = null;
            onSend({ prompt: questionAnswer });
        }
    });

    if (!promptMemo) {
        return null;
    }

    return (
        <div>
            <div className={styles.container}>
                <FieldRender
                    schema={promptMemo.schema}
                    onSend={onSend}
                    loading={state.loading}
                    initialValues={promptMemo.initialValues}
                    messageList={messageList}
                    title={promptMemo.title}
                    description={promptMemo.description}
                />
            </div>
        </div>
    );
};

export default Index;
