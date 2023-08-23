import express from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose";
import cors from "cors"
import ejs from "ejs"
import _ from "lodash"
import dotenv from 'dotenv';
dotenv.config();
import PostBlog from "./models/postBlog.js";

const homeStartingContent = "Welcome to Narrative Nest, a haven for words and stories that captivate the imagination. Our virtual sanctuary is dedicated to the art of storytelling in all its forms. Here, you'll discover a curated collection of thought-provoking articles, creative insights, and literary explorations.Embark on a journey through the realms of literature, where each piece carries a unique voice, a distinct perspective, and an invitation to immerse yourself in the world of words. From heartwarming narratives that touch your soul to thought-provoking discussions that challenge your intellect, our blog is a place where every story finds its place.Whether you're a passionate reader, a budding writer, or someone seeking inspiration, Narrative Nest is your refuge. We believe that stories have the power to connect, inspire, and transform. Join us as we unravel tales that linger in your mind long after you've read the last word. Explore, engage, and embrace the magic of storytelling with us. Welcome to Narrative Nest, where every page is an open invitation to wander through the wonders of words.";

const aboutContent = "At Narrative Nest, we believe that every person is a storyteller at heart. Our 'About' page is a glimpse into the tapestry of creators, dreamers, and wordsmiths who bring this platform to life. We're not just a blog we're a community united by the love of storytelling. Our diverse team of writers, thinkers, and artists come together to share their perspectives, experiences, and imaginations with you. Our journey began with the idea that stories have the power to shape our thoughts and emotions, to inspire change, and to foster connection. We're here to celebrate the beauty of the written word, the magic of narratives, and the power of human expression. As we weave the threads of fiction and non-fiction, poetry and prose, we invite you to join us on this adventure. Explore the minds behind the stories, the faces behind the words, and the passion that fuels each sentence. Through our 'About' page, you'll meet the creators who curate the content, share their insights, and embark on journeys of their own. Discover the motivations, experiences, and dreams that fuel our dedication to storytelling. Whether you're an avid reader seeking new worlds to explore or an aspiring writer looking for inspiration, we're here to connect with you. Narrative Nest isn't just a destination; it's a voyage through the boundless realms of imagination. Thank you for being a part of our narrative. Together, we shape stories that resonate, stories that matter, and stories that leave an indelible mark on the fabric of our lives. Welcome to the heart of Narrative Nest.";

const contactContent = "We're thrilled to connect with you at Narrative Nest. Our 'Contact' page is your direct line to the vibrant community of storytellers and readers that make up our blog. Whether you have questions, suggestions, or just want to share your thoughts, we're all ears. Your feedback fuels our creativity and inspires us to continue weaving tales that resonate with you. To reach out, simply drop us a line at skmominali17@gmail.com. Whether you're an aspiring writer seeking advice, a dedicated reader with recommendations, or someone who just wants to say hello, we're excited to hear from you. At Narrative Nest, we believe that every conversation is a story waiting to be shared. Your message matters to us, and we're committed to creating an inclusive and engaging space for discussions and exchanges. Thank you for being a part of our journey. Your support and engagement are the threads that bind our narrative community together. We're looking forward to connecting with you and weaving new stories together. Warm regards, Momin";

const app = express();

app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(cors());

export const home = async (req, res) => {
  try {
      const posts = await PostBlog.find({});
      const data = {
          Content: homeStartingContent,
          blog: posts
      };
      const html = await renderFile('views/home.ejs', data); // Render the EJS template
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
      const html = await renderFile('views/about.ejs', data); // Render the EJS template
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
      const html = await renderFile('views/contact.ejs', data); // Render the EJS template
      res.status(200).send(html);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
};


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))).catch((err) => console.log(err.message));



app.get("/", function (req, res) {
        PostBlog.find({}).then((posts)=>{
            res.render("home", {
              Content: homeStartingContent,
              blog: posts
            })
        })
})
  
app.get("/posts/:postId", function (req, res) {
    let requestedPostId = req.params.postId;
        PostBlog.findOne({_id: requestedPostId}).then((posts)=>{
            res.render("post", {
              Title: posts.title,
              Content: posts.content
            })
          })
});
  
  
app.get("/about", function (req, res) {
    res.render("about", { Content: aboutContent });
})
  
  
app.get("/contact", function (req, res) {
    res.render("contact", { Content: contactContent });
})
  
  
  
app.get("/compose", function (req, res) {
    res.render("compose");
})
  
app.post("/compose", function (req, res) {
    const { title, content } = req.body;
        PostBlog.create({
            title,
            content
          })
        res.redirect("/");
})




export default app;