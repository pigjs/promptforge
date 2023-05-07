import { getForgeList } from '@/services/forge';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { useMount } from '@pigjs/utils';
import { Input } from 'antd';
import React from 'react';
import { history } from 'umi';
import LoginInterface from '../../components/loginInterface';
import FeatureList from './components/featureList';
import TimeIndicator from './components/timeIndicator';

import type { ForgeListResponse } from '@/services/types/forge';

import styles from './index.less';

const { Search } = Input;

const Index = () => {
    const [dataSource, setDataSource] = React.useState<ForgeListResponse[]>([]);

    const getData = async () => {
        /** 刚开始应用不会很多的，先直接请求1000条数据 */
        const res = await getForgeList({ pageNo: 1, pageSize: 1000 });
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
            <LoginInterface />
        </div>
    );
};

export default Index;
