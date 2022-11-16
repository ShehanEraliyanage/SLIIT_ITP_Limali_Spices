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
   
    

})

const Inquiry = mongoose.model("SupplierInquiry",inquirySchema);

module.exports = Inquiry;