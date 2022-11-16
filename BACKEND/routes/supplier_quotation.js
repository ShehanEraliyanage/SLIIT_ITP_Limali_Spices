const router = require("express").Router();
let Supplier_quotation = require("../models/Supplier_quotation");

router.route("/add").post((req,res)=>{
  
    const item = req.body.item;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const supplier_id = req.body.supplier_id;
    

    const newSQuotation = new Supplier_quotation({
        item,
        price,
        quantity,
        supplier_id,
        status:"pending"
    })

    newSQuotation.save().then(()=>{
        res.json("Supplier Quotation Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/findbyid").post((req,res)=>{
    Supplier_quotation.find({supplier_id : req.body.id}).find({status:{$ne:"Deleted"}}).then((supplier_quotations)=>{
       
        res.json(supplier_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

// router.route("/findbyidd").post((req,res)=>{
//     Supplier_quotation.find({supplier_id : req.body.id}).find({status:"pending"}).then((supplier_quotations)=>{
       
//         res.json(supplier_quotations)
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

router.route("/getactivequotations").get((req,res)=>{
    Supplier_quotation.find({status:{$ne:"pending"}}).then((supplier_quotations)=>{
        res.json(supplier_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/printactivequotations").get((req,res)=>{
    Supplier_quotation.find({status:"Active"}).then((supplier_quotations)=>{
        res.json(supplier_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Supplier_quotation.find().then((supplier_quotations)=>{
        res.json(supplier_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/pendingsupplierquotations").get((req,res)=>{
    Supplier_quotation.find({status:"pending"}).then((supplier_quotations)=>{
        res.json(supplier_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let squotationId = req.params.id;
    const{item,price,quantity}=req.body;

    const updateSupplierQuotation={
        item,
        price,
        quantity
        

    }
    const update = await Supplier_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "supplier quotation updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

router.route("/setactivesuppierq/:id").put(async(req,res)=>{
    let squotationId = req.params.id;


    const updateSupplierQuotation={
       
        status:"Active"

    }
    const update = await Supplier_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "supplier quotation updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

//webdecline
router.route("/setdeclinesuppierq/:id").put(async(req,res)=>{
    let squotationId = req.params.id;


    const updateSupplierQuotation={
       
        status:"Declined"

    }
    const update = await Supplier_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "supplier quotation updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

//appdecline
router.route("/setdeclinesuppierqa").post(async(req,res)=>{
    let squotationId = req.body.id;


    const updateSupplierQuotation={
       
        status:"Deleted"

    }
    const update = await Supplier_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "updated"})
        
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

router.route("/delete/:id").delete(async(req,res)=>{
    let squotationId = req.params.id;

    await Supplier_quotation.findByIdAndDelete(squotationId).then(()=>{
        res.status(200).send({status:"Supplier quotation deleted"});
    }).catch((errr)=>{
        console.log(errr.message);
        res.status(500).send({status: "Error with delete supplier quotation"})
    })
    
})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await Supplier.findById(userId).then((supplier)=>{
        res.status(200).send({status: "User fetched",supplier})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })
})

module.exports = router;
