const Blog = require("../models/blog");

// const totalLikes = (blogs) => {
//     const reducer = (previousBlog, currentBlog) =>
//         previousBlog + currentBlog.likes;

//     return blogs.length ? blogs.reduce(reducer, 0) : 0;
// };

// const favoriteBlog = (blogs) => {
//     const reducer = (previousBlog, currentBlog) =>
//         previousBlog < currentBlog.likes ? currentBlog.likes : previousBlog;

//     const mostLikes = blogs.reduce(reducer, 0);
//     const mostLikedBlog = blogs.find((blog) => blog.likes === mostLikes);
//     if (!blogs.length) {
//         return 0;
//     } else if (blogs.length === 1) {
//         return blogs[0].likes;
//     } else {
//         return mostLikedBlog;
//     }
// };

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
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};


module.exports = {
    dummyBlogs,
    blogInDb,
};
