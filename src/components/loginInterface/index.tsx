import { Button, Modal, Radio } from 'antd';
import React from 'react';
import EmailLogin from './emailLogin';
import styles from './index.less';
import UsernameLogin from './usernameLogin';
import UserRegister from './userRegister';

const Index = () => {
    const [open, setOpen] = React.useState('');
    const [state, setState] = React.useState('username'); // 当前页面状态：username登陆，email登陆,register用户名注册

    const showLoginModal = () => {
        setOpen('loginModal');
    };
    const handleCancel = () => {
        setOpen('');
    };
    return (
        <div className={styles.loginInterface}>
            <Button onClick={showLoginModal}>点击登陆</Button>
            <Modal
                open={open === 'loginModal'}
                onCancel={handleCancel}
                footer={null}
                width={350}
                bodyStyle={{ padding: ' 30px 15px 10px 15px' }}
            >
                {state === 'register' ? (
                    <div className={styles.loginInterface_register}>
                        <UserRegister />
                        <div className={styles.loginInterface_register_footer} onClick={() => setState('username')}>
                            <div className={styles.loginInterface_register_footer_container}> 已有账号，立即登陆</div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.loginInterface_login}>
                        <Radio.Group
                            defaultValue='username'
                            onChange={(e) => setState(e.target.value)}
                            className={styles.loginInterface_header}
                        >
                            <Radio.Button value='username' className={styles.loginInterface_header_username}>
                                用户名登陆
                            </Radio.Button>
                            <Radio.Button value='email' className={styles.loginInterface_header_email}>
                                邮箱登陆
                            </Radio.Button>
                        </Radio.Group>
                        {state === 'username' ? <UsernameLogin /> : null}
                        {state === 'email' ? <EmailLogin /> : null}
                        <div className={styles.loginInterface_login_footer} onClick={() => setState('register')}>
                            <div className={styles.loginInterface_login_footer_container}>没有账号？点击注册</div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default React.memo(Index);
