import {combineReducers} from 'redux';
import {Reducer} from './Reducer';

const RootReducer = combineReducers({reducer: Reducer});

export default RootReducer;
