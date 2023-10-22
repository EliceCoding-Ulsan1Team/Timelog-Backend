//user = 유저 인증기능
//ex) profile = 내정보기능(231020)

import { combineReducers } from "redux";
import user from "./user_reducer";
// import user from "./comment_reducer";

const rootReducer = combineReducers({
    user,
    // profile,
  });
  
  export default rootReducer;