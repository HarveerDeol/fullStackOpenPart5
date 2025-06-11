import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogsService.js';
import loginService from '../services/loginService.js';

const Login = ({username, password, setUsername, setPassword, user, setUser}) => {
    
    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await loginService.login({
            username, password,
            })
            window.localStorage.setItem(
                'loggedblogappUser', JSON.stringify(user)
              ) 
            
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            alert('Wrong credentials')
      }
    }

    return (
        <form id='login' onSubmit={handleLogin}>
            <h1>Login</h1>
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
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login;