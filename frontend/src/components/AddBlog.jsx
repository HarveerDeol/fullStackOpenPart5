import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogs.js';
import loginService from '../services/login.js';

const AddBlog = () => {
    const [newUrl, setNewUrl] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const blogObject={
        url:newUrl,
        author:newAuthor,
        title:newTitle,
        likes:0
    } 

    return(
        <form onSumbit={blogService.create(blogObject)}>
            <fieldset><strong>Add Another Blog:</strong>
            <div>
                <label htmlFor='title'>Title: </label>
                <input type="text" id="title" name="title" value={newTitle}
                        onChange={({target})=>setNewTitle(target.value)} required/>
            </div>
            <div>
                <label htmlFor='author'>Author: </label>
                <input type="author" id="author" name="author" value={newAuthor}
                        onChange={({target})=>setNewAuthor(target.value)} required/>
            </div>
            <div>
                <label htmlFor='title'>URL: </label>
                <input type="text" id="url" name="url" value={newUrl}
                        onChange={({target})=>setNewUrl(target.value)} required/>
            </div>
            <br></br>
            <button type="submit">Add</button>
            </fieldset>
        </form>
    )
}

export default AddBlog;