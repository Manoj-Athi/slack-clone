import { combineReducers } from "redux";

import UserReducer from "./UserReducer";
import WorkSpaceReducer from './WorkSpaceReducer';
import CurrentWorkSpaceReducer from './CurrentWorkSpaceReducer';
import MessagesReducer from './MessagesReducer'
import NotificationReducer from './NotificationReducer'

export default combineReducers({
    UserReducer, WorkSpaceReducer, CurrentWorkSpaceReducer, MessagesReducer, NotificationReducer
})