import { Form } from 'antd';
import React from 'react';
import Field from '../field';

import type { FieldProps } from '@/components/field';
import type { FormInstance, FormProps } from 'antd';

export interface FieldRenderProps extends FormProps {
    schema: FieldProps[];
    noForm?: boolean;
    defaultWidth?: number;
}

const Index: React.ForwardRefRenderFunction<FormInstance, FieldRenderProps> = (props, ref) => {
    const { schema = [], initialValues, noForm, defaultWidth = 160, ...resetProps } = props;

    const [form] = Form.useForm();

    React.useImperativeHandle(ref, () => form);

    if (noForm) {
        return (
            <>
                {schema.map((item) => (
                    <Field key={item.name} width={defaultWidth} {...item} />
                ))}
            </>
        );
    }

    return (
        <Form form={form} initialValues={initialValues} {...resetProps}>
            {schema.map((item) => (
                <Field key={item.name} {...item} />
            ))}
        </Form>
    );
};

export default React.forwardRef(Index);
