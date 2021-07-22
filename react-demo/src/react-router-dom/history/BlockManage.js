
export default class BlockManage{

    prompt = null; //该属性是否有值，决定了是否有阻塞

    constructor(getUserConfirmation) {
        this.getUserConfirmation = getUserConfirmation
    }
    /**
     * 设置阻塞，传递消息提示
     * @param {*} prompt 可以是字符串，函数（返回字符串）
     */
    block(prompt) {
        if(typeof prompt !== 'string' && typeof prompt !== 'function') {
            throw new TypeError("block must be string or function")
        }
        this.prompt = prompt
        return () => this.prompt = null
    }
    /**
     * 触发阻塞
     * @param {*} location 
     * @param {*} action 
     * @param {*} callback 
     */
    triggerBlock(location, action, callback) {
        if(!this.prompt) {
            callback();
            return ;
        }
        let message;
        if(typeof this.prompt === 'string') message = this.prompt
        else if(typeof this.prompt === 'function') message = this.prompt(location, action)
        this.getUserConfirmation(message, result => {
            if(result) {
                callback()
            }
        })
    }

}