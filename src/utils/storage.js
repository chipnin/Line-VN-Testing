export default class Storage {
    constructor(key) {
        this.key = key;
        this.store = [];

        this.load();
    }

    /**
     * Load data from Local Storage
     */
    load() {
        let dataString = window.localStorage.getItem(this.key);

        if (dataString) {
            this.store = JSON.parse(dataString);
        }
    }

    /**
     * Add input history into storage
     * @param {string} value - input history
     */
    add(value) {
        this.store.unshift(value);

        window.localStorage.setItem(this.key, JSON.stringify(this.store));
    }
}