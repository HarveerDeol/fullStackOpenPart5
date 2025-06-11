import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogsService.js';
import loginService from '../services/loginService.js';

const Logout = ({setUser, setBlogs}) => {
    
    const handleClick = async () =>{
        try{
        await window.localStorage.removeItem('loggedblogappUser')
        setUser(null)
        setBlogs([])
        console.log('loggedout')
        } catch (error){
            console.error("trouble logging out", error)
        }
    }

    return (
        <button onClick={handleClick}>Logout</button>
    )
}

export default Logout;