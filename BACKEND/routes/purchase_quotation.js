const router = require("express").Router();
let Purchase_quotation = require("../models/Purchase_quotation");

router.route("/add").post((req,res)=>{
  
    const item = req.body.name;
    const price = Number(req.body.unitPrice);
    const quantity = Number(req.body.quantity);
    const supplier_id = req.body.supplier;
    

    const newSQuotation = new Purchase_quotation({
        item,
        price,
        quantity,
        supplier_id:"pending",
        status:"pending"
    })

    newSQuotation.save().then(()=>{
        res.json("Supplier Quotation Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Purchase_quotation.find().then((purchase_quotations)=>{
        res.json(purchase_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/getpendingrequest").get((req,res)=>{
    Purchase_quotation.find({status:"pending"}).then((purchase_quotations)=>{
        res.json(purchase_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/gethistory").get((req,res)=>{
    Purchase_quotation.find({status:{$ne:"pending"}}).then((purchase_quotations)=>{
        res.json(purchase_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/getacceptrequest").post((req,res)=>{
    Purchase_quotation.find({status:"Accepted"}).then((purchase_quotations)=>{
        res.json(purchase_quotations)
    }).catch((err)=>{
        console.log(err);
    })
})

//webdecline
router.route("/setdecline/:id").put(async(req,res)=>{
    let squotationId = req.params.id;


    const updateSupplierQuotation={
       
        status:"Declined"

    }
    const update = await Purchase_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "supplier quotation updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

//webactive
router.route("/setaccept/:id").put(async(req,res)=>{
    let squotationId = req.params.id;


    const updateSupplierQuotation={
       
        status:"Accepted"

    }
    const update = await Purchase_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "supplier quotation updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

//webdelete
router.route("/setdelete/:id").put(async(req,res)=>{
    let squotationId = req.params.id;


    const updateSupplierQuotation={
       
        status:"Deleted"

    }
    const update = await Purchase_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "supplier quotation updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

//appactive
router.route("/setactive").post(async(req,res)=>{
    let squotationId = req.body.id;
    let supId = req.body.sid;
   

    const updateSupplierQuotation={
       
        status:"Active",
        supplier_id:supId

    }
    const update = await Purchase_quotation.findByIdAndUpdate(squotationId,updateSupplierQuotation).then(()=>{
        res.status(200).send({status: "updated"})
        
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})



module.exports = router;
