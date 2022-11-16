const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    
    number: {
        type: String,
        required :true
    },
    type: {
        type: String,
        required :true
    },
    branch: {
        type: String,
        required :true
    },
    driver: {
        type: String,
        required :true
    },
    load: {
        type: String,
        required :true
    },
    state: {
        type: String,
        required :true
    }

});
const VehicleModel = mongoose.model('vehicles', VehicleSchema);
module.exports = VehicleModel;