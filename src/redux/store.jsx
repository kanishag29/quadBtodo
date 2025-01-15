// Setup the Redux store with thunk middleware
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { taskReducer } from './taskReducer';
import { authReducer } from './authReducer';

// Combine all reducers
const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

// Create store with thunk
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;