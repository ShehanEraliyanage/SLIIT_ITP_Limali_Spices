const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const SquotationSchema = new Schema({
    item :{
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    supplier_id : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },

    

})

const Purchase_quotations = mongoose.model("Purchase_quotations",SquotationSchema);

module.exports = Purchase_quotations;
