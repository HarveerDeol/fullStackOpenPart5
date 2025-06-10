import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogs.js';
import loginService from '../services/login.js';

const AddBlog = () => {
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')

    const addUserBlog = () => {
        console.log('checkpint reached')
    }
    

    return(
        <form onsumbit={addUserBlog}>
            <fieldset><strong>Add Another Blog:</strong>
            <div>
                <label htmlFor='title'>Title: </label>
                <input type="text" id="title" name="title" value={title}
                        onChange={({target})=>setTitle(target.value)} required/>
            </div>
            <div>
                <label htmlFor='author'>Author: </label>
                <input type="author" id="author" name="author" value={author}
                        onChange={({target})=>setAuthor(target.value)} required/>
            </div>
            <div>
                <label htmlFor='title'>URL: </label>
                <input type="text" id="url" name="url" value={url}
                        onChange={({target})=>setUrl(target.value)} required/>
            </div>
            <br></br>
            <button type="submit">Add</button>
            </fieldset>
        </form>
    )
}

export default AddBlog;