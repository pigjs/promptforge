import { usePropsValue } from '@pigjs/utils';
import React from 'react';
import { SketchPicker } from 'react-color';

import styles from './index.less';

import type { ColorResult } from 'react-color';

export interface ColorProps {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

const Index = (props: ColorProps) => {
    const { disabled } = props;

    const [value, setValue] = usePropsValue<string>(props);
    const [open, setOpen] = React.useState(false);

    const handleChangeComplete = (color: ColorResult) => {
        setValue(color.hex);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const style = disabled ? { pointerEvents: 'none', opacity: 0.5 } : {};

    return (
        <>
            {/* @ts-ignore */}
            <div className={styles.color} style={{ '--color': value, ...style }} onClick={() => setOpen(true)} />

            {open ? (
                <div style={{ position: 'absolute', zIndex: '2' }}>
                    <div
                        style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px'
                        }}
                        onClick={handleClose}
                    />
                    <SketchPicker
                        className={styles.color_picker}
                        color={value}
                        onChangeComplete={handleChangeComplete}
                    />
                </div>
            ) : null}
        </>
    );
};

export default React.memo(Index);
