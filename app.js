const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const engine = require("ejs-mate");
const Page = require("./models/notepadschema");
const methodOverride = require("method-override");
const noteRoutes = require("./routes/noteRoutes")

const mongoose = require("mongoose");
const { info } = require("console");
mongoose.connect('mongodb://localhost:27017/notepad', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("Connected");
    })
    .catch((e) => {
        console.log("Connection error");
        console.log(e);
    });

app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/notes", noteRoutes);

// app.patch("/notes/:id", async (req, res) => {
//     const { id } = req.params;
//     const info = await Page.findById(id);
//     console.log(req.body.deleteNotes)
//     if (req.body.deleteNotes) {
//         await info.updateOne({ $pull: { notes: { $in: req.body.deleteNotes } } })
//         res.redirect(`/notes/${info._id}`)
//     } else {
//         console.log("Failed")
//     }
// });

app.listen(3000, () => {
    console.log("Connected to 3000");
});
