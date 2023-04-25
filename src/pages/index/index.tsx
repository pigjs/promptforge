import FeatureList from '@/components/featureList';
import TimeIndicator from '@/components/timeIndicator';
import { getFeatureCategory } from '@/utils/getFeature';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { getUrlParam, useUpdate } from '@pigjs/utils';
import { Input } from 'antd';
import React from 'react';
import { history, useLocation } from 'umi';

import styles from './index.less';

const { Search } = Input;

const Index = () => {
    const onSearch = (value: string) => {
        if (value?.trim()) {
            // @ts-ignore
            window.questionAnswer = value;
            history.push('/feature?feature=questionAnswer');
        }
    };

    const location = useLocation();
    const update = useUpdate();

    const role = getUrlParam('role') || 'home';

    React.useEffect(() => {
        update();
    }, [location.search]);

    const featureList = React.useMemo(() => {
        // @ts-ignore
        return getFeatureCategory(role);
    }, [role]);

    if (!role) {
        return null;
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <TimeIndicator />
            </div>
            <div className={styles.search}>
                <Search
                    style={{ height: 50 }}
                    prefix={<SearchOutlined />}
                    onSearch={onSearch}
                    allowClear
                    placeholder='输入并搜索'
                    enterButton='搜索'
                    size='large'
                />
            </div>
            <div className={styles.featureList}>
                <FeatureList key={role} dataSource={featureList} />
            </div>
        </div>
    );
};

export default Index;
