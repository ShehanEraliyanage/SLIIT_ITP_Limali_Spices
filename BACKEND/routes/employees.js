const router = require("express").Router();

let Employee = require("../models/Employee");
const branch = require('../controllers/branch');
const catchAsync = require('../utils/catchAsync');

//http://localhost:8090/employee/add
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const address =req.body.address;
    const email = req.body.email;
    const password = req.body.password;
    const age = Number(req.body.age);
    const gender =req.body.gender;
    const salary = Number(req.body.salary);
    const branch =req.body.branch;
    const empType = req.body.empType;
    const leaveTaken = req.body.leaveTaken;
    const status=0;


    const newEmployee = new Employee({

        name,
        address,
        email,
        password,
        age,
        gender,
        salary,
        branch,
        empType,
        leaveTaken,
        status

    })
    
    newEmployee.save().then(()=>{

        res.json("Employee added")
    
    }).catch((err)=>{
        console.log(err);
    })
})
//http://localhost:8090/employee/
router.route("/").get((req,res)=>{

    Employee.find().then((Employees)=>{
        res.json(Employees)
    }).catch((err)=>{
        console.log(err);
    })
})
//http://localhost:8090/employee/update/623c3d64894ce3fc19da6f45
router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {name,email,password,address,age, gender ,salary, branch,empType,leaveTaken} = req.body;//destructure

    const updateEmployee = {
        name,
        email,
        password,
        address,
        age,
        gender,
        salary,
        branch,
        empType,
        leaveTaken,    
    } 

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee).then(()=>{
            
        res.status(200).send({status: "user update"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with update data"})
    })

}) 
//http://localhost:8090/employee/delete/623c3d64894ce3fc19da6f45
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id; 

    await Employee.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "User Deleted"})
    }).catch((err)=>{
        res.status(500).send({status :"can't detele",error:err.message})
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    const user = await Employee.findById(userId).then((Employee) => {

        res.status(200).send({status:"user fetched",Employee})
    }).catch((err)=> {
        console.log(err.message );
        res.status(500).send({status:"error with get user", error: err.message})

    })
})

// router.route("/getBranches").get((req,res)=>{

//     Employee.find().then((branches)=>{
//         res.json(branches)
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

router.route("/getBranches").get(catchAsync(branch.getAllBranch));


//Get Student Queries Implemented By Isiwara For Branches Functions

router.route("/getPendingEmployers").post((req,res)=>{
    Employee.find({status:"0",branch:session.branch}).then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err);
    })
})
router.route("/getRejectedEmployers").post((req,res)=>{
    Employee.find({status:"2",branch:session.branch}).then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err);
    })
})
router.route("/getEnrolledEmployers").post((req,res)=>{

    Employee.find({status:"1",branch:session.branch}).then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err);
    })
})
router.route("/accept/:id").post(async (req,res)=>{
    let userId = req.params.id;
    const status =1;
    const updateEmployee = {
        status,
              
    } 

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee).then(()=>{
            
        res.status(200).send("Updated")
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Failed")
    })

}) 
router.route("/reject/:id").post(async (req,res)=>{
    let userId = req.params.id;
    const status =2;
    const updateEmployee = {
        status,
              
    } 

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee).then(()=>{
            
        res.status(200).send("Updated")
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Failed")
    })

}) 
router.route("/pending/:id").post(async (req,res)=>{
    let userId = req.params.id;
    const status =0;
    const updateEmployee = {
        status,
              
    } 

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee).then(()=>{
            
        res.status(200).send("Updated")
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Failed")
    })

}) 
//Implemented By Isiwara

//Any Employer Login
router.route("/login").post(async (req,res)=>{
    let inp_email = req.body.email;
    let inp_password=req.body.password;


    const email = await Employee.find({'email':inp_email})
    const password = await Employee.find({'password':inp_password})

    // console.log(email)
    // console.log(password)
if(email==''||password==''){
    res.send("User Authontication Failed");

}else{
    res.send("User Authenticated");
}
})
router.get("/authchecker", (req, res) => {
    if (session) {
      return res.json(session);
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  });
//Login According to The Role
router.route("/login-with-type").post(async (req,res)=>{
    let inp_email = req.body.email;
    let inp_password=req.body.password;
    let inp_userType=req.body.userType;


    const email = await Employee.find({'email':inp_email})
    const password = await Employee.find({'password':inp_password})
    const userType = await Employee.find({'empType':inp_userType})


if(email==''||password==''||userType==''){
    res.send(false);
    

}else{
    res.send("User Authenticated");
    session=req.session;
    session.email=req.body.email;
    session.userType=req.body.userType;
    email.forEach(function(data){
        session.branch=data.branch;
        session.name=data.name;
    })

    console.log(session);
}
}) 


//Implemented By Hirusha
router.route("/getDrivers").get((req,res)=>{
    Employee.find({empType:"Driver"}).then((employees)=>{
        res.send(employees);
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;