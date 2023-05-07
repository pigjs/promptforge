import { Spin } from 'antd';
import React from 'react';

export default () => {
    return (
        // @ts-ignore
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <Spin style={{ color: '#fff' }} tip='加载中...' />
        </div>
    );
};
