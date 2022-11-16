const router = require("express").Router();
let Inquiry = require("../models/CustomerInquiry");

router.route("/add").post((req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
   

    const newInquiry = new Inquiry({
       title,
       description,
       answer:"pending",
       status:"pending"
    })

    newInquiry.save().then(()=>{
        res.json("Inquiry Added")
    }).catch((err)=>{ 
        console.log(err);


    })
    
})

router.route("/").get((req,res)=>{
    Inquiry.find().then((CustomerInquiry)=>{
        res.json(CustomerInquiry)
    }).catch((err)=>{
        console.log(err);
    })
})




router.route("/update/:id").put(async(req,res)=>{
    let Id = req.params.id;
    const{title,description}=req.body;

    const updateInquiry={
       title,
       description
    }
    const update = await Inquiry.findByIdAndUpdate(Id,updateInquiry).then(()=>{
        res.status(200).send({status: "Inquiry updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
 
})

router.route("/get/:id").get(async (req, res) => {
    let Id = req.params.id;
    await Inquiry.findById(Id)
    .then((CustomerInquiry) => {
        res.json(CustomerInquiry);
       
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with fetching Inquiry",error:err.message});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let Id = req.params.id;

    await Inquiry.findByIdAndDelete(Id).then(()=>{
        res.status(200).send({status:"Inquiry deleted"});
    }).catch((errr)=>{
        console.log(errr.message);
        res.status(500).send({status: "Error with delete inquiry"})
    })
    
})



module.exports = router;

