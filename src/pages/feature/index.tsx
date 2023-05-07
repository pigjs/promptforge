import PromptRender from '@/components/promptRender';
import { getDetail, getEditDetail } from '@/services/forge';
import { useMount, useUrlParam } from '@pigjs/utils';
import { Modal } from 'antd';
import React from 'react';

const Index = () => {
    const [detail, setDetail] = React.useState<any>(null);

    const id = useUrlParam('id');

    const preview = useUrlParam('preview');

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
    };

    useMount(() => {
        getData();
        // // @ts-ignore
        // const { questionAnswer } = window;
        // // 从首页搜索过来的
        // if (feature === 'questionAnswer' && questionAnswer) {
        //     // @ts-ignore
        //     window.questionAnswer = null;
        //     onSend({ prompt: questionAnswer });
        // }
    });

    if (!detail) {
        return null;
    }

    return (
        <div style={{ height: 'calc(100vh - 112px)' }}>
            <PromptRender promptInfo={detail} id={id} />
        </div>
    );
};

export default Index;
