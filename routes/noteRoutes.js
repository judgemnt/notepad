const express = require("express");
const router = express.Router();
const Page = require("../models/notepadschema");
const notes = require("../controller/noteController")

router.route("/")
    .get(notes.all)
    .post(notes.postNew)

router.get("/new", notes.newForm);

router.route("/:id")
    .get(notes.checkOne)
    .put(notes.edit)
    .patch(notes.addNote)
    .delete(notes.deletePost)

router.get("/:id/edit", notes.renderEdit)

module.exports = router;