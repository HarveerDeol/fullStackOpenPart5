import { useState, useEffect } from "react";
import axios from "axios";
import blogService from "../services/blogsService.js";

const Blog = ({ blogs, setBlogs, user }) => {
  const blogsOfUser = () => {
    if (blogs.length) {
      return blogs.map((blog) => {
        return (
          <li key={blog.id}>
            {blog.title} : {blog.author}
          </li>
        );
      });
    }
  };

  return <ul>{blogsOfUser()}</ul>;
};

export default Blog;
