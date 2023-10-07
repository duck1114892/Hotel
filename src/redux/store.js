import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import rootReducer from './filter/filter';
import loginReducer from './login/asscess';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rootReducer: rootReducer,
    loginReducer: loginReducer
  },
});
