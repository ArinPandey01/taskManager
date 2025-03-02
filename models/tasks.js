const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must fill name'],
        trim: true
    },
    complete:{
        type:Boolean,
        default: false
    }
})

module.exports=mongoose.model('Task',schema);