import { renderFile } from "ejs"
import PostBlog from './models/postBlog.js';

const homeStartingContent = "Welcome to Narrative Nest, a haven for words and stories...";
const aboutContent = "At Narrative Nest, we believe that every person is a storyteller..."; 
const contactContent = "We're thrilled to connect with you at Narrative Nest. Our 'Contact'...";

export const home = async (req, res) => {
  try {
    const posts = await PostBlog.find({});
    const data = {
      Content: homeStartingContent,
      blog: posts
    };
    const html = await renderFile('views/home.ejs', data);
    res.status(200).send(html);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const about = async (req, res) => {
  try {
    const data = {
      Content: aboutContent
    };
    const html = await renderFile('views/about.ejs', data);
    res.status(200).send(html);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const contact = async (req, res) => {
  try {
    const data = {
      Content: contactContent
    };
    const html = await renderFile('views/contact.ejs', data);
    res.status(200).send(html);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
