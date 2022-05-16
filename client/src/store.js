import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducer'

const composeEnhancer = compose;
//window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || 
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;