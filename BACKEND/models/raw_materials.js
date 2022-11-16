
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema Object
const rawMaterialsSchema = new Schema({
    
    //Define Fields of The Schema

    itemCode: {
        type: String,
    },
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    unitPrice: {
        type: Number,
    },
    supplier: {
        type: String,
    },
    branch: {
        type: String,
    }

});

//Compile Schema into the Model in order to create documents

const rawMaterial = mongoose .model('raw_material', rawMaterialsSchema);

module.exports = rawMaterial;