import { Spin } from 'antd';
import React from 'react';

export default () => {
    return (
        // @ts-ignore
        <Spin tip='加载中...'>
            <div style={{ height: 500 }} />
        </Spin>
    );
};
