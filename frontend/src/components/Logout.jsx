import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogsService.js';
import loginService from '../services/loginService.js';

const Logout = () => {
    const handleClick = () =>[
        console.log('logout')
    ]
    return (
        <button onClick={handleClick}>Logout</button>
    )
}

export default Logout;