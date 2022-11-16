const router = require("express").Router();
const raw_materials = require('../controllers/raw_materials');
const catchAsync = require('../utils/catchAsync');


router.route("/getAllRawMaterials").get(catchAsync(raw_materials.getAllrawMaterial));
router.route("/add").post(catchAsync(raw_materials.addrawMaterial));
router.route("/delete").post(catchAsync(raw_materials.deleterawMaterial));
router.route("/edit").post(catchAsync(raw_materials.editRawMaterial));
router.route("/getSelectedRawMaterials").post(catchAsync(raw_materials.getSelectedRawMaterial));

router.route("/getReportByItem").post(catchAsync(raw_materials.getStockByName));
router.route("/getReport").get(catchAsync(raw_materials.getFullStockCount));
router.route("/getReportByItemAndStock").post(catchAsync(raw_materials.getSupplierReportByItem));

router.route("/getItemNames").get(catchAsync(raw_materials.getItemNames));

router.route("/getById").post(catchAsync(raw_materials.getRawMaterialByID));








module.exports = router;