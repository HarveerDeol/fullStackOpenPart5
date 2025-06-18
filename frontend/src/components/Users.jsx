import { useEffect } from 'react';
import userService from '../services/userService';
import { createUsers } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state =>{
        return state.users
    })
    useEffect(()=>{
            dispatch(createUsers())
    },[])
   
  return (
<div>
  <h2>Users</h2>
  <table>
    <thead>
      <tr>
        <th>Username</th>
        <th>Blogs Created</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.username}</td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};


export default Users;