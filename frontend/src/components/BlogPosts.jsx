import axios from "axios";
import blogService from "../services/blogsService.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => {
    return state.blog;
  });
  return (
    <div>
      {blogs.map((blog) => (
        <p key={blog.id}>
          {blog.title} : {blog.author} : {blog.likes}{" "}
          <button
            onClick={() => {
              dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }));
            }}>
            Like
          </button>
        </p>
      ))}
    </div>
  );
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
