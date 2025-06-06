const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    }  
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(blogs[0])
    await blogObject.save()
    blogObject = new Blog(blogs[1])
    await blogObject.save()
  })

  test.only('all unique id properties are named id not _id', async () => {
    const response = await api.get('/api/blogs')

    for (const blog of response.body){
        blogObject = new Blog(blog)
        console.log(blogObject._id.toString())
        assert.deepEqual(('id' in blogObject), true)
        assert.deepEqual(!('_id' in blogObject), true)
    }
})

  test.only('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, blogs.length)
  })


after(async () => {
  await mongoose.connection.close()
})