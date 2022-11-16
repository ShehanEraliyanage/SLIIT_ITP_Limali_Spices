
const router = require("express").Router();

let branchModel = require("../models/branch");4
let rawMaterialModel = require("../models/raw_materials.js");
let Employee = require("../models/Employee");



module.exports.addBranch = async (req, res) => {
    console.log(req.body);

    const branch = new branchModel({
        number: req.body.number,
        location: req.body.location,
        manager_id: 1
        // manager_id: req.body.manager_id

  

    })
    const details = await branch.save();
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
module.exports.getAllBranch = async (req, res) => {
    const branch = await branchModel.find({});

    res.send(branch);
    

}

module.exports.deleteBranch = async (req, res) => {
    const branch = await branchModel.findOneAndDelete({_id: req.body.id});
    res.send(branch)

}
module.exports.editBranch = async (req, res) => {

    
        const branch = await branchModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                _id: req.body._id,
                number: req.body.number,
                location: req.body.location,
                
            },
            {
                new:true
            }
            );

        if (branch) {
            res.send({
                status: true,
                details: branch  
            });
        } else {
            res.send({
                status: false,
            });
        }

    
}
module.exports.getReport = async (req, res) => {

    // console.log(session)
     const rawMaterial = await rawMaterialModel.find({branch:session.branch});
    // res.send(rawMaterial);
    const Pending=await Employee.find({status:"0",branch:session.branch}).count();
    const Active=await Employee.find({status:"1",branch:session.branch}).count();
    const Reject=await Employee.find({status:"2",branch:session.branch}).count();
    console.log(String(Pending))


    
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
        "Quantity":Quanitity,
        "TotalPrice": total,
        "PendingCount": String(Pending),
        "ActiveCount":String(Active),
        "RejectCount":String(Reject)


    };

    //Push  JSON Objects to An Array
    jarray.push(item);
    json = JSON.stringify(jarray);

    var jsonObj = JSON.parse(json);
    res.send(jsonObj);


}
module.exports.getBranchById = async (req, res, next) => {

    const branch = await branchModel.findOne({ _id: req.body.id });
    res.send(branch);
    
}

module.exports.getRawMaterial = async (req, res, next) => {

    const raw_material = await rawMaterialModel.find({ branch: session.branch});
    res.send(raw_material);
    
}