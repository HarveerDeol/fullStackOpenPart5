import { useDispatch } from "react-redux";
import { signout } from "../reducers/loginReducer.js";

const Logout = ({ setUser, setBlogs }) => {
  const dispatch = useDispatch();

  const handleClick =  () => {
    dispatch(signout())
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default Logout;
