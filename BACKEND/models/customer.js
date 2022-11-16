const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
   
    name :{
        type :String,
        required : true
    },

    email :{
        type :String,
        required :true
    },

    nic:{
        type :String,
        required :true
    },

    contact_number:{
        type :Number,
        required :true
    },

    address:{
        type :String,
        required :true
    },

    password:{
        type :String,
        required :true
    }
})

const customer = mongoose .model("customer",customerSchema);

module.exports = customer;