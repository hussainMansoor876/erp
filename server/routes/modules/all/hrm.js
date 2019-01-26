const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const hrm = require('express').Router();
const Employee = require('../../../models/employee');
const Leaves = require('../../../models/leaves_applications');
const Resignations = require('../../../models/resignation');

hrm.get('/',(req,res)=>{
    res.render('modules/hrm/index');
});

hrm.get('/add_employee',(req,res)=>{
    res.render('modules/hrm/add_employee');
});


hrm.get('/get_leaves_applications',(req,res)=>{
    Leaves.find({},(err,leaves)=>{
        res.json({leaves:leaves});
        res.end();
    })
   // res.render('modules/hrm/add_employee');
});

hrm.get('/add_resignation',(req,res)=>{
    new Resignations({
        employee_id:"32323232fggf",
        employee_name:"Waqas khan",
        dept:"Admin",
        designation:"Manager",
        reason:"move on to bigger org",
        read:false,
        status:0, // 0-> applied , 1->approved , -1->rejected
        active:true
    }).save(()=>{
        res.end('done');
    });
})

hrm.get('/get_resignations_info',(req,res)=>{
    Resignations.find({},(err,resignations)=>{
        res.json({resignations:resignations});
        res.end();
    })
   // res.render('modules/hrm/add_employee');
});

hrm.get('/employees_list',(req,res)=>{
    res.render('modules/hrm/employees_list');
});

hrm.get('/resignations_info',(req,res)=>{
    res.render('modules/hrm/resignations_info');

});

hrm.get('/leaves_applications',(req,res)=>{
    res.render('modules/hrm/leaves_applications');
});

hrm.post('/leaves_action',(req,res)=>{
    let id = req.body.id;
    let flag = req.body.flag;
    Leaves.findByIdAndUpdate(id,{$set:{status:flag}},(err,leave)=>{
        console.log(leave);
        res.json({success:true});
        res.end();
    })
})

hrm.post('/resignations_action',(req,res)=>{
    let id = req.body.id;
    let flag = req.body.flag;
    Resignations.findByIdAndUpdate(id,{$set:{status:flag}},(err,leave)=>{
        console.log(leave);
        res.json({success:true});
        res.end();
    })
})

hrm.post('/',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    Employee.findOne({name:username},(err,user)=>{
        if(user===null)
        {
            res.end('employee does not exist')
        }
        else{
            if(user.password===password)
            {
                if(user.previledge.indexOf('hrm')!== -1 ||  true)
                {   res.cookie('employee',JSON.stringify(user),{maxAge:1000*60*60*24});
                    res.redirect('/modules/hrm');
                }
                else{
                    res.end('employee does not have previledge to access this module');
 
                }
            }
            else{
                res.end("password does not match with user");
            }
        }
    })
})

hrm.post('/add_employee',(req,res)=>{
    let form = new formidable.IncomingForm();
      
    form.parse(req,(err,fields,files)=>{
        let obj = {};
        obj.name = fields.name;
        obj.father_name = fields.father_name;
        obj.cnic = fields.cnic;
        obj.father_cnic = fields.father_cnic;
        obj.address = fields.address;
        obj.city = fields.city;
        obj.email = fields.email;
        obj.telephone = fields.telephone;
        obj.mobile = fields.mobile;
        obj.ext = fields.ext;
        obj.religion = fields.religion;
        obj.age = fields.age;
        obj.marital_status = fields.marital_status;
        obj.education = fields.education;
        obj.experiences = fields.experience;
        obj.basic_salary = fields.basic_salary;
        obj.dept = fields.dept;
        obj.designation = fields.designation;
       // console.log(obj);
         let unique =  Math.floor((Math.random()*100000)+(Math.random()*100000));
         var oldpath = files.picture.path;
        var path_new =path.join("./public/assets/pictures/employees/picture_"+unique+"_"+files.picture.name);
        var db_path = path.join("./employees/picture_"+unique+"_"+files.picture.name);
        obj.picture = db_path;
        new Employee(obj).save(()=>{
            fs.copyFile(oldpath,path_new,(err)=>{
                if(err){
                    throw err
                }
                fs.unlink(oldpath,(err_4)=>{
                    if(err_4){
                        throw err_4
                    }
                    console.log(obj);
                    res.redirect('./add_employee')
                   
                })
            })
            
        });
    });
   
});

module.exports = hrm;