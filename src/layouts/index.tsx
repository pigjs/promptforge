import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Outlet } from 'umi';

import './default.less';
import './global.less';

export default () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Outlet />
        </ConfigProvider>
    );
};
