import * as actionTypes from '../action/action-type'

const initialState = null

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SETLOGINUSERTYPE:
            return payload
        default:
            return state
    }
}
