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
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
      }

}

export const createBlog = (newObject) => {
    return async dispatch => {
        const newBlog = await blogsService.create(newObject)
        dispatch(addBlog(newBlog))
      }
}

export default blogSlice.reducer