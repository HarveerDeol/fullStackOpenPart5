import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer.js";
import blogService from "../services/blogsService.js";
import loginService from "../services/loginService.js";

const AddBlog = () => {
  const dispatch = useDispatch()

  const addNewBlog = async (event) => {
        event.preventDefault()
        const content = {
          title:event.target.title.value,
          author:event.target.author.value,
          url:event.target.url.value
        }
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
        

        dispatch(createBlog(content))
    };

  return (
    <form onSubmit={addNewBlog}>
      <fieldset>
        <strong>Add Another Blog:</strong>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="author"
            id="author"
            name="author"
            required
          />
        </div>
        <div>
          <label htmlFor="title">URL: </label>
          <input
            type="text"
            id="url"
            name="url"
            required
          />
        </div>
        <br></br>
        <button type="submit">Add</button>
      </fieldset>
    </form>
  );
};

export default AddBlog;


// import { useState } from "react";
// import axios from "axios";
// import blogService from "../services/blogsService.js";
// import loginService from "../services/loginService.js";

// const AddBlog = ({ blogs, setBlogs }) => {
//   const [newUrl, setNewUrl] = useState("");
//   const [newAuthor, setNewAuthor] = useState("");
//   const [newTitle, setNewTitle] = useState("");

//   const addNewBlog = async (event) => {
//     event.preventDefault();
//     const blogObject = {
//       url: newUrl,
//       author: newAuthor,
//       title: newTitle,
//       likes: 0,
//     };
//     const newBlog = await blogService.create(blogObject);
//     setBlogs(blogs.concat(newBlog));
//     setNewUrl("");
//     setNewAuthor("");
//     setNewTitle("");
//   };

//   return (
//     <form onSubmit={addNewBlog}>
//       <fieldset>
//         <strong>Add Another Blog:</strong>
//         <div>
//           <label htmlFor="title">Title: </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={newTitle}
//             onChange={({ target }) => setNewTitle(target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="author">Author: </label>
//           <input
//             type="author"
//             id="author"
//             name="author"
//             value={newAuthor}
//             onChange={({ target }) => setNewAuthor(target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="title">URL: </label>
//           <input
//             type="text"
//             id="url"
//             name="url"
//             value={newUrl}
//             onChange={({ target }) => setNewUrl(target.value)}
//             required
//           />
//         </div>
//         <br></br>
//         <button type="submit">Add</button>
//       </fieldset>
//     </form>
//   );
// };

// export default AddBlog;

