import { omit, usePropsValue } from '@pigjs/utils';
import { Checkbox } from 'antd';
import React from 'react';

import type { CheckboxProps as ACheckboxProps } from 'antd';

export type CheckboxProps = ACheckboxProps & {
    value?: boolean;
    onChange?: (value: boolean) => void;
};

const Index = (props: CheckboxProps) => {
    const [value, setValue] = usePropsValue(props);

    const resetProps = omit(props, ['value', 'onChange']);

    return <Checkbox {...resetProps} checked={value} onChange={(e) => setValue(e.target.checked)} />;
};

export default React.memo(Index);
