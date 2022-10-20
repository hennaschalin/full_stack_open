const config = require("../utils/config");
const express = require('express')
const Blog = require("../models/blogs");
const middleware = require("../utils/middleware");
const mongoose = require('mongoose');
const e = require("express");
const User = require('../models/user');
const { useMediaQuery } = require("@material-ui/core");
const jwt = require('jsonwebtoken')


const blogRouter = express.Router()

/* const Blog = mongoose.model('Blog', blogSchema) */

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name:1})
    response.json(blogs)
  })

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
    })
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
      user: user._id
    })
    if(!request.body.title || !request.body.url) {
      response.status(400).send('Bad Request')
    } else {
      const newBlog = await blog.save()
      user.blogs = user.blogs.concat(newBlog._id)
      await user.save()

      response.status(201).json(newBlog)
  }})

  blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
      id: body.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
  })


  module.exports = blogRouter