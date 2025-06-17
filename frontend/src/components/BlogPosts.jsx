import axios from "axios";
import blogService from "../services/blogsService.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Blog = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state =>{
      return state.blog
    })
  return (
    <div>
    {blogs.map(blog =>
        <li key={blog.id}>
          {blog.title}
        </li>
      )}
      </div>
  )
};

export default Blog;




// import axios from "axios";
// import blogService from "../services/blogsService.js";
// import { useDispatch, useSelector } from 'react-redux'
// import 

// const Blog = ({ blogs, setBlogs, user }) => {
//   const blogsOfUser = () => {
//     if (blogs.length) {
//       return blogs.map((blog) => {
//         return (
//           <li key={blog.id}>
//             {blog.title} : {blog.author}
//           </li>
//         );
//       });
//     }
//   };

//   return <ul>{blogsOfUser()}</ul>;
// };

// export default Blog;