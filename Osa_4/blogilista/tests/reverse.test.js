const listHelper = require('../utils/list_helper')
const  { listWithNoBlogs , listWithOneBlog , listWithblogs } = require('./blogs.helper.js')

test('dummy to be 1', () => {  
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  describe("total likes", () => {
    test("when list has no blogs, equals 0", () => {
      const result = listHelper.totalLikes(listWithNoBlogs)
      expect(result).toBe(0)
    })

    test("when list has only one blog, equals the likes of that", () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
      })
    
    test("when list has many blogs, equals the sum of them all", () => {
      const result = listHelper.totalLikes(listWithblogs)
      expect(result).toBe(36)
      })
    })

    //favourite blog
    describe('returns favourite blog', () => {
      test('when list has no blog, equals 0', () => {
        const result = listHelper.favoriteBlog(listWithNoBlogs)
        expect(result).toBe(0)
      })
    
      test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          likes: 5,
        })
      })
    
      test('when list has many blogs equals the favourite', () => {
        const result = listHelper.favoriteBlog(listWithblogs)
        expect(result).toEqual({
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          likes: 12,
        })
      })
    })


        //most blogs
        describe("most blogs", () => {
          test("when list has no blogs, equals to 0", () => {
            const result = listHelper.mostBlogs(listWithNoBlogs);
            expect(result).toBe(0)
          });
        
          test("when list has one blog, equals to that one", () => {
            const result = listHelper.mostBlogs(listWithOneBlog);
            expect(result).toEqual({
              author: "Edsger W. Dijkstra",
              blogs: 1,
            })
          })
        
          test("when list has many blogs, equals to Robert C. Martin", () => {
            const result = listHelper.mostBlogs(listWithblogs);
            expect(result).toEqual({
              author: "Robert C. Martin",
              blogs: 3,
            })
          })
        })


