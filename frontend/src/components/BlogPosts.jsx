import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogs.js';



const Blog = ({blog, user}) => {
    
    const blogsOfUser = (user) =>{
        if (blog.user.username.toString() === user.username.toString()){
            return (<li>{blog.title} : {blog.author}</li>)
        }
    }
    return (
        <ul>
            {blogsOfUser(user)}
        </ul>
      )
    }

export default Blog;