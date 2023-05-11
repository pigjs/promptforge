export type _cbsOptions = Record<string, (() => void)[]>;

/**
 * 发布者订阅者模式 on emit off
 */
class EventHub {
    private _cbs: _cbsOptions = {};

    /**
     * on 方法把订阅者所想要订阅的事件及相应的回调函数记录在 Event 对象 _cbs 属性中
     */
    on(event: string, fn: () => void) {
        if (typeof fn !== 'function') {
            throw new Error('fn must be a function');
        }
        this._cbs = this._cbs || {};
        (this._cbs[event] = this._cbs[event] || []).push(fn);
    }

    /**
     * emit 方法接收一个事件名称参数，在 Event 对象的 _cbs 属性中取出对应的数组，并逐个执行里面的回调函数
     */
    emit(event: string) {
        this._cbs = this._cbs || {};
        let callbacks = this._cbs[event];
        if (callbacks) {
            callbacks = callbacks.slice(0);
            // eslint-disable-next-line prefer-rest-params
            const args: any = [].slice.call(arguments, 1);
            for (let i = 0, len = callbacks.length; i < len; i++) {
                callbacks[i].apply(null, args);
            }
        }
    }

    /**
     * off 方法接收事件名称和当初注册的回调函数作参数，在 Event 对象的 —_cbs 属性中删除对应的回调函数
     */
    off(event?: string, fn?: () => void) {
        this._cbs = this._cbs || {};

        // all
        if (!arguments.length) {
            this._cbs = {};
            return;
        }

        const callbacks = this._cbs[event!];

        // remove all handlers
        if (arguments.length === 1) {
            delete this._cbs[event!];
            return;
        }

        // remove specific handler
        let cb: any;
        for (let i = 0; i++; ) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return;
    }
}

export const eventHub = new EventHub();
