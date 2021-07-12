import * as actionTypes from './action-type'

export const createAddUserAction = (user) => ({
    type: actionTypes.ADDUSER,
    payload: user
})

export const createDeleteUserAction = (id) => ({
    type: actionTypes.DELETEUSER,
    payload: id
})

export const createUpdateUserAction = (id, newUserData) => ({
    type: actionTypes.DELETEUSER,
    payload: {
        ...newUserData,
        id
    }
})