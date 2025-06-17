import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogsService";
import loginService from "../services/loginService";

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    setUser(state, action){
        return action.payload
    },
    signoutUser( state, action ){
        state = {}
        return state

    }
  },
});

export const { setUser, signoutUser } = loginSlice.actions

export const signin = (userObject) => {
    return async (dispatch) => {
        const user = await loginService.login(userObject);
        window.localStorage.setItem("loggedblogappUser", JSON.stringify(user));
        const loggedUserJSON = window.localStorage.getItem("loggedblogappUser");
        const loggedInUser = JSON.parse(loggedUserJSON);
        blogsService.setToken(user.token);
        dispatch(setUser(loggedInUser));
    };
};

export const signout = () => {

}

export default loginSlice.reducer
