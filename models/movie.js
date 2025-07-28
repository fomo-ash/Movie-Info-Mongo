const mongoose=require('mongoose')


const movieSchema=new
mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    watched: {
        type: Boolean,
        default:false
    }

})

const movie=mongoose.model('Movie',movieSchema)
module.exports=movie