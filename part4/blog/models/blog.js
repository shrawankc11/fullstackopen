//Database file
//We only define our schema and structure here

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: Number,
        default: 0,
    },
});

blogSchema.set("toJSON", {
    transform: (docs, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Blog", blogSchema);
