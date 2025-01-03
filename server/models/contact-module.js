const {Schema, model} = require("mongoose")

const contactStructure = new Schema ({

    username: { type:String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}
})

const Contact = new model('Contact', contactStructure);
module.exports = Contact;