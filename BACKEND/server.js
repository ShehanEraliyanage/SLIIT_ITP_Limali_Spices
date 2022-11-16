const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URL=process.env.MONGODB_URL;

mongoose.connect(URL,{
  
   useNewUrlParser:true,
   useUnifiedTopology:true,

}); 

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB Connected");
});

//Creating A Session

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


const supplierRouter = require("./routes/supplier.js");
const supplierQuotationRouter = require("./routes/supplier_quotation.js");
const purchaseQuotationRouter = require("./routes/purchase_quotation.js");
const customerRouter = require("./routes/customers.js");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/orders.js");
const EmployeeRouter = require("./routes/employees.js");
const CustomerInquiryRouter = require("./routes/CustomerInquiry.js");
const SupplierInquiryRouter = require("./routes/SupplierInquiry.js");
const branchRouter = require("./routes/branch.js");
const rawMaterialRouter=require("./routes/raw_materials.js");
const vehicle=require("./routes/vehicle");
const realCustomerRouter = require("./routes/realCustomers.js");


app.use("/CustomerInquiry",CustomerInquiryRouter);
app.use("/SupplierInquiry",SupplierInquiryRouter);
app.use("/employee",EmployeeRouter);
app.use("/supplier",supplierRouter);
app.use("/supplierquotation",supplierQuotationRouter);
app.use("/purchasequotation",purchaseQuotationRouter);
app.use("/customers",customerRouter);
app.use("/order",orderRouter);
app.use("/product", productRouter);
app.use("/branch",branchRouter);
app.use("/raw-material",rawMaterialRouter);
app.use("/vehicle",vehicle);
app.use("/realCustomer",realCustomerRouter)

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})


