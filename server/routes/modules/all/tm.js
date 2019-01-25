const Employee = require('../../../models/employee');
const tm = require('express').Router();
tm.get('/',(req,res)=>{
    res.render('modules/tm/index');
})
tm.get('/task_assignment',(req,res)=>{
    res.render('modules/tm/task_assignment');
})
tm.get('/get_employees',(req,res)=>{
    Employee.find({},(err,employees)=>{
        res.json({employees:employees});
        res.end();
    })
})
tm.post('/task_assignment',(req,res)=>{
    console.log(JSON.stringify(req.body));
})
tm.post('/',(req,res)=>{
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
                if(user.previledge.indexOf('tm')!== -1 ||  true)
                {   res.cookie('employee',JSON.stringify(user),{maxAge:1000*60*60*24});
                    res.redirect('/modules/tm');
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

module.exports = tm;