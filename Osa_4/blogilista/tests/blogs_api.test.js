const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blogs")
const helper = require('./blogs.helper')
const blogsinDb = require('./blogs.helper')
const middleware = require("../utils/middleware")

const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(1)
  })

  test('unique identifier should be id not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

    
    test('a valid blog can be added ', async () => {
      const newBlog = {
        id: '5a422aa71b54a676234d17f4',
        title: 'Go To ful',
        author: 'Edsgerkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      
      const contents = response.body.map(r => r.content)
      console.log(response.body)
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('if likes missing, set to 0', async () => {
      const newBlog = {
        title: 'Go To fulfkdjsl',
        author: 'Edsgerkstra dsadsa',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      console.log(response.body)
      expect(response.body[response.body.length - 1].likes).toBe(0);
    })

    test("response status 400 if title / url are missing", async () => {
      const mockBlog = {
        id: "5a422b3a1b54a676234d17f9",
        author: "Henna Schalin",
        url: "www.blog.blog",
        likes: 1,
      }
  
      await api
        .post("/api/blogs")
        .send(mockBlog)
        .expect(400);
    })

    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
    })

    test('a blog can be altered', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToAlter = blogsAtStart[0]

      const blog = {
        id: blogToAlter.id,
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 0
      }

      console.log('blog title', blog.title)
      const result = blog.title
    
      await api
        .put(`/api/blogs/${blogToAlter.id}`)
        .send(blog)
        .expect(200)

        const response = await api
        .get(`/api/blogs/${blogToAlter.id}`)

        expect(response.body.title).toBe('test')
      })


  //users

      describe('when there is initially one user at db', () => {
        beforeEach(async () => {
          await User.deleteMany({})
      
          const passwordHash = await bcrypt.hash('sekret', 10)
          const user = new User({ username: 'root', passwordHash })
      
          await user.save()
        })
      
        test('creation succeeds with a fresh username', async () => {
          const usersAtStart = await helper.usersInDb()
      
          const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
          }
      
          await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      
          const usernames = usersAtEnd.map(u => u.username)
          expect(usernames).toContain(newUser.username)
        })
      })
  
  afterAll(() => { 
    mongoose.connection.close()
  })