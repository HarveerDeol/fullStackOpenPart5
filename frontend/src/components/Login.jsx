import { useDispatch } from "react-redux";
import { signin } from "../reducers/loginReducer.js";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value,
      };
      dispatch(signin(credentials));
    } catch (exception) {
      alert("Wrong credentials", exception);
      console.error(exception);
    }
  };

  return (
    <form id="login" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div id="username">
        <label htmlFor="username">Username </label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password </label>
        <input type="password" id="password" name="Password" required />
      </div>
      <br></br>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
