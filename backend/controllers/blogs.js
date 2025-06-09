const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {//changed from /api/blogs to / as we are already mounting the router
try {
    const blogs = await Blog.find({});
    response.json(blogs);
   } catch (error){
    next(error);
  }
})
  
  blogRouter.post('/', async (request, response, next) => {
    body = request.body
    try {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      })
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)

    } catch(error){
      next(error)
    }
  })

  
  blogRouter.delete('/:id', async (request, response, next) => {
    try{
      await Blog.deleteOne({_id: request.params.id});//used id instead of id
      response.status(204).end()
    } catch (error) {
      next(error);
      console.log('No delete occured');
    }
  })

  blogRouter.put('/:id', async (request, response, next) => {
    const { title, author, url, likes } = request.body
    try {

      const blog = await Blog.findById(request.params.id)

      blog.title = title
      blog.author = author
      blog.url = url
      blog.likes = likes

      await blog.save()
      response.json(blog)

    } catch (error){
      next(error);
      console.log('No change occured');
    }
  })


module.exports = blogRouter //forgot a s on the export