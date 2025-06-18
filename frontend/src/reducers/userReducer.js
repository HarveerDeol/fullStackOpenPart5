import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUsers(state, actions) {
      return actions.payload;
    },
  },
});

export const { addUsers } = userSlice.actions;

export const createUsers = () => {
  return async (dispatch) => {
    const getUsers = await userService.getAll();
    dispatch(addUsers(getUsers));
  };
};

export default userSlice.reducer;
