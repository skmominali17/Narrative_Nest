import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import ejs from "ejs";
import dotenv from 'dotenv';
import { renderFile } from 'ejs';
import router from "./routes.js";
import PostBlog from "./models/postBlog.js";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(cors());
app.use("/", router);


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

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))).catch((err) => console.log(err.message));


export default app;
