import { combineReducers } from "redux";
import { authSlice } from '../app/modules/Auth/_redux/authRedux'

export const rootReducer = combineReducers({
  auth: authSlice.reducer
});
