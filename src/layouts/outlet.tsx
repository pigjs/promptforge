import { Outlet, useLocation } from 'umi';
import Layout from './layout';

/** 不需要 layout 的路由 */
const excludeLayoutPathName = ['/'];

export default () => {
    const location = useLocation();
    const { pathname } = location;
    if (excludeLayoutPathName.includes(pathname)) {
        return <Outlet />;
    }
    return <Layout />;
};
