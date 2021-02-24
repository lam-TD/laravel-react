import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
	user: undefined,
	authToken: undefined,
  listLoading: false,
  error: null
};

export const callTypes = {
  login: "login",
  list: "list",
  action: "action"
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      const { user, access_token } = action.payload;
      console.log(action.payload)
      state.listLoading = false;
      state.error = null;
      state.authToken = access_token;
      state.user = user;
    }
  }
})
