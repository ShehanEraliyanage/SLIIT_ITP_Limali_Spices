const router = require("express").Router();
let RealCustomer = require("../models/realCustomer");

router.route("/add").post((req,res)=>{

    console.log(req.body);
    
        const name = req.body.name;
        const email = req.body.email;
        const nic = req.body.nic;
        const contact_number = Number(req.body.contact_number);
        const address = req.body.address;
        const password = req.body.password;
        

        const newCustomer = new RealCustomer({
           
            name,
            email,
            nic,
            contact_number,
            address,
            password,
        })

        newCustomer.save().then(()=>{
            res.json("Customer added")
        }).catch((err)=>{
            console.log(err);
        })
});



router.route("/").get((req,res)=>{
    
    RealCustomer.find().then((customers)=>{
        res.json(customers)
    }).catch ((err)=>{
        console.log(err);
    })

});



router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
        const {name ,email,nic,contact_number,address,password } = req.body;

    const updateCustomer = {
        name,
        email,
        nic,
        contact_number,
        address,
        password,
    }

    const update = await RealCustomer.findByIdAndUpdate(userId,updateCustomer).then(()=>{
        res.status(200).send({ status :"User Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with update data"})
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId =req.params.id;

    await RealCustomer.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    const user = await RealCustomer.findById(userId).then((customer) => {
        
        res.status(200).send({status:"user fetched",customer})
    }).catch((err)=> {
        console.log(err.message );
        res.status(500).send({status:"error with get user", error: err.message})

    })
})
router.route("/getSelectedCustomer").post((req,res)=>{
    RealCustomer.find({_id : req.body.id}).then((RealCustomer)=>{
        res.json(RealCustomer)
    }).catch ((err)=>{
        console.log(err);
    })

}); 

module.exports = router;