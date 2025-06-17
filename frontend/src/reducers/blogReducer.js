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
        }
    }
})

export const { addBlog, setBlogs} = blogSlice.actions

export const initalizeBlog = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedblogappUser");  
        const user = JSON.parse(loggedUserJSON);
        blogsService.setToken(user.token);
        const blogs = await blogsService.getAll();
        console.log(blogs)
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

export default blogSlice.reducer