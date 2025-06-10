import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogs.js';



const Blog = ({blog, user}) => {
    
    const blogsOfUser = (user) =>{
        console.log('USER',blog)
        if (blog.user.username.toString() === user.username.toString()){
            return (<p>{blog.title} {blog.author}</p>)
        }
    }
    return (
        <div>
            {blogsOfUser(user)}
        </div>
      )
    }

export default Blog;