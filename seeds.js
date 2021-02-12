const Page = require("./models/notepadschema");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/notepad', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected");
    })
    .catch((e) => {
        console.log("Connection error");
        console.log(e);
    });

const seedDB = async () => {
    await Page.deleteMany({});
    for (let i = 0; i < 25; i++) {
        const page = new Page({
            topic: `Random topic ${i}`,
            notes: [{
                note: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius quaerat fugit maiores aut tenetur deserunt, sit dolores ducimus voluptate expedita harum laborum voluptatum delectus nesciunt non, dicta beatae sint esse."
            }, {
                note: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius quaerat fugit maiores aut tenetur deserunt, sit dolores ducimus voluptate expedita harum laborum voluptatum delectus nesciunt non, dicta beatae sint esse."
            }, {
                note: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius quaerat fugit maiores aut tenetur deserunt, sit dolores ducimus voluptate expedita harum laborum voluptatum delectus nesciunt non, dicta beatae sint esse."
            }],
            author: "6026acbd72cfda4cf0b6ca5e"
        })
        await page.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    });