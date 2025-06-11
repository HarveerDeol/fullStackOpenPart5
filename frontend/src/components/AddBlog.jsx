import {useState} from 'react';
import axios from 'axios';
import blogService from '../services/blogsService.js';
import loginService from '../services/loginService.js';

const AddBlog = () => {
    const [newUrl, setNewUrl] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const newBlog = (event) => {
        event.preventDefault()
        const blogObject={
            url:newUrl,
            author:newAuthor,
            title:newTitle,
            likes:0
        };
        blogService.create(blogObject)
    } 

    return(
        <form onSubmit={newBlog}>
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
            </fieldset>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddBlog;