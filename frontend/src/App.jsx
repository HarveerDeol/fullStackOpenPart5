import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login.jsx";
import Blog from "./components/BlogPosts.jsx";
import Users from "./components/Users.jsx";
import AddBlog from "./components/AddBlog.jsx";
import Logout from "./components/Logout.jsx";
import Togglable from "./components/Togglable.jsx";
import { initalizeBlog } from "./reducers/blogReducer";
import { pendingSession } from "./reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
      <Router>
        <div>
          <Link to="/">Login </Link>
          <Link to="/blogs">Blogs </Link>
          <Link to="/users">Users </Link>
        </div>

        <Routes>
          <Route
            path="/blogs"
            element={
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

                </div>
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={(window.localStorage.getItem("loggedblogappUser")) ? <><h2>Already Logged In!</h2> <Logout /></>:<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
