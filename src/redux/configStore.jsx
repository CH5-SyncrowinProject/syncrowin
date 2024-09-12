import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with the root reducer, saga middleware, and Redux DevTools
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: false, // Disable thunk since you're using sagas
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export the configured store
export default store;
