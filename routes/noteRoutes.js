const express = require("express");
const router = express.Router();
const Page = require("../models/notepadschema");
const notes = require("../controller/noteController")
const catchAsync = require("../utilities/catchAsync");


router.route("/")
    .get(notes.all)
    .post(catchAsync(notes.postNew))

router.get("/new", notes.newForm);

router.route("/:id")
    .get(notes.checkOne)
    .put(catchAsync(notes.edit))
    .patch(catchAsync(notes.addNote))
    .delete(notes.deletePost)

router.get("/:id/edit", notes.renderEdit)

module.exports = router;