const mongoose=require('mongoose');
const optionSchema=new mongoose.Schema({
    option1:String,
    option2:String,
    option3:String
});
const quiestionSchema=new mongoose.Schema({
    question:{type:String ,required:true},
    options:optionSchema
});

const Question=mongoose.model('Question',quiestionSchema);
module.exports=Question;