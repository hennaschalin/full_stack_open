const _ = require("lodash")

const dummy = (blogs) => {
    return 1;
  }
  
  module.exports = {
    dummy
  }

  const totalLikes = (blogs) => {
    return blogs.length === 0
      ? 0
      : blogs.reduce((sum, post) => sum + post.likes, 0)
    }
      
      const favoriteBlog = (blogs) => {
        if (!blogs || blogs.length === 0) {
          return 0
        }
        const max = blogs.reduce((previous, current) =>
          previous.likes > current.likes ? previous : current,
        )
        const favBlog = {
          title: max.title,
          author: max.author,
          likes: max.likes,
        }
      
        return favBlog
      }

      const mostBlogs = (blogs) => {
        if (blogs.length === 0) return 0;
      
        const authors = _.countBy(blogs, "author");

        const nauthor = Object.keys(authors).reduce((x, y) => {
          return authors[x] > authors[y] ? x : y;
        })
      
        return {
          author: nauthor,
          blogs: authors[nauthor],
        }
      }

  module.exports = {
    totalLikes,
    dummy,
    favoriteBlog,
    mostBlogs,
  }