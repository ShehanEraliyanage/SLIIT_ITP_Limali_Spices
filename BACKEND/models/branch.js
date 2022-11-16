const mongoose = require('mongoose');

//check status  


const Schema = mongoose.Schema;

const branchSchema = new Schema({
    
    number: {
        type: String,
    },
    location: {
        type: String,
    },
    manager_id: {
        type: String,
    }

});

const branchModel = mongoose.model('branch', branchSchema);
module.exports = branchModel;