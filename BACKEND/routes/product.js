const router = require("express").Router();
let { Product , Production } = require("../models/product");
const products = require('../controllers/product');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
let fs = require('fs-extra');

const { storage } = require('../cloudinary');
const upload = multer({ storage });


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let path = './uploads/';
//         fs.mkdirsSync(path);
//         cb(null, path)
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         // cb(null, file.fieldname + '-' + uniqueSuffix)
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: storage })  


router.route("/add").post(upload.array('images'), catchAsync(products.createProduct));

router.route("/getAllProducts").get(catchAsync(products.showProducts));

router.route("/update/:id").put(catchAsync(products.editProduct));

router.route("/delete/:id").delete(catchAsync(products.deleteProduct));

router.route("/get/:id").get(catchAsync(products.showProduct));

router.route("/production").get(catchAsync(products.showProduction));

router.route("/production").post(catchAsync(products.createProduction));

router.route("/dailyProduction").post(catchAsync(products.createDailyProduction));

router.route("/dailySales").post(catchAsync(products.createDailySales));

router.route("/getMonthlyProduction/:id").get(catchAsync(products.getMonthlyProduction));

module.exports = router;