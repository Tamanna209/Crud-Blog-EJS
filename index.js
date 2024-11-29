const express=require("express");
const {v4 : uuidv4}=require("uuid");
const path=require("path");
const methodOverride=require("method-override");
const app=express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(methodOverride("_method"));

let posts=[
    {
        id:uuidv4(),
        username:'@tamanna_09',
        content:"Hello this is my first vlog"
    },
    {
        id:uuidv4(),
        username:'@tam_09',
        content:"Hello this is my second vlog"
    },
    {
        id:uuidv4(),
        username:'@ishita_02',
        content:"Hello this is Ishita's vlog"
    },
    {
        id:uuidv4(),
        username:'@ishi_09',
        content:"Hello this is food vlog"
    }
];


app.get("/", (req, res)=>{
    res.send(`<h1> Welcome to our blog channel </h1>`)
})
app.get("/posts", (req, res)=>{
    //  res.send(posts);
    res.render("index.ejs", {posts});
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("view.ejs", { post });
});

app.get("/post/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
    let {username, content}=req.body;
    let newId=uuidv4();
    posts.push({id: newId, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});
app.patch("/posts/:id", (req, res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})

app.delete("/posts/:id", (req, res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})
app.listen(8080, ()=>{
    console.log("Server started succefully");
})