const express = require("express");
const router = express.Router();
const Page = require("../models/notepadschema");
const notes = require("../controller/noteController")
const catchAsync = require("../utilities/catchAsync");
const { validateNotepad, isLoggedIn, isAuthor } = require("../middleware");

router.route("/")
    .get(isLoggedIn, catchAsync(notes.all))
    .post(isLoggedIn, catchAsync(notes.postNew), validateNotepad)

router.get("/new", isLoggedIn, notes.newForm);

router.route("/:id")
    .get(isLoggedIn, notes.checkOne)
    .put(isLoggedIn, isAuthor, validateNotepad, catchAsync(notes.edit))
    .patch(isLoggedIn, isAuthor, catchAsync(notes.addNote))
    .delete(isLoggedIn, isAuthor, catchAsync(notes.deletePost))

router.get("/:id/edit", isLoggedIn, isAuthor, notes.renderEdit)

module.exports = router;