const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name : String,
    username : String,
    email: String,
    password: String, 
}, {
    timestamps: true,
    id: true
})


const Users = model("Users", userSchema)

module.exports= Users;