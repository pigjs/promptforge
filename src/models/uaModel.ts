import { isMobile } from '@/utils/ua';
import { useEvent, useMount } from '@pigjs/utils';
import { enquireScreen } from 'enquire-js';
import React from 'react';

export default function () {
    const [state, setState] = React.useState(() => {
        const mobile = isMobile();
        return {
            mobile
        };
    });

    useMount(() => {
        enquireScreen((b: boolean) => {
            setState((state) => ({ ...state, mobile: b }));
        });
    });

    const setStateEvent = useEvent(setState);

    return {
        ...state,
        setState: setStateEvent
    };
}
