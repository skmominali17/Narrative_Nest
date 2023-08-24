import express from "express";
import { home, contact, about, renderComposePage } from "./serverFunctions.js";
import PostBlog from "./models/postBlog.js";

const router = express.Router();

router.get("/", home);

router.get("/posts/:postId", async (req, res) => {
  try {
    const requestedPostId = req.params.postId;
    const post = await PostBlog.findOne({_id: requestedPostId});
    res.render("post", {
      Title: post.title,
      Content: post.content
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/about", about);

router.get("/contact", contact);

router.get('/compose', renderComposePage);

router.post("/compose", async (req, res) => {
  const { title, content } = req.body;
  try {
    await PostBlog.create({
      title,
      content
    });
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
