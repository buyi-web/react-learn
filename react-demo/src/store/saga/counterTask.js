import { takeEvery, delay, put } from "redux-saga/effects"
import * as actionTypes from "../action/action-type"
import { getIncreaseAction, getDecreaseAction} from '../action/number-action'

function* asyncIncrease() {
    yield delay(2000);
    yield put(getIncreaseAction())
}

function* asyncDecrease() {
    yield delay(2000);
    yield put(getDecreaseAction())
}

export default function* () {
    yield takeEvery(actionTypes.INCREASE, asyncIncrease)
    yield takeEvery(actionTypes.DECREASE, asyncDecrease)
    console.log("正在监听asyncIncrease、asyncDecrease")
}