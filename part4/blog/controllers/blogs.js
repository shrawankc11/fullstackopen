const blogRouter = require("express").Router();
const { findById } = require("../models/blog");
const Blog = require("../models/blog");
const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor
const tokenExtractor = require('../utils/middleware').tokenExtractor
require('dotenv').config()

blogRouter.get("/", async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
        return res.json(blogs);
    } catch (error) {
        next(error);
    }
});

blogRouter.post("/", tokenExtractor, userExtractor, async (req, res, next) => {
    const body = req.body;

    if (!body.url || !body.title) {
        return res.status(400).json({ error: "missing content" });
    }
    try {

        const user = await User.findById(req.user)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id,
            likes: body.likes,
        });

        const savedBlog = await blog.save();
        user.blog = user.blog.concat(savedBlog._id)
        await user.save()
        //we send a populated blog because of frontend rendering issues!!
        const blogToSend = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
        return res.status(201).json(blogToSend);

    } catch (error) {
        next(error);
    }
});

blogRouter.delete("/:id", tokenExtractor, userExtractor, async (req, res, next) => {

    const blogId = req.params.id
    try {
        const blog = await Blog.findById(blogId)
        let user = await User.findById(req.user)
        if (!blog) {
            return res.status(401).json({ message: "blog already deleted!" })
        }
        if (blog) {
            await Blog.findByIdAndDelete(blogId);
            user.blog = user.blog.filter(b => JSON.stringify(b) !== JSON.stringify(blogId))
            await user.save()
            return res.status(202).json({ messge: "blog has been deleted succesfully!" });
        }
        return res.json({ message: "blog already deleted" })

    } catch (error) {
        next(error);
    }
});


// blogRouter.put("/:id", async (req, res, next) => {
//     try {
//         const newBlog = await Blog.findById(req.params.id);
//         const blog = JSON.parse(JSON.stringify(newBlog));
//         const blogToPut = { ...blog, ...req.body };
//         const updatedBlog = await Blog.findByIdAndUpdate(
//             req.params.id,
//             blogToPut,
//             { new: true }
//         );
//         console.log(updatedBlog)
//         return res.json(updatedBlog);
//     } catch (error) {
//         next(error);
//     }
// });

//route to update blog likes
blogRouter.put('/:id', tokenExtractor, userExtractor, async (req, res, next) => {
    const id = req.params.id
    try {
        const blogToUpdate = await Blog.findById(id)
        const blogInObj = JSON.parse(JSON.stringify(blogToUpdate))
        const blogToPut = { ...blogInObj, likes: ++blogInObj.likes }
        const updatedBlog = await Blog.findByIdAndUpdate(id, blogToPut, { new: true })
        return res.json(updatedBlog)
    } catch (err) {
        next(err)
    }
})

module.exports = blogRouter;
