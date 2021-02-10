const express = require("express");
const router = express.Router();
const Page = require("../models/notepadschema");
const notes = require("../controller/noteController")
const catchAsync = require("../utilities/catchAsync");
const { validateNotepad } = require("../middleware");

router.route("/")
    .get(catchAsync(notes.all))
    .post(validateNotepad, catchAsync(notes.postNew))

router.get("/new", notes.newForm);

router.route("/:id")
    .get(notes.checkOne)
    .put(validateNotepad, catchAsync(notes.edit))
    .patch(validateNotepad, catchAsync(notes.addNote))
    .delete(catchAsync(notes.deletePost))

router.get("/:id/edit", notes.renderEdit)

module.exports = router;