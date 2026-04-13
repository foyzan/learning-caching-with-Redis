const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
    title : String,
    body: String,
    status: {
        type: String,
        enum: ['published', 'hidden'],
        default: 'hidden'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }


}, {timestamps: true, id : true})



const Articles = model('Articles', articleSchema)

module.exports = Articles