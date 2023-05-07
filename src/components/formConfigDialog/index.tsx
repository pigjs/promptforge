import { dialog } from '@/components/dialog';
import FieldRender from '@/components/fieldRender';
import { Form, Modal, Select } from 'antd';
import React from 'react';
import { basePropsConfig, propsConfigEnum, selectComp } from './data';

import type { DialogFC } from '@/components/dialog';
import type { FieldProps } from '@/components/field';

export interface FormConfigProps {
    onOk: (item: FieldProps, initialValue: string) => void | Promise<void>;
    dataSource: FieldProps;
    initialValue: string;
}

const Index: DialogFC<FormConfigProps> = (props) => {
    const { onClose, dataSource, initialValue } = props;

    const [form] = Form.useForm();

    const valueType = Form.useWatch('valueType', { form });

    // @ts-ignore
    const resetPropsConfig = propsConfigEnum[valueType] || [];

    const schema = [...basePropsConfig, ...resetPropsConfig];

    const selectChange = (value: string) => {
        form.resetFields();
        form.setFieldValue('valueType', value);
    };

    const initialValues = React.useMemo(() => {
        if (dataSource) {
            const { valueType, name, rules, label, fieldProps, ...resetData } = dataSource;
            const values: any = {
                name,
                initialValue,
                label,
                valueType,
                ...resetData,
                ...fieldProps
            };
            if (rules) {
                const [requiredRule] = rules;
                values.required = requiredRule?.message;
            }
            if (valueType === 'Select') {
                if (values.mode === 'multiple') {
                    values.mode = true;
                }
                const { options } = values;
                values.options = options.map((item: any) => item.label);
            }
            return values;
        }
        return {};
    }, []);

    const onOk = async () => {
        const values = await form.validateFields();
        const { name, label, valueType, required, initialValue, ...resetValues } = values;

        const rules = required ? [{ required: true, message: `${label}不能为空` }] : undefined;

        const item: FieldProps = {
            name,
            label,
            rules,
            valueType
        };
        let fieldProps: Record<string, any> = { ...resetValues };
        if (valueType === 'Select') {
            const { mode, options } = resetValues;
            const resetOptions = options.map((item: string) => {
                return { value: item, label: item };
            });
            fieldProps = {
                ...fieldProps,
                mode: mode === true ? 'multiple' : null,
                options: resetOptions
            };
        }
        item.fieldProps = fieldProps;
        await props.onOk(item, initialValue);
        onClose();
    };

    return (
        <Modal title='组件配置' destroyOnClose maskClosable={false} open onCancel={onClose} onOk={onOk}>
            <Form
                form={form}
                initialValues={initialValues}
                style={{ marginTop: 10 }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item label='选择组件' name='valueType' rules={[{ required: true, message: '请选择组件' }]}>
                    <Select
                        placeholder='请选择组件'
                        onChange={selectChange}
                        options={selectComp}
                        style={{ width: 200 }}
                    />
                </Form.Item>
                {valueType ? <FieldRender key={valueType} schema={schema} noForm defaultWidth={200} /> : null}
            </Form>
        </Modal>
    );
};

export default dialog(Index);
