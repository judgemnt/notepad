const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
const passport = require("passport");
const localstrategy = require("passport-local");
const User = require("./models/userschema");
const ExpressError = require("./utilities/expressError");

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
app.use(flash());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    next();
})

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/notes", noteRoutes);
app.use("/", userRoutes);

app.all("*", (req, res, next) => {
    next(new ExpressError("Page not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no, something went wrong";
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Connected to 3000");
});
