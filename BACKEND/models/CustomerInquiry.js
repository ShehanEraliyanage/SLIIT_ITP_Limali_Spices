const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const inquirySchema = new Schema({
    title :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
   
    

})

const Inquiry = mongoose.model("Inquiry",inquirySchema);

module.exports = Inquiry;
