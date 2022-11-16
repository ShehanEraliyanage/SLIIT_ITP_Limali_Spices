const router = require("express").Router();
const vehicles = require('../controllers/vehicle');
const catchAsync = require('../utils/catchAsync');


router.route("/add").post(catchAsync(vehicles.addVehicle));
router.route("/delete").post(catchAsync(vehicles.deleteVehicles));
router.route("/edit").post(catchAsync(vehicles.editVehicle));
router.route("/getSelectedVehicle").post(catchAsync(vehicles.getSelectedVehicle));
router.route("/getAllVehicles").get(catchAsync(vehicles.getAllVehicles));
router.route("/getAlldelivering").get(catchAsync(vehicles.getAlldelivering));
router.route("/getAllavalable").get(catchAsync(vehicles.getAllavalable));
router.route("/getAllinRepair").get(catchAsync(vehicles.getAllinRepair));
router.route("/getAllVehiclesCount").get(catchAsync(vehicles.getAllVehiclesCount));
router.route("/getAlldeliveringCount").get(catchAsync(vehicles.getAlldeliveringCount));
router.route("/getAllavalableCount").get(catchAsync(vehicles.getAllavalableCount));
router.route("/getAllinRepairCount").get(catchAsync(vehicles.getAllinRepairCount));


module.exports = router;
