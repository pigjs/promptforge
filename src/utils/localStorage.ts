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
            console.error(`LocalStorage.get：${key},error：`, err);
        }
        return null;
    }
    static del(key: LocalStorageKey) {
        window.localStorage.removeItem(key);
    }
}

export enum LocalStorageKey {
    selectedTags = 'selectedTags',
    userInfo = 'userInfo',
    token = 'token',
    readTour = 'readTour',
    featureTour = 'featureTour',
    completionTour = 'completionTour',
    activeCompletions = 'activeCompletions'
}
