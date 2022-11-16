
// Models
const router = require("express").Router();

let rawMaterialModel = require("../models/raw_materials.js");
let Supplier = require("../models/Supplier");


//Data Insert
module.exports.addrawMaterial = async (req, res) => {
    console.log(req.body);

    const rawMaterial = new rawMaterialModel({
      // Passed arguments from The Front End
        itemCode: req.body.itemCode,
        name: req.body.name,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        supplier: req.body.supplier,
        branch: req.body.branch

        

    })
    const details = await rawMaterial.save();
    if (details) {
        res.send({
        
            status: true,
            details: details
        });
    } else {
        res.send({
            status: false,
        });
    }
}
module.exports.getAllrawMaterial = async (req, res) => {

    const rawMaterial = await rawMaterialModel.find({});

    res.send(rawMaterial);
    

}

module.exports.deleterawMaterial = async (req, res) => {
    const rawMaterial = await rawMaterialModel.findOneAndDelete({_id: req.body.id});
    res.status(200).send({status: "The Raw Material Deleted"})

}
module.exports.editRawMaterial = async (req, res) => {

    
        const rawMaterial = await rawMaterialModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                _id: req.body._id,
                itemCode: req.body.itemCode,
                name: req.body.name,
                unitPrice: req.body.unitPrice,
                branch:req.body.branch,
                quantity:req.body.quantity

                
            },
            {
                new:true
            }
            );

        if (rawMaterial) {
            res.send({
                status: true,
                details: rawMaterial  
            });
        } else {
            res.send({
                status: false,
            });
        }

    
}
module.exports.getSelectedRawMaterial = async (req, res, next) => {

    const raw_material = await rawMaterialModel.findOne({ _id: req.body.id });
    console.log.apply(raw_material);
    res.send(raw_material);
    
}
module.exports.getRawMaterialByID = async (req, res, next) => {
    const raw_material = await rawMaterialModel.findOne({ itemCode: req.body.code });
    console.log.apply(raw_material);
    res.send(raw_material);
    
}

//Reports
module.exports.getSupplierReportByItem = async (req, res) => {
    supplier_id=req.body.supplier;
    item=req.body.item;



    const rawMaterial = await rawMaterialModel.find({supplier: supplier_id,name:item});

    //Get Supplier Name from ID
    const supplier = await Supplier.findOne({ _id: supplier_id });
    //Create Array and Variables
    var jarray = [];
    var json = "";    
    var Quanitity=0;
    var total=0;

    //Get Result of The Item Sold by The Seller
    rawMaterial.forEach(function(raw_material) {
               Quanitity=raw_material.quantity+Quanitity;
               total=total+(raw_material.unitPrice*Quanitity);
    
    });
    //Set Items in into Json Object
    var item = {
        "SupplierName":supplier.name,
        "Item":item,
        "Quantity":Quanitity,
        "TotalPrice": total,

    };

    //Push  JSON Objects to An Array
    jarray.push(item);
    json = JSON.stringify(jarray);

    var jsonObj = JSON.parse(json);
    res.send(jsonObj);


}
//Get Full Stock Count
module.exports.getFullStockCount = async (req, res) => {
    const rawMaterial = await rawMaterialModel.find();
    
    //Create Array and Variables
    var jarray = [];
    var Quanitity=0;
    var total=0;
    var json = "";  

    //Get Result of The Item Sold by The Seller
    rawMaterial.forEach(function(raw_material) {
               Quanitity=raw_material.quantity+Quanitity;//Calculate Quantity
               total=total+(raw_material.unitPrice*Quanitity);//Calculate Total Price
    
    });
    //Set Items in into JS Object
    var item = {
        "Quantity":Quanitity,
        "TotalPrice": total,

    };

    //Push  JS Objects to An Array
    jarray.push(item);


    //Convert JS object to Json

    json = JSON.stringify(jarray);

    var jsonObj = JSON.parse(json);


    res.send(jsonObj);


}

//Get Full Stock Count By Item
module.exports.getStockByName = async (req, res) => {
    item=req.body.item;

    const rawMaterial = await rawMaterialModel.find({name:item});
    
    //Create Array and Variables
    var jarray = [];
    var Quanitity=0;
    var total=0;
    var json = "";  

    //Get Result of The Item Sold by The Seller
    rawMaterial.forEach(function(raw_material) {
               Quanitity=raw_material.quantity+Quanitity;
               total=total+(raw_material.unitPrice*Quanitity);
    
    });
    //Set Items in into Json Object
    var item = {
        "item":item,
        "Quantity":Quanitity,
        "TotalPrice": total,

    };

    //Push  JSON Objects to An Array
    jarray.push(item);
    json = JSON.stringify(jarray);

    var jsonObj = JSON.parse(json);
    res.send(jsonObj);


}
//Get Full Stock Count By Item
module.exports.getItemNames= async (req, res) => {
    const rawMaterial = await rawMaterialModel.distinct("name").find();
    
    //Create Array and Variables
    var json = "";  
    var jarray = [];
 
    
    //Get Result of The Item Sold by The Seller
    rawMaterial.forEach(function(raw_material) {
        var item = {
        
            "name":raw_material.name,
    
        };
    
        //Push  JSON Objects to An Array
        jarray.push(item);     
    
    });
    //Set Items in into Json Object
    json = JSON.stringify(jarray);
    

    var jsonObj = JSON.parse(json);
    res.send(jsonObj);


}
    

module.exports.getSelectedSupplier = async (req, res, next) => {

    const supplier = await Supplier.findOne({ _id: req.body.id });
    res.send(supplier);
    
}
