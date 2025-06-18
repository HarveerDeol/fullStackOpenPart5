import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: loginReducer,
    users: userReducer
  },
});

export default store;
