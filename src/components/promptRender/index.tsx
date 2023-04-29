import FieldRender from '@/components/fieldRender';
import MessageList from '@/components/messageList';
import { Divider, Input } from 'antd';
import React from 'react';

import styles from './index.less';

import type { FormInstance } from 'antd';

const { TextArea } = Input;

// const messageList = [
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     },
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     },
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     },
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     },
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     },
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     },
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     },
//     {
//         response: '要修改 Spin 组件的颜色，可以通过修改 Spin 组件的 spinClassName 属性来实现。具体的做法如下：',
//         prompt: ' 什么是 React？'
//     }
// ];

const Index = (props) => {
    const { promptInfo, messageList, onSend, stream, streamList, loading } = props;

    const fieldRenderRef = React.useRef<FormInstance>(null);
    const [value, setValue] = React.useState('');

    const onChange = (e) => {
        const val = e.target.value;
        setValue(val);
    };

    const onPressEnter = async (event: any) => {
        if (event.keyCode === 13 && !event.shiftKey && value?.trim()) {
            console.log(event, 'event');
            event.preventDefault();
            // 判断是否处于中文输入状态
            if (event.target.composing) {
                return;
            }
            const values = await fieldRenderRef.current?.validateFields();
            onSend?.({ ...values, prompt: value });
            setValue('');
            // form.setFieldValue('prompt', '');
        }
    };
    return (
        <div className={styles.promptRender}>
            <div className={styles.promptRender_left}>
                <div className={styles.promptRender_left_title}>{promptInfo.name}</div>
                <div className={styles.promptRender_left_description}>{promptInfo.description}</div>
                <Divider />
                {promptInfo.schema ? (
                    <FieldRender
                        ref={fieldRenderRef}
                        layout='vertical'
                        schema={promptInfo.schema}
                        initialValues={promptInfo.initialValues}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                    />
                ) : null}
            </div>
            <Divider type='vertical' />
            <div className={styles.promptRender_right}>
                <div className={styles.promptRender_right_messageList}>
                    <MessageList loading={loading} messageList={messageList} stream={stream} streamList={streamList} />
                </div>
                <div className={styles.promptRender_right_send}>
                    <TextArea
                        onKeyDown={onPressEnter}
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        disabled={loading}
                        placeholder='Send a message...'
                        size='large'
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Index);
