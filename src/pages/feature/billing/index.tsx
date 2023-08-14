/** openai 余额查询 */
import { getBilling } from '@/services/openai';
import { useRequest } from 'ahooks';
import { Card, Col, Input, Row, Statistic } from 'antd';
import React from 'react';
import { useModel } from 'umi';

import styles from './index.less';

const { Search } = Input;

const Index = () => {
    const { mobile } = useModel('uaModel');

    const {
        
        data: res,
        loading,
        run: getBillingAsync
    } = useRequest((apiKey) => getBilling(apiKey), {
        manual: true
    });

    const data = res?.data || {};

    const onSearch = (value: string) => {
        if (!value.trim()) return;
        getBillingAsync(value);
    };

    const span = mobile ? 24 : 8;

    return (
        <div className={styles.page}>
            <h1 className={styles.page_title}>OpenAI 余额查询</h1>
            <Search
                className={styles.page_search}
                onSearch={onSearch}
                placeholder='请输入API密钥'
                enterButton='查询'
                size='large'
                loading={loading}
            />
            <Row gutter={[16, 16]}>
                <Col span={span}>
                    <Card>
                        <Statistic title='总额度（USD）' value={data.total_granted} loading={loading} />
                    </Card>
                </Col>
                <Col span={span}>
                    <Card>
                        <Statistic title='已使用额度（USD）' value={data.total_used} precision={2} loading={loading} />
                    </Card>
                </Col>
                <Col span={span}>
                    <Card>
                        <Statistic title='剩余可用额度（USD）' value={data.total_available} loading={loading} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Index;
