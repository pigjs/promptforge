import { useEvent, useMount } from '@pigjs/utils';
import { Modal } from 'antd';
import React from 'react';
import { history } from 'umi';

import type { ModalFuncProps } from 'antd';

export type PromptOptions = Omit<ModalFuncProps, 'onOk' | 'onCancel'> & {
    onOk?: (actionCallback: () => void, cancelUnblock: () => void) => Promise<void> | void;
    onCancel?: (actionCallback: () => void, cancelUnblock: () => void) => Promise<void> | void;
};

export function usePrompt(options: PromptOptions) {
    const unblockRef = React.useRef<any>(null);

    const { onOk: _onOk, onCancel: _onCancel, ...resetProps } = options;

    /** 取消路由拦截 */
    const cancelUnblock = useEvent(() => {
        if (unblockRef.current) {
            unblockRef.current();
            unblockRef.current = null;
        }
    });

    const actionCallback = (action: any, location: any) => {
        cancelUnblock();
        if (action === 'PUSH') {
            history.push(location);
        } else if (action === 'POP') {
            history.back();
        } else if (action === 'REPLACE') {
            history.replace(location);
        }
    };

    /** 创建路由拦截 */
    const createUnblock = useEvent(() => {
        if (unblockRef.current) {
            return;
        }
        unblockRef.current = history.block(({ location, action }) => {
            if (location.pathname !== history.location.pathname) {
                const handleActionCallback = () => {
                    actionCallback(action, location);
                };

                Modal.confirm({
                    title: '温馨提示',
                    ...resetProps,
                    onOk: async () => {
                        if (_onOk) {
                            await _onOk(handleActionCallback, cancelUnblock);
                        } else {
                            handleActionCallback();
                        }
                    },
                    onCancel: async () => {
                        if (_onCancel) {
                            await _onCancel(handleActionCallback, cancelUnblock);
                        }
                    }
                });
            }
            return false;
        });
    });

    useMount(() => {
        createUnblock();
    });

    return { cancelUnblock, createUnblock };
}
