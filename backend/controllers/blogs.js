const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const User = require("../models/user");
const usersRouter = require("./users");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response, next) => {
  //changed from /api/blogs to / as we are already mounting the router
  try {
    const blogs = await Blog.find({}).populate("user", { username: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.post("/", async (request, response, next) => {
  body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    logger.error("userId missing or not valid");
    return response.status(400);
  }
  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(request.params.id);

    // Remove blog reference from user's blogs array
    user.blogs = user.blogs.filter((b) => b.toString() !== blog._id.toString());
    await user.save();

    response.status(204).end();
  } catch (error) {
    console.log("No delete occurred");
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  try {
    const blog = await Blog.findById(request.params.id);

    blog.title = title;
    blog.author = author;
    blog.url = url;
    blog.likes = likes;

    await blog.save();
    response.json(blog);
  } catch (error) {
    next(error);
    console.log("No change occured");
  }
});

module.exports = blogRouter; //forgot a s on the export
