import { addSecretkey } from '@/services/forge';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';

export default (props) => {
    const { onOk } = props;
    const [form] = Form.useForm<{ name: string; company: string }>();
    const onFinish = async (values: any) => {
        console.log(values);
        await addSecretkey(values);
        message.success('提交成功');
        onOk();
        return true;
    };
    return (
        <ModalForm<{
            name: string;
            company: string;
        }>
            title='添加密钥'
            trigger={
                <Button type='primary'>
                    <PlusOutlined />
                    添加密钥
                </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true
            }}
            onFinish={onFinish}
            width={600}
        >
            <ProFormText rules={[{ required: true, message: '账号不能为空' }]} name='username' label='账号' />
            <ProFormText rules={[{ required: true, message: '密码不能为空' }]} name='password' label='密码' />
            <ProFormText rules={[{ required: true, message: '密钥不能为空' }]} name='apiKey' label='密钥' />
            <ProFormText name='balance' label='余额（美元）' initialValue={5} />
        </ModalForm>
    );
};
