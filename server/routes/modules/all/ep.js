const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const Notifications = require('../../../models/notifications');
var User = require('../../../models/users');
const Employee = require('../../../models/employee');
const Leaves = require('../../../models/leaves_applications');
const Resignations = require('../../../models/resignation');
const ep = require('express').Router();
ep.get('/', (req, res) => {
    res.render('modules/ep/index');
});
ep.get('/employee_info', (req, res) => {
    res.render('modules/ep/employee_info');
});

ep.get('/resignation', (req, res) => {
    res.render('modules/ep/resignation');
});
ep.get('/leaves_status', (req, res) => {
    res.render('modules/ep/leaves_status');
})

ep.get('/short_leave', (req, res) => {
    res.render('modules/ep/short_leave');
})

ep.get('/get_loggedin_employee', (req, res) => {
    let id = JSON.parse(req.cookies.employee)._id
    Employee.findById(id, (err, employee) => {
        console.log(employee);
        res.json({
            employee: employee
        });
        res.end();
    })

})
ep.post('/apply_for_resignation', (req, res) => {
    let employee = JSON.parse(req.cookies.employee);
    let obj = {};
    obj.reason = req.body.reason;
    obj.date = req.body.date;
    obj.employee_id = employee._id;
    obj.employee_name = employee.name
    obj.dept = employee.dept;
    obj.designation = employee.designation;
    new Resignations(obj).save(() => {
        res.redirect('./resignation');
    })
})
ep.post('/apply_for_leave',(req, res) => {
    let employee = JSON.parse(req.cookies.employee);
    let form = new formidable.IncomingForm();
    // console.log('form',form)

    form.parse(req, (err, fields, files) => {
        let obj = {};
        obj.title = fields.title;
        obj.detail = fields.detail;
        obj.employee_id = employee._id;
        obj.employee_name = employee.name
        obj.dept = employee.dept;
        obj.sl = fields.sl ? 1 : 0;
        obj.cl = fields.cl ? 1 : 0;
        obj.date = fields.date;
        obj.days = fields.days;
        obj.designation = employee.designation;
        //  obj.dates = JSON.parse(fields.dates);
        // console.log('fields', fields);
        if (files.file.name !== "") {
            let unique = Math.floor((Math.random() * 100000) + (Math.random() * 100000));
            var oldpath = files.file.path;
            var path_new = path.join("./public/assets/docs/leaves/doc_" + unique + "_" + files.file.name);
            var db_path = path.join("./docs/leaves/doc_" + unique + "_" + files.file.name);
            fs.copyFile(oldpath, path_new, (err) => {
                if (err) {
                    throw err
                }
                fs.unlink(oldpath, (err_4) => {
                    if (err_4) {
                        throw err_4
                    }
                    // console.log(obj);

                })
            })

        }
        obj.file = db_path;
        obj.el = obj.days - obj.sl - obj.cl
        var cl, sl;
        // console.log('num',num)
        console.log('num',obj)      
        Employee.findById(employee._id, {cl: 1,sl: 1,el: 1})
        .then((res)=>{
            console.log('emp',res)
            if(res.el > obj.el){
                Employee.findOneAndUpdate({_id: employee._id},{cl: res.cl - obj.cl,sl: res.sl - obj.sl,el: res.el - obj.el})
                .then((respo)=>{
                    console.log('Hello',respo)
                })
                .catch(error => {
                    console.log(error)
                })
            }
            else{
                cl = obj.el - res.el
                if(res.cl > cl){
                    Employee.findOneAndUpdate({_id: employee._id},{cl: res.cl - obj.cl - cl,sl: res.sl - obj.sl,el: 0})
                    .then((respo)=>{
                        console.log('Hello',respo)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                else{
                    sl = cl - res.cl + obj.cl
                    cl = cl - sl
                    Employee.findOneAndUpdate({_id: employee._id},{cl: res.cl - obj.cl - cl,sl: res.sl - obj.sl - sl,el: 0})
                    .then((respo)=>{
                        console.log('Hello',respo)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            }
            // Employee.findByIdAndUpdate(employee._id,{cl: res.cl - obj.cl,sl: res.sl - obj.sl,el: res.el - obj.el})
            // .then((respo)=>{
            //     console.log('Hello',respo)
            // })
            // .catch(error => {
            //     console.log(error)
            // })
        })
        .catch(err=>{
            console.log(err)
        })
        new Leaves(obj).save(() => {
            res.redirect('./leaves_status');

        });

    });
})

ep.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    Employee.findOne({
        name: username
    }, (err, user) => {
        if (user === null) {
            res.end('employee does not exist')
        } else {
            if (user.password === password) {
                if (user.previledge.indexOf('ep') !== -1 || true) {
                    res.cookie('employee', JSON.stringify(user), {
                        maxAge: 1000 * 60 * 60 * 24
                    });
                    res.redirect('/modules/ep');
                } else {
                    res.end('employee does not have previledge to access this module');

                }
            } else {
                res.end("password does not match with user");
            }
        }
    })
})

module.exports = ep;