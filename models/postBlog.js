import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
})
  
const PostBlog = mongoose.model("PostBlog", blogSchema);

export default PostBlog;