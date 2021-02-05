const Page = require("../models/notepadschema");
const ObjectID = require("bson-objectid");

module.exports.all = async (req, res) => {
    const pages = await Page.find({});
    res.render("notes/home", { pages });
};

module.exports.newForm = (req, res) => {
    res.render("notes/new");
};

module.exports.postNew = async (req, res) => {
    const newPage = new Page(req.body);
    await newPage.save();
    res.redirect("/notes")
};

module.exports.checkOne = async (req, res) => {
    const { id } = req.params;
    const info = await Page.findById(id);
    res.render("notes/show", { info });
};

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const info = await Page.findByIdAndUpdate(id, { ...req.body });
    res.redirect(`/notes/${info._id}`);
};

module.exports.addNote = async (req, res) => {
    const { id } = req.params;
    const page = await Page.findById(id)
    if (req.body.notes) {
        await page.updateOne({ $push: { notes: { note: req.body.notes, id: ObjectID() } } });
        page.save();
    } if (req.body.deleteNotes) {
        await page.updateOne({ $pull: { notes: { id: { $in: req.body.deleteNotes } } } })
    } res.redirect(`/notes/${page._id}`)
};

module.exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const deleteInfo = await Page.findByIdAndDelete(id);
    res.redirect("/notes");
};

module.exports.renderEdit = async (req, res) => {
    const { id } = req.params;
    const info = await Page.findById(id);
    res.render("notes/edit", { info });
};
