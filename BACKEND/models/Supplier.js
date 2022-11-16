const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    nic : {
        type : String,
        required : true
    },

    contactno:{
        type : Number,
        required : false
    },

    address:{
        type : String,
        required : false
    },

    password:{
        type : String,
        required : false
    },

    status:{
        type : String,
        required : false
    }
    

});


const Supplier = mongoose.model("Supplier",supplierSchema);

module.exports = Supplier;

