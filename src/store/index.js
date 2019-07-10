
import { createStore, combineReducers ,applyMiddleware ,compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {settings,postsByGists, selectedgists ,errorGists ,setForks} from './reducers'

const rootReducer = combineReducers({
    settings,
    postsByGists,
    selectedgists,
    errorGists,
    setForks
})

const loggerMiddleware = createLogger()


export default function configureStore(preloadedState) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        preloadedState,
composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
)
}
