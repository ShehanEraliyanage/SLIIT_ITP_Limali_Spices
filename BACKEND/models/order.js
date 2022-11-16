const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
   
    item :{
        type :String,
        required : true
    },

    quantity:{
        type :Number,
        required :true
    },

    order_date:{
        type :String,
        required :true
    },

    delivery_date:{
        type :String,
    },

    customer_id:{
        type :String,
        required :true
    },

    branch:{
        type :String,
    
    },

    branch_status:{
        type :String,
        required :true
    },

    status:{
        type :String,
        required :true
    },

    vehicle:{
        type :String
    },

})

const order = mongoose .model("order",orderSchema);

module.exports = order;