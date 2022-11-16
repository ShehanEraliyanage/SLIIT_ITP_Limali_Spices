const router = require("express").Router();
const branch = require('../controllers/branch');
const catchAsync = require('../utils/catchAsync');

router.route("/getAllBranch").get(catchAsync(branch.getAllBranch));
router.route("/add").post(catchAsync(branch.addBranch));
router.route("/delete").post(catchAsync(branch.deleteBranch));
router.route("/edit").post(catchAsync(branch.editBranch));
router.route("/getBranchById").post(catchAsync(branch.getBranchById));
router.route("/generateReport").get(catchAsync(branch.getReport));
router.route("/getRawMaterial").get(catchAsync(branch.getRawMaterial));





module.exports = router;