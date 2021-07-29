import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './reducer'
import rootSaga from "./saga"

const sagaMid = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMid, logger))

sagaMid.run(rootSaga)

export default store