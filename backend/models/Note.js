const mongoose=require('mongoose')

const NoteSchema=new mongoose.Schema({
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String
    },
    description:{
        type: String
    },
    tag:{
        type: String ,
        default : 'general'

    }
},
    {timestamps:true}
    
)

module.exports=mongoose.model('note',NoteSchema);
