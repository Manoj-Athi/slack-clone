import { combineReducers } from "redux";

import UserReducer from "./UserReducer";
import WorkSpaceReducer from './WorkSpaceReducer';
import CurrentWorkSpaceReducer from './CurrentWorkSpaceReducer';

export default combineReducers({
    UserReducer, WorkSpaceReducer, CurrentWorkSpaceReducer
})