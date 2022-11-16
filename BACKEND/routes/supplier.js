const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let Supplier = require("../models/Supplier");

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const nic = req.body.nic;
    const contactno = Number(req.body.contactno);
    const address = req.body.address;
    const password = req.body.password;
   

    const newSupplier = new Supplier({
        
       
        name,
        email,
        nic,
        contactno,
        address,
        password,
        status:"pending"
    })

    newSupplier.save().then(()=>{
        res.json("Supplier Added")
    }).catch((err)=>{
        console.log(err);
    })
})

// //GET SCHEDULE
// router.get("/:id", async(req, res) => {
//     try {
//         const sup = await Supplier.findOne({'_id':req.params.id});
//         res.status(200).json(sup);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })



router.route("/").get((req,res)=>{
    Supplier.find().then((supplier)=>{
        res.json(supplier)
    }).catch((err)=>{
        console.log(err);
    })
}) 

router.route("/pendingrequests").get((req,res)=>{
    Supplier.find({status:"pending"}).then((supplier)=>{
        res.json(supplier)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/activesuppliers").get((req,res)=>{
    Supplier.find({status:"Active"}).then((supplier)=>{
        res.json(supplier)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const{name,email,nic,contactno,address,password}=req.body;

    const updateSupplier={
        name,
        email,
        nic,
        contactno,
        address,
        password
        
    }
    const update = await Supplier.findByIdAndUpdate(userId,updateSupplier).then(()=>{
        res.status(200).send({status: "user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
    
 
})
//setactive

router.route("/setactivesuppierq/:id").put(async(req,res)=>{
    let userId = req.params.id;
    

    const updateSupplierR={
        status:"Active"
        
    }
    const update = await Supplier.findByIdAndUpdate(userId,updateSupplierR).then(()=>{
        res.status(200).send({status: "user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
    
 
})

//set declined

router.route("/setdeclinesuppierq/:id").put(async(req,res)=>{
    let userId = req.params.id;
    

    const updateSupplierR={
        status:"Declined"
        
    }
    const update = await Supplier.findByIdAndUpdate(userId,updateSupplierR).then(()=>{
        res.status(200).send({status: "user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
    
 
})

//delete

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Supplier.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((errr)=>{
        console.log(errr.message);
        res.status(500).send({status: "Error with delete user"})
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

// router.route("/checkemail").post(async(req,res)=>{
    
//     const newSupplier2 = new Supplier({
        
       
       
//         name : req.body.name,
//         email : req.body.email,
//         nic : req.body.nic,
//         contactno : Number(req.body.contactno),
//         address : req.body.address,
//         password : req.body.password
       
//     })


//     Supplier.find({email:newSupplier2.email}).then((supplier)=>{
//         console.log(supplier.email);
//         if(supplier==null){
//             res.status(200).send()
//         }else{
//             res.status(400).send()
//         }
        
//     }).catch((err)=>{
       
//         console.log(err);
//     })


// })


router.route("/checkemail").post((req,res)=>{
    const Email=req.body.email;
    Supplier.find({email:Email}).then((supplier)=>{
        console.log(supplier)

        if(supplier==""){
            res.status(200).send()
        }else{
            res.status(400).send()
        }
      
        
    }).catch((err)=>{
        console.log(err);
        res.status(400).send()
    })
})


router.route("/login").post((req,res)=>{
    const Email=req.body.email;
    const Password =req.body.password;
    Supplier.find({email:Email,password:Password}).then((supplier)=>{
       
        
        if(supplier==""){
            res.status(400).send()
        }else{
            res.status(200).send(supplier);
        }

        
      
        
    }).catch((err)=>{
        console.log(err);
        res.status(500).send()
    })
})

router.route("/findbyemail").post((req,res)=>{
    Supplier.find({email : req.body.id}).then((supplier)=>{
       
        res.json(supplier)
    }).catch((err)=>{
        console.log(err);
    })
})

//appsupplierupdate
router.route("/supplierupdate").post(async(req,res)=>{
    let supplier_id = req.body.id;
    

    const updateSupplier={
       
        name:req.body.name,
        nic:req.body.nic,
        contactno:req.body.contactno,
        address:req.body.address,
        password:req.body.password


    }
    const update = await Supplier.findByIdAndUpdate(supplier_id,updateSupplier).then(()=>{
        res.status(200).send({status: "updated"})
        
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

module.exports = router;
