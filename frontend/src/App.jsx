import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login.jsx";
import Blog from "./components/BlogPosts.jsx";
import AddBlog from "./components/AddBlog.jsx";
import Logout from "./components/Logout.jsx";
import Togglable from "./components/Togglable.jsx";
import blogService from "./services/blogsService.js";
import loginService from "./services/loginService";
import { initalizeBlog } from "./reducers/blogReducer";
import { pendingSession } from "./reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedblogappUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(pendingSession(userData));
      dispatch(initalizeBlog(userData));
    }
  }, [window.localStorage.getItem("loggedblogappUser")]);

  return (
    <>
      <h1>Welcome!</h1>

      {!user.token && (
        <Togglable buttonLabel="Login">
          <Login />
        </Togglable>
      )}

      {user.token && (
        <>
          <div>
            <h2>
              Welcome {user.username}!<br></br>Your blogs:
            </h2>
            <Blog />
          </div>

          <div>
            <Togglable buttonLabel="Add Blog">
              <AddBlog />
            </Togglable>
            <hr></hr>
            <Logout />
          </div>
        </>
      )}
    </>
  );
}

export default App;
