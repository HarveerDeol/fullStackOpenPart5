import {useState} from 'react';
import axios from 'axios';




const Blog = ({blogs, user}) => {
    const blogsOfUser = () =>{
        console.log('BLOGS:',blogs)
        console.log('USER:',user)
        if (blogs.user){
        return blogs.map(blog => {
            if (blog.user.toString() === user._id.toString()){
                (<li key={blog.id}>{blog.title} : {blog.author}</li>)
            }
        })}
    };
    
    return (
        <ul>
            {blogsOfUser()}
        </ul>
      )
    }

export default Blog;