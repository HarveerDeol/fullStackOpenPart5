import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogServices.js';


const BlogContent = () => {
    const data = blogService.getAll()
    console.log('DATA',data)
    return(<></>)
}

export default BlogContent;