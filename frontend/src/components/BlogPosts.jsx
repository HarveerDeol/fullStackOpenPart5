import {useState, useEffect} from 'react';
import axios from 'axios';
import blogService from '../services/blogsService.js';


const Blog = ({blogs, setBlogs, user}) => {

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const getBlogs = await blogService.getAll()
            
            const userBlogs = getBlogs.filter(blog => blog.user.username === user.username)
            setBlogs(userBlogs)
          } catch (error) {
            console.error('error fetching blogs:', error)
          }
        }
      
        fetchBlogs()
      }, [user]) // also add user as a dependency if it's not constant
      

    const blogsOfUser = () =>{
        if (blogs.length){
        return blogs.map(blog => {
            return (<li key={blog.id}>{blog.title} : {blog.author}</li>)

        })}
    };
    
    return (
        <ul>
            {blogsOfUser()}
        </ul>
      )
    }

export default Blog;