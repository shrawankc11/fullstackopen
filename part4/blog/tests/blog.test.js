const helper = require("./list_helper");
const Blog = require("../models/blog");
const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
// const helper = require('../testmongo')

const api = supertest(app);

let token;

beforeAll(async () => {
    const response = await api.post('/api/users/login').send({ username: "tester", password: "test123" }).expect(200)
    token = response.body.token
})

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of helper.dummyBlogs) {
        const blogObject = new Blog(blog);
        await blogObject.save();
    }
});

describe("getting all the blogs", () => {
    test("get all the blogs from the database", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].id).toBeDefined();
    }, 10000);
});

describe("posting blogs", () => {
    // let token;

    // beforeAll(async () => {
    //     const response = await api.post('/api/users/login').send({ username: "tester", password: "test123" }).expect(200)
    //     token = response.body.token
    //     console.log(token)
    // })

    test("blogs can be posted to the database", async () => {
        const blogObject = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com",
            likes: 7,
        };

        const response = await api
            .post("/api/blogs")
            .send(blogObject)
            .set({ 'Authorization': `bearer ${token}` })


        expect(response.statusCode).toBe(201)
        const testBlog = await api.get("/api/blogs").expect(200);

        expect(testBlog.body).toHaveLength(helper.dummyBlogs.length + 1);
    });
});

describe("adding notes and error handling", () => {


    test("likes property has default value 0", async () => {
        const blogObject = {
            title: "Angular templates",
            authro: "shrawan kc",
            url: "somewhere.com",
        };

        const postedBlog = await api
            .post("/api/blogs")
            .send(blogObject)
            .set({ "Authorization": `bearer ${token}` })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(postedBlog.body.likes).toEqual(0);
    });

    test("if blog fails to post return error status 401", async () => {
        const blogObject = {
            authro: "shrawan kc",
            url: "somewhere.com",
            likes: 400,
        };

        await api
            .post("/api/blogs")
            .send(blogObject)
            .expect(401)
            .expect("Content-Type", /application\/json/);
    });
});

// describe("updated blogs", () => {
//     test("blogs can be updated using their id", async () => {
//         try {
//             const foundBlog = await helper.blogInDb();
//             const blogToUpdate = foundBlog[0];
//             await api
//                 .put(`/api/blogs/${blogToUpdate.id}`)
//                 .expect(200)
//                 .expect("Content-Type", /application\/json/);
//         } catch (error) {
//             console.log(error);
//         }
//     });
// });

// describe("totalLikes", () => {
//   test("of empty list is zero", () => {
//     expect(countLikes([])).toBe(0);
//   });

//   test("when list has only one blog equals the like of that", () => {
//     expect(
//       countLikes([
//         {
//           _id: "5a422a851b54a676234d17f7",
//           title: "React patterns",
//           author: "Michael Chan",
//           url: "https://reactpatterns.com/",
//           likes: 7,
//           __v: 0,
//         },
//       ])
//     ).toBe(7);
//   });

//   test("of a bigger list is calculated right", () => {
//     expect(countLikes(blogs)).toBe(43);
//   });
// });

// describe("most liked blog", () => {
//   test("of empty list is zero", () => {
//     expect(getFavorite([])).toEqual(0);
//   });

//   test("when a list has one blog equals the likes of that", () => {
//     expect(
//       getFavorite([
//         {
//           _id: "5a422bc61b54a676234d17fc",
//           title: "Type wars",
//           author: "Robert C. Martin",
//           url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//           likes: 2,
//           __v: 0,
//         },
//       ])
//     ).toBe(2);
//   });

//   test("of a bigger list is calculated right", () => {
//     expect(getFavorite(blogs)).toEqual({
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     });
//   });
// });

afterAll(() => {
    mongoose.connection.close();
});
