import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login.jsx';
import Blog from './components/BlogPosts.jsx';
import blogService from './services/blogs.js';
import loginService from './services/login';

function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      )  
    }, [])


  return (
    <>
    {user === null ?
    (<Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser}/>):
    <><h1>Blog</h1></>}
    <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
    </>
  )
}

export default App
