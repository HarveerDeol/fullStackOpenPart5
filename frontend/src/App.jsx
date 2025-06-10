import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login.jsx';
import BlogContent from './components/BlogPosts.jsx';
import blogServices from './services/blogServices.js';
import loginService from './services/login';

function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  




  return (
    <>
    {user === null ?
    (<Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser}/>):
    <><h1>Blog</h1></>}
    <BlogContent/>
    </>
  )
}

export default App
