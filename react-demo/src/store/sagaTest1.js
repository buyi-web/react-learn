import store from "./sagaIndex"
import { getIncreaseAction, getDecreaseAction} from "./action/number-action"


window.increase = function () {
    store.dispatch(getIncreaseAction());
}

window.decrease = function () {
    store.dispatch(getDecreaseAction());
}

