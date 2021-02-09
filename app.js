const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const noteRoutes = require("./routes/noteRoutes");
const session = require("express-session");
const passport = require("passport");
const localstrategy = require("passport-local");
const User = require("./models/userschema");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/notepad', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("Connected");
    })
    .catch((e) => {
        console.log("Connection error");
        console.log(e);
    });

const sesh = {
    name: "wip",
    secret: "poorlyimplementedsecret",
    resave: false,
    saveUninitialized: true
}


app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session(sesh));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/notes", noteRoutes);

app.get("/register", (req, res) => {
    res.render("user/register")
})

app.post("/register", async (req, res) => {
    console.log(req.body)
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.redirect("/notes");
})

app.get("/login", (req, res) => {
    res.render("user/login")
})

app.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    res.redirect("/notes");
})

app.listen(3000, () => {
    console.log("Connected to 3000");
});
