import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogsService.js';
import loginService from '../services/loginService.js';


const Login = ({username, password, setUsername, setPassword, user, setUser, setBlogs}) => {
    const [loginVisible, setLoginVisible] = useState(false);
    const setDatabase = async (user) =>{
        try {
            const getBlogs = await blogService.getAll()
            console.log('getBlogs:',getBlogs)
            const userBlogs = getBlogs.filter(blog => blog.user.username === user.username)

            setBlogs(userBlogs)
          } catch (error) {
            console.error('error fetching blogs:', error)
          }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await loginService.login({
            username, password,
            })
            window.localStorage.setItem(
                'loggedblogappUser', JSON.stringify(user)
              ) 
            
            blogService.setToken(user.token);
            setUser(user);
            setDatabase(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            alert('Wrong credentials',exception)
            console.error(exception)
      }
    }
    const showWhenVisible = { display: loginVisible ? 'none' : '' }
    const hideWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
        <div>
        <form id='login' onSubmit={handleLogin} style={hideWhenVisible}>
            <h2>Login</h2>
            <div id="username">
                <label htmlFor="username">Username </label>
                    <input  type="text" id="username" name ="Username" value={username} 
                    onChange={({target})=>setUsername(target.value)} required/>
            </div>
            <div>
            <label htmlFor="password">Password  </label>
                    <input type="password" id="password" name="Password" value={password}
                     onChange={({target})=>setPassword(target.value)} required/>
            </div>
            <br></br>
            <button class="child" type='submit'>Login</button>

        </form>
            <button onClick={() => setLoginVisible(true)} style={showWhenVisible}>Login</button>
            <button  onClick={() => setLoginVisible(false)} style={hideWhenVisible}>Cancel</button>  
        </div>
    )
}

export default Login;