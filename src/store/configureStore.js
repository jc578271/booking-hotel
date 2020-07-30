import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import bookingsReducer from '../reducers/bookings'
import roomReducer from '../reducers/rooms'
import serviceReducer from '../reducers/services'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            bookings: bookingsReducer,
            rooms: roomReducer,
            services: serviceReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}