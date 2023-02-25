import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducer'

const persistConfig = {
    key: 'root',
    storage
}

// const composeEnhancer = compose || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk))
)
export const persistor = persistStore(store)

export default store;