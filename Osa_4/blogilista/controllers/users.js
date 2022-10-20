const config = require("../utils/config");
const express = require('express')
const User = require('../models/user')
const middleware = require("../utils/middleware");
const mongoose = require('mongoose');
const e = require("express");
const bcrypt = require('bcrypt')


const usersRouter= express.Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  } 

  if (username.length < 4) {
    return response.status(400).json({
      error: 'username too short or missing'
    })
  }

  if (password.length < 4) {
    return response.status(400).json({
      error: 'password too short or missing'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter