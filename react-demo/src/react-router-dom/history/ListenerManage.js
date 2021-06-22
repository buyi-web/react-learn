export default class ListenerManage {
    // 存放监听器的数组
    listeners = [];

    // 添加监听器
    addListener(listener) {
        this.listeners.push(listener);
        const unListen = () => {
            const index = this.listeners.indexOf(this.listener);
            this.listeners.splice(index, 1);
        }
        return unListen
    }

    // 触发所有监听器
    triggerListener(location, action) {
        for (const listener of this.listeners) {
            listener(location, action)
        }
    }
}