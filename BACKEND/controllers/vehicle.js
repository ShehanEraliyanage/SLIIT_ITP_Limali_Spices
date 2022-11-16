
// Models
const VehicleModel = require("../models/vehicle");

module.exports.addVehicle = async (req, res, next) => {
    console.log(req.body);
    const vehicle = new VehicleModel({
        number: req.body.number,
        type: req.body.type,
        branch: req.body.branch,
        driver: req.body.driver,
        load: req.body.load,
        state: req.body.state
    });
    const details = await vehicle.save();
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

module.exports.deleteVehicles = async (req, res, next) => {
    const vehicle = await VehicleModel.findOneAndDelete({ _id: req.body.id });
    res.send(vehicle);
}

module.exports.getAllVehicles = async (req, res, next) => {
    const vehicles = await VehicleModel.find();
    res.send(vehicles);
}

module.exports.getAllVehiclesCount = async (req, res) => {
    const vehicles = await VehicleModel.find().count();
    res.send(String(vehicles));
}

module.exports.getAlldelivering = async (req, res) => {
    const vehicles = await VehicleModel.find({state:"Delivering"});
    res.send(vehicles);
}

module.exports.getAlldeliveringCount = async (req, res) => {
    const vehicles = await VehicleModel.find({state:"Delivering"}).count();
    res.send(String(vehicles));
}

module.exports.getAllavalable = async (req, res, next) => {
    const vehicles = await VehicleModel.find({state:"Avalable"});
    res.send(vehicles);
}

module.exports.getAllavalableCount = async (req, res) => {
    const vehicles = await VehicleModel.find({state:"Avalable"}).count();
    res.send(String(vehicles));
}

module.exports.getAllinRepair = async (req, res, next) => {
    const vehicles = await VehicleModel.find({state:"In Repair"});
    res.send(vehicles);
}

module.exports.getAllinRepairCount = async (req, res) => {
    const vehicles = await VehicleModel.find({state:"In Repair"}).count();
    res.send(String(vehicles));
}

module.exports.editVehicle = async (req, res, next) => {

    try {

        console.log(req);

        const vehicle = await VehicleModel.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                _id: req.body._id,
                number: req.body.number,
                type: req.body.type,
                branch: req.body.branch,
                driver: req.body.driver,
                load: req.body.load,
                state: req.body.state
            },
            {
                new:true
            }
            );

        if (vehicle) {
            res.send({
                status: true,
                details: vehicle  
            });
        } else {
            res.send({
                status: false,
            });
        }

    } catch (error) {
        console.log(error.messaga)
    }



}

module.exports.getSelectedVehicle = async (req, res, next) => {
    const vehicles = await VehicleModel.findOne({ _id: req.body.id });
    res.send(vehicles);
}