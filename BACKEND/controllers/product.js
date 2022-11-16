let { Product , Production } = require("../models/product");
const { cloudinary} = require('../cloudinary');

module.exports.showProducts = async(req, res, next) => {
    Product.find().then((product)=>{
        res.send(product)
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports.createProduct = async(req, res, next) => {

    console.log(req.body);

    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = (req.body.quantity != null) && (Number(req.body.quantity));
    const description = req.body.description;
    const remarks = req.body.remarks;
    const imageUrl = [];
    const availability = req.body.availability;

    let newProduct = new Product({
        name,
        price,
        quantity,
        description,
        remarks,
        imageUrl,
        availability
    })

    for (const image in req.body.images) {
        // newProduct.imageUrl.push({ url: image.path, filename: image.filename })
    } 

    // newProduct.imageUrl = req.files.map(f => ({ url: f.path, filename: f.filename }));

    // newProduct.imageUrl = req.body.imageUrl.map(f => (imageUrl.push(f.path +  f.filename )));

    newProduct.imageUrl = req.files.map(f => ( f.path));

    newProduct = await newProduct.save().then(()=>{
        res.send(newProduct);
    }).catch((err)=>{
        console.log(err);
    })
};

module.exports.editProduct = async (req, res) => {
    console.log(req.body);
    let productId = req.params.id;
    const{price,quantity,remarks,availability}=req.body;

    oldProduct = await Product.findById(productId);
    const name = oldProduct.name;
    const description = oldProduct.description;
    const imageUrl = oldProduct.imageUrl;
    

    const updateProduct={
        name,
        price,
        quantity,
        description,
        remarks,
        imageUrl,
        availability
    }
    const update = await Product.findByIdAndUpdate(productId,updateProduct).then (async()=>{
        res.status(200).send({status: "Product updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
    console.log(update);
}   

module.exports.deleteProduct = async (req, res) => {
    let productId = req.params.id;
    console.log(productId);

    await Product.findByIdAndDelete(productId).then(()=>{
        res.status(200).send({status:"Product deleted"});
    }).catch((errr)=>{
        console.log(errr.message);
        res.status(500).send({status: "Error with delete product"})
    })
}

module.exports.showProduct = async (req, res) => {
    let productId = req.params.id;
    await Product.findById(productId).then((product)=>{
        // res.status(200).send({status: "Product fetched",product})
        res.status(200).send(product);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get product",error: err.message});
    })
}

module.exports.showProduction = async (req, res) => {
    Production.find().then((product)=>{
        res.send(product)
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports.createProduction = async (req, res) => {
    const product = req.body.product;
    const productName = req.body.productName;
    const production = req.body.production;
    const sold = req.body.sold;
    const cdate = Date.now();
    const date = new Date(cdate);
    const month = date.getMonth();
    const newProduction = new Production({
        productName,
        product,
        production,
        sold,
        date,
        month
    });
    await newProduction.save().then(()=>{
        res.json("Product Added")
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports.createDailyProduction = async (req, res) => {
    // console.log(req.body);
    const cdate = Date.now();
    const date = new Date(cdate);
    const month = date.getMonth(); 
    req.body.map(async (aproduct) => {
        const productName = aproduct.productName;
        const product = aproduct.name;
        let production = aproduct.value;
        let sold = 0;
        const newProduction = new Production({
            productName,
            product,
            production,
            sold,
            date,
            month
        });
        // console.log(newProduction);

        try {
            const a = await Production.find({productName : newProduction.productName, month : newProduction.month});
            // console.log(a)
            if (a.length === 0) {
                await newProduction.save();
            } else {
                production = parseInt(a[0].production) + parseInt(production);
                sold = a[0].sold;
                // console.log(a[0].id);
                newUpdatedProduction = {
                    productName,
                    product,
                    production,
                    sold,
                    date,
                    month
                }
                await Production.findByIdAndUpdate(a[0].id, newUpdatedProduction)
            }
            let getProduct = {};
            getProduct = await Product.findById(product);
            getProduct.quantity += parseInt(production);
            await Product.findByIdAndUpdate(product,getProduct)
        } catch (err) {
            console.log(err);
            res.status(500).send({status:"Error with updating data",error:err.message})
        }

    })

    res.status(200).send({status: "Product updated"})
}

module.exports.createDailySales = async (req, res) => {
    // console.log(req.body);
    const cdate = Date.now();
    const date = new Date(cdate);
    const month = date.getMonth(); 
    req.body.map(async (aproduct) => {
        const productName = aproduct.productName;
        const product = aproduct.name;
        let production = 0;
        let sold = aproduct.value;
        const newProduction = new Production({
            productName,
            product,
            production,
            sold,
            date,
            month
        });
        // console.log(newProduction);

        try {
            const a = await Production.find({productName : newProduction.productName, month : newProduction.month});
            // console.log(a)
            if (a.length === 0) {
                await newProduction.save();
            } else {
                sold = parseInt(a[0].sold) + parseInt(sold);
                production = a[0].production;
                if (sold > production) {
                    throw new Error("No enough stocks");
                    return;
                } else {
                    newUpdatedProduction = {
                        productName,
                        product,
                        production,
                        sold,
                        date,
                        month
                    }
                    await Production.findByIdAndUpdate(a[0].id, newUpdatedProduction)
                }
                
            }
            let getProduct = {};
            getProduct = await Product.findById(product);
            getProduct.quantity -= parseInt(sold);
            await Product.findByIdAndUpdate(product,getProduct)
        } catch (err) {
            console.log(err);
            res.status(500).send({status:"Error with updating data",error:err.message})
        }

    })

    res.status(200).send({status: "Product updated"})
}

module.exports.getMonthlyProduction = async (req, res) => {
    const month = req.params.id;
    const data = await Production.find({ month : month}).then((products) => {
        // console.log(products);
        res.status(200).send(products);
    })
}

