const router = require("express").Router();
let order = require("../models/order");



router.route("/add").post((req,res)=>{

    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    let sysDate = year + "-" + month + "-" + date;
    
        console.log(req.body);
        const orders = new order({
            item: req.body.item,
            quantity: req.body.quantity,
            order_date: sysDate,
            delivery_date: req.body.delivery_date,
            customer_id: req.body.customer_id,
            branch: req.body.branch,
            branch_status: req.body.branch_status,
            status: req.body.status,
            vehicle: req.body.vehicle
        });
    
        orders.save().then(()=>{
            res.json({status:true})
        }).catch((err)=>{
            res.json({status:false})
            console.log(err);
        })
 
});



router.route("/").get((req,res)=>{
    
    order.find().then((orders)=>{
        res.json(orders)
    }).catch ((err)=>{
        console.log(err);
    })

});


router.route("/getUserByOrderHistory").post((req,res)=>{
    order.find({customer_id : req.body.id}).then((orders)=>{
        res.json(orders)
    }).catch ((err)=>{
        console.log(err);
    })

}); 


router.route("/getUserByPurchaseHistory").post((req,res)=>{
    order.find({customer_id : req.body.id, status : "delivered"}).then((orders)=>{
        res.json(orders)
    }).catch ((err)=>{
        console.log(err);
    })

}); 



router.route("/update/:id").put(async(req,res)=>{
    let.userId = req.params.id;
        const {item,quantity,order_date } = req.body();

    const updateCustomer = {
        item,
        quantity,
        order_date,
    }

    const update = await order.findByIdAndUpdate(userId,updateOrder).then(()=>{
        res.status(200).send({ status :"Order Updated", user : "update"})
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/delete/:id").delete(async(req,res)=>{

    
    let userId = req.params.id; 

    await order.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "Order Deleted"})
        
    }).catch((err)=>{
        res.status(500).send({status :"can't detele",error:err.message})
    })
})



router.route("/delete").post(async(req,res)=>{
    console.log(req.body.id);

    await order.findByIdAndDelete(req.body.id).then(()=>{
        res.json({status:true})

    }).catch((err)=>{
        res.json({status:false})
        console.log(err);
    })
})

//Implemented By Hirusha
router.route("/getBranchConfirmPendingOrders").get((req,res)=>{
    order.find({ branch_status: "true", status:"pending" }).then((orders)=>{
        res.send(orders)
    }).catch ((err)=>{
        console.log(err);
    })
});

router.route("/getBranchConfirmProcessingOrders").get((req,res)=>{
    order.find({ branch_status: "true", status:"processing" }).then((orders)=>{
        res.send(orders)
    }).catch ((err)=>{
        console.log(err);
    })
});

router.route("/getBranchConfirmDeliveredOrders").get((req,res)=>{
    order.find({ branch_status: "true", status:"delivered" }).then((orders)=>{
        res.send(orders)
    }).catch ((err)=>{
        console.log(err);
    })
});

router.route("/addVehicleToOrder").post(async(req,res)=>{
    try {
        console.log(req);
        const orders = await order.findOneAndUpdate(
            {_id: req.body._id},
            {status: req.body.status,
             vehicle: req.body.vehicle,},
            {new: true}
        );
        if (orders) {
            res.send({
                status: true,
                details: vehicle
            });
        } else {
            res.send({
                status: false,
            });
        }
    } catch (error) {
        console.log(error.messaga)
    }
})

router.route("/confirmDelivered").post(async(req,res)=>{
    
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let sysDate = year + "-" + month + "-" + date;

    try {
        console.log(req);
        const orders = await order.findOneAndUpdate(
            {
                _id: req.body._id
            },
            {
                status: req.body.status,
                delivery_date: sysDate
            },
            {
                new: true
            }
        );

        if (orders) {
            res.send({
                status: true,
                details: vehicle
            });
        } else {
            res.send({
                status: false,
            });
        }

    } catch (error) {
        console.log(error.messaga)
    }
})

router.route("/vehicleDeliveryReport").post(async(req,res)=>{
    
    const orders = await order.find({delivery_date: {$gte: req.body.startDate ,$lt: req.body.endDate}, vehicle:req.body.vehicle});
    if (orders) {
        res.send({
            status: true,
            details: orders
        });
    } else {
        res.send({
            status: false,
        });
    }
})

//Implementaions of Isiwara

router.route("/accept/:id").post(async (req,res)=>{
    let id = req.params.id;
    console.log(id)
    const branch_status ="true";
    const updateOrderStatus = {
        branch_status,
               } 
    const update = await order.findByIdAndUpdate(id,updateOrderStatus).then(()=>{
            
        res.status(200).send("Updated")
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Failed")
    })

}) 
router.route("/getPendingOrders").post((req,res)=>{

    order.find({branch_status:"false"}).then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;
