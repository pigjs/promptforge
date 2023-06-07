import { isNil } from '@pigjs/utils';

export class LocalStorage {
    static set(key: LocalStorageKey, value?: any) {
        if (!isNil(value)) {
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            this.del(key);
        }
    }
    static get(key: LocalStorageKey) {
        const value = window.localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        try {
            return JSON.parse(value);
        } catch (err) {
            //
            console.log(err, 'err');
        }
        return value;
    }
    static del(key: LocalStorageKey) {
        window.localStorage.removeItem(key);
    }
}

export enum LocalStorageKey {
    selectedTags = 'selectedTags'
}
