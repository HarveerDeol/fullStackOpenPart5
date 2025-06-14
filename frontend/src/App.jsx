import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login.jsx';
import Blog from './components/BlogPosts.jsx';
import AddBlog from './components/AddBlog.jsx';
import Logout from './components/Logout.jsx';
import Togglable from './components/Togglable.jsx';
import blogService from './services/blogsService.js';
import loginService from './services/loginService';

function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  
  

  useEffect(() => {
    const init = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedblogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
  
        try {
          const getBlogs = await blogService.getAll()
          const userBlogs = getBlogs.filter(blog => blog.user.username === user.username)
          console.log(userBlogs)
          setBlogs(userBlogs)
        } catch (error) {
          console.error('error fetching blogs:', error)
        }
      }
    }
  
    init()
  }, [])
  
  return (
    <>
    <h1>Welcome!</h1>
    
      { user === null && (
        <Togglable  buttonLabel="Login">
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          user={user}
          setUser={setUser}
          setBlogs={setBlogs}
        />
      </Togglable>
      )}
    
      { user !== null && (
        <>
        <div>
          <h2>Welcome {user.username}! Your blogs:</h2>
              <Blog blogs={blogs} setBlogs = {setBlogs} user={user} />
        </div>
      
      <div> 
        <Togglable  buttonLabel="Add Blog">
          <AddBlog blogs= {blogs} setBlogs = {setBlogs}/> 
        </Togglable>
        <hr></hr>
          <Logout setUser = {setUser} setBlogs={setBlogs}/>
      </div>
      </>
      )}
    </>
  )
  
}

export default App;
