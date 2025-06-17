import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";
import loginService from "../services/loginService";

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    signoutUser(state, action) {
      return (state = {});
    },
  },
});

export const { setUser, signoutUser } = loginSlice.actions;

export const pendingSession = (userObject) => {
  return async (dispatch) => {
    blogsService.setToken(userObject.token);
    dispatch(setUser(userObject));
  };
};

export const signin = (userObject) => {
  return async (dispatch) => {
    const user = await loginService.login(userObject);
    blogsService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const signout = () => {
  return async (dispatch) => {
    await window.localStorage.removeItem("loggedblogappUser");
    dispatch(signoutUser());
  };
};

export default loginSlice.reducer;
