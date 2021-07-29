import { all } from "redux-saga/effects"
import counterTask from "./counterTask"


export default function* () {
    yield all([counterTask()])
    console.log("saga 完成")
}
