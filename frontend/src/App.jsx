import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login.jsx';
import Blog from './components/BlogPosts.jsx';
import AddBlog from './components/AddBlog.jsx';
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <>
    { user === null ?
      (<Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser}/>):
      <div>
        <h2>Welcome {user.username}! your blogs:</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}/>
        )}
      </div>
    }
    <div><AddBlog /></div>
    </>
  )
}

export default App;
