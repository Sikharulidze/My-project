import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let blogPosts = [];

app.get("/", (req, res) => {
  res.render("home", { posts: [] });
});

app.get("/create", (req, res) => {
  res.render("create", { posts: blogPosts });
});

app.get("/bio", (req, res) => {
  res.render("bio");
});

app.get("/my-dog", (req, res) => {
  res.render("my-dog");
});

app.get("/tindog", (req, res) => {
  res.render("tindog");
});

app.get("/web-development", (req, res) => {
  res.render("web-development");
});

app.get("/home", (req, res) => {
  res.render("home", { posts: [] });
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
    createdAt: new Date(),
  };

  blogPosts.push(newPost);

  res.redirect("/create");
});

app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((post) => post.id === postId);

  if (post) {
    res.render("single-post", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  blogPosts = blogPosts.filter((post) => post.id !== postId);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((post) => post.id === postId);
  if (post) {
    res.render("edit", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = blogPosts.findIndex((post) => post.id === postId);

  if (postIndex !== -1) {
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      title: req.body.title,
      content: req.body.content,
    };
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
