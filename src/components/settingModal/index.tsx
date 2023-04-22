import { getOpenAIModel, setOpenAIApiKey, setOpenAIModel } from '@/utils';
import { Form, Input, message, Modal, Select } from 'antd';
import React from 'react';

export interface SettingProps {
    open: boolean;
    closeOpen: () => void;
}

const Index = (props: SettingProps) => {
    const { closeOpen, open } = props;

    const [form] = Form.useForm();

    const initialValues = React.useMemo(() => {
        return {
            model: getOpenAIModel(),
            apiKey: localStorage.getItem('OPENAI_API_KEY')
        };
    }, []);

    const onOk = async () => {
        const values = await form.validateFields();
        const { model, apiKey } = values;
        if (apiKey) {
            setOpenAIApiKey(apiKey);
        }
        if (model) {
            setOpenAIModel(model);
        }
        message.success('设置成功');
        closeOpen();
    };

    return (
        <Modal open={open} title='设置' onOk={onOk} onCancel={closeOpen} destroyOnClose maskClosable={false}>
            <div style={{ color: '#666', marginBottom: 10 }}>
                注意：apiKey 不填时，采用默认 apiKey，默认 apiKey 只能支持 GPT-3.5
            </div>
            <Form form={form} initialValues={initialValues} layout='vertical'>
                <Form.Item name='model' label='模型'>
                    <Select
                        style={{ width: 140 }}
                        options={[
                            { label: 'GPT-3.5', value: 'gpt-3.5-turbo' },
                            { label: 'GPT-4', value: 'gpt-4' }
                        ]}
                    />
                </Form.Item>
                <Form.Item name='apiKey' label='apiKey'>
                    <Input placeholder='请输入 apiKey' />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default React.memo(Index);
