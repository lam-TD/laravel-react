import * as requestFromServer from "./authCrud";
import { authSlice, callTypes} from "./authRedux";

const {actions} = authSlice;

export const login = (username, password) => dispatch => {
  console.log(username, password)
  // dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .login(username, password)
    .then(response => {
      console.log(response.data.data)
      const { user, access_token } = response.data.data;
      dispatch(actions.login({ user, access_token }));
    })
    .catch(error => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
