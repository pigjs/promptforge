import { RoleEnum } from '@/components/messageList';
import PromptRender from '@/components/promptRender';
import { usePerformQueryStream } from '@/hooks/usePerformQueryStream';
import { usePromptStorage } from '@/hooks/usePromptStorage';
import { TourEnum, useTour } from '@/hooks/useTour';
import { getCompletionsInfo, getDetail, getEditDetail } from '@/services/forge';
import { useMount, useUrlParam } from '@pigjs/utils';
import { Divider, Modal, Tour } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import Sidebar from './components/sidebar';
import { getTourSteps } from './utils';

import styles from './index.less';

const Index = () => {
    const [detail, setDetail] = React.useState<any>(null);

    const id = useUrlParam('id');
    const preview = useUrlParam('preview');

    const { mobile } = useModel('uaModel');

    const [messageList = [], setMessageList] = usePromptStorage(id, preview !== 'true');
    const { streamMessage, loading, streamLoading, run } = usePerformQueryStream();

    const sidebarRef = React.useRef(null);
    const ref1 = React.useRef(null);
    const ref2 = React.useRef(null);
    const ref3 = React.useRef(null);

    const { open, closeTour, openTour } = useTour(TourEnum.featureTour);

    const steps = getTourSteps({
        mobile,
        ref1,
        ref2,
        ref3
    });

    const getData = async () => {
        let res;
        if (preview === 'true') {
            res = await getEditDetail(id);
        } else {
            res = await getDetail(id);
        }
        const data = res.data || {};
        try {
            const { schema, initialValues, ...otherData } = data;
            const resetData = {
                schema: schema ? JSON.parse(schema) : {},
                initialValues: initialValues ? JSON.parse(initialValues) : {},
                ...otherData
            };
            setDetail(resetData);
        } catch (err) {
            console.error('解析应用配置错误：', err);
            Modal.error({
                title: '温馨提示',
                content: '解析应用配置错误，请刷新重试'
            });
        }
        setTimeout(() => {
            openTour();
        }, 1000);
    };

    useMount(() => {
        getData();
    });

    const getValues = async () => {
        const { initialValues } = detail;
        let values: Record<string, any> = {};
        if (sidebarRef.current?.validateFields) {
            values = await sidebarRef.current.validateFields();
        } else {
            values = initialValues;
        }
        return values;
    };

    const onSend = async (value: string) => {
        const values = await getValues();
        const res = await getCompletionsInfo({ id, userPromptOptions: { ...values, prompt: value } });
        const message = {
            role: RoleEnum.user,
            content: value
        };
        // @ts-ignore
        setMessageList((state) => [...state, message]);
        const { data } = res;
        const assistantMessage = await run(data);
        // @ts-ignore
        setMessageList((list) => [...list, assistantMessage]);
    };

    if (!detail) {
        return null;
    }

    const promptRenderProps = {
        dataSource: messageList,
        loading,
        streamMessage,
        onSend,
        streamLoading,
        sendMessageRef: ref3
    };

    const { schema, initialValues, name, description } = detail;

    const sidebarProps = {
        schema,
        initialValues,
        name,
        description,
        ref: sidebarRef,
        ref1,
        ref2
    };

    return (
        <div className={styles.page}>
            <Sidebar {...sidebarProps} />
            {!mobile && <Divider type='vertical' />}
            <PromptRender {...promptRenderProps} />
            <Tour open={open} onClose={closeTour} steps={steps} />
        </div>
    );
};

export default Index;
