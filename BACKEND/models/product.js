const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = { toJSON: { virtuals: true}};

const productSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },

    description:{
        type : String,
        required : true
    },

    remarks:{
        type : String,
    },

    imageUrl:[{
        type : String,
    }],

    availability: {
        type : String,
        required : true
    }

}, opts);
const Product = mongoose.model("product",productSchema);

const productionSchema = new Schema({
    productName : {
        type : String,
        required : true
    },
    product : {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    production : {
        type: Number,
        required : true
    }, 
    sold : {
        type: Number,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    month : {
        type : String,
        required : true
    }
})
const Production = mongoose.model("production",productionSchema);

module.exports = {Product, Production};
