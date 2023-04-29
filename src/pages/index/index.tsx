import FeatureList from '@/components/featureList';
import TimeIndicator from '@/components/timeIndicator';
import { getForgeList } from '@/services/forge';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { useMount } from '@pigjs/utils';
import { Input } from 'antd';
import React from 'react';
import { history } from 'umi';

import styles from './index.less';

const { Search } = Input;

const Index = () => {
    const [dataSource, setDataSource] = React.useState();

    const getData = async () => {
        const res = await getForgeList();
        const data = res.data || [];
        setDataSource(data);
    };

    useMount(() => {
        getData();
    });

    const onSearch = (value: string) => {
        if (value?.trim()) {
            // @ts-ignore
            window.questionAnswer = value;
            history.push('/feature?feature=questionAnswer');
        }
    };

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
                <FeatureList dataSource={dataSource} />
            </div>
        </div>
    );
};

export default Index;
