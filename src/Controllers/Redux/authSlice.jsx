import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //stores first name, last name, email, password, account type, jwt, if authenticated
  userInfo: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: '',
    userToken: null, // stores JWT
    isAuthenticated: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signin: (state, action) => {
      let newUser = action.payload.user;
      newUser['isAuthenticated'] = true;
      state.userInfo = { ...newUser };
    },
    signout: (state, action) => {
      state.isAuthenticated = false;
      state.userInfo = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accountType: '',
        userToken: null,
        isAuthenticated: false,
      };
    },
  },
});

//dispatch
export const { signin, signout } = authSlice.actions;

//store
export default authSlice.reducer;
