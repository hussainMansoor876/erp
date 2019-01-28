const modules = require('express').Router();
const ep = require("./all/ep");
const cot = require("./all/cot");
const fam = require("./all/fam");
const gp = require("./all/gp");
const hrm = require("./all/hrm");
const opm = require("./all/opm");
const otd = require("./all/otd");
const pmc = require("./all/pmc");
const tm = require("./all/tm");
const Applicants = require('../../models/applicants');
const Notifications = require('../../models/notifications');
const Employees = require('../../models/employee');
const Leaves = require('../../models/leaves_applications');

//const all = require('./all');

//modules.use(auth)
modules.get('/get_notifications',(req,res)=>{
   let employee = JSON.parse(req.cookies.employee);
   console.log(employee.dept)
   Notifications.find({to:employee.dept},(err,notifications)=>{
       res.json({notifications:notifications});
       res.end();
   })
});
modules.get('/get_applicants',(req,res)=>{
    console.log('all_applicants');
    Applicants.find({},(err,applicants)=>{
        res.json({applicants:applicants});
        res.end();
    })
   // res.render('modules/hrm/add_employee');
 });
modules.get('/get_employees',(req,res)=>{
   console.log('all_employees');
   Employees.find({},(err,employees)=>{
       res.json({employees:employees});
       res.end();
   })
  // res.render('modules/hrm/add_employee');
});
modules.get('/get_leaves_applications',(req,res)=>{
   Leaves.find({},(err,leaves)=>{
       res.json({leaves:leaves});
       res.end();
   })
  // res.render('modules/hrm/add_employee');
});
modules.get('/',(req,res)=>{
   res.redirect('/');
});

modules.use('/cot',cot);
modules.use('/ep',ep);
modules.use('/fam',fam);
modules.use('/gp',gp);
modules.use('/hrm',hrm);
modules.use('/opm',opm);
modules.use('/otd',otd);
modules.use('/pmc',pmc);
modules.use('/tm',tm);



module.exports = modules;