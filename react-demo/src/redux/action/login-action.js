import * as actionTypes from './action-type'
/**
 * 设置登录用户的action
 * @param {*} user 
 */
export function createSetLoginUserAction(user) {
    return {
        type: actionTypes.SETLOGINUSERTYPE,
        payload: user
    }
}