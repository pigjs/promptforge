import FieldRender from '@/components/fieldRender';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import { Divider, Drawer, FloatButton } from 'antd';
import React from 'react';
import { useModel } from 'umi';

import styles from './index.less';

import type { FormInstance } from 'antd';

const Index = (props, ref) => {
    const fieldRenderRef = React.useRef<FormInstance>(null);

    React.useImperativeHandle(ref, () => ({ ...fieldRenderRef.current }));

    const { ref1, ref2, schema, initialValues, promptInfo } = props;
    const [open, setOpen] = React.useState(false);

    const { mobile } = useModel('uaModel');

    const onClose = () => {
        setOpen(false);
    };
    const layout = (child) => {
        if (mobile) {
            return (
                <div className={styles.sidebar_warp}>
                    <Drawer title={promptInfo.name} placement='left' closable={false} onClose={onClose} open={open}>
                        {child}
                    </Drawer>
                    <FloatButton ref={ref1} icon={<SettingOutlined />} shape='circle' onClick={() => setOpen(true)} />
                </div>
            );
        }
        return child;
    };

    return layout(
        <div className={`${styles.sidebar} ${mobile ? styles.mobile : ''}`}>
            {!mobile ? <div className={styles.sidebar_title}>{promptInfo.name}</div> : null}
            <div ref={!mobile ? ref1 : null} className={styles.sidebar_description}>
                {promptInfo.description}
            </div>
            <Divider />
            <div ref={!mobile ? ref2 : null}>
                {schema ? (
                    <FieldRender
                        ref={fieldRenderRef}
                        layout='vertical'
                        schema={schema}
                        initialValues={initialValues}
                        wrapperCol={{ span: 24 }}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default React.forwardRef(Index);
