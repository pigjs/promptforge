import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layout from './layout';

import './default.less';
import './global.less';

export default () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Layout />
        </ConfigProvider>
    );
};
