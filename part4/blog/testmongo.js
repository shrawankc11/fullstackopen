const Blog = require("./models/blog");

const dummyBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
];

const blogInDb = async () => {
    const blogsInDB = await Blog.find({});
    return blogsInDB.map((blog) => blog.toJSON());
};

const getDbData = async () => {
    const response = await blogInDb();
    return response;
};

module.exports = { getDbData, dummyBlogs };
