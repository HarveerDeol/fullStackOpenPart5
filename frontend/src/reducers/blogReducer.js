import {createSlice} from '@reduxjs/toolkit'
import blogsService from '../services/blogsService'

const blogSlice = createSlice({
    name:'blogs',
    initialState: [],
    reducers:{
        addBlog (state, action){
            state.push(action.payload)
        },
        setBlogs (state,action){
            return action.payload
        },
        addToLikes ( state, action ) {
            const id = action.payload
            const likeToChange = state.find(v => v.id === id)
            const changedLike = { 
            ...likeToChange, 
            likes: likeToChange.likes + 1 
            }
            return state.map(blog =>
                blog.id !== id ? blog : changedLike 
            )
          }
    }
})

export const { addBlog, setBlogs, addToLikes} = blogSlice.actions

export const initalizeBlog = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedblogappUser");  
        const user = JSON.parse(loggedUserJSON);
        blogsService.setToken(user.token);
        const blogs = await blogsService.getAll();
          const userBlogs = blogs.filter(
            (blog) => blog.user.username === user.username,
          );
        dispatch(setBlogs(userBlogs))
      }

}

export const createBlog = (newObject) => {
    return async dispatch => {
        const newBlog = await blogsService.create(newObject)
        dispatch(addBlog(newBlog))
      }
}


export const likeBlog = object => {
    return async dispatch => {
      const likesBlog = await blogsService.update(object.id, object)
      dispatch(addToLikes(object.id))
    }
  }

export default blogSlice.reducer