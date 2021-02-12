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
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Page", PageSchema)