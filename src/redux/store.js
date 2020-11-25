import {createStore} from 'redux';
import inputReducer from './input/inputReducer';


const store = createStore(inputReducer);
export default store;