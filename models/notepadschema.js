const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    note: {
        type: String,
        required: true
    }
})
const PageSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    notes: [NoteSchema],
    deleteNotes: [{
        type: String
    }]
});

module.exports = mongoose.model("Page", PageSchema)