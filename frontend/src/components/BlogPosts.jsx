import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogs.js';


const Blog = ({blog}) => {
    return (
        <div>
        <p>{blog.title} {blog.author}</p>
        </div>
      )
    }

export default Blog;