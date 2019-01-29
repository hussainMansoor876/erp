const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const hrm = require('express').Router();
const Employee = require('../../../models/employee');
const Labour = require('../../../models/labour');
const Leaves = require('../../../models/leaves_applications');
const Applicants = require('../../../models/applicants');
const Resignations = require('../../../models/resignation');
const Notifications = require('../../../models/notifications');
var auth = function (req, res, next) {

    if (req.cookies.employee) {
        console.log("employee data", req.cookies.employee)
        next();
    }
    else {
        res.redirect('/');
    }

    // console.log(req.cookies);

};

hrm.post('/add_applicant', (req, res) => {
    console.log("check");
    let applicant = JSON.parse(req.body.applicant);
    console.log(applicant);
    new Applicants(applicant).save(()=>{
        res.json({success:true});
        res.end();
    });
})
hrm.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    Employee.findOne({ name: username }, (err, user) => {
        if (user === null) {
            res.end('employee does not exist')
        }
        else {
            if (user.password === password) {
                if (user.previledge.indexOf('hrm') !== -1 || true) {
                    res.cookie('employee', JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24 });
                    res.redirect('/modules/hrm');
                }
                else {
                    res.end('employee does not have previledge to access this module');

                }
            }
            else {
                res.end("password does not match with user");
            }
        }
    })
})
hrm.use(auth);
hrm.get('/', (req, res) => {
    res.render('modules/hrm/index');
});
hrm.get('/appointment_letter', (req, res) => {
    res.render('modules/hrm/appointment_letter');
});
hrm.get('/contract_letter', (req, res) => {
    res.render('modules/hrm/contract_letter');
});
hrm.get('/nda_letter', (req, res) => {
    res.render('modules/hrm/nda_letter');
});
hrm.get('/ec_letter', (req, res) => {
    res.render('modules/hrm/emergency_contact_letter');
});
hrm.get('/confirmation_letter', (req, res) => {
    res.render('modules/hrm/confirmation_letter');
})
hrm.get('/add_employee', (req, res) => {
    res.render('modules/hrm/add_employee');
});
hrm.get('/add_labour', (req, res) => {
    res.render('modules/hrm/add_labour');
});
hrm.get('/add_applicant', (req, res) => {
    res.render('modules/hrm/add_applicant');
})

hrm.get('/add_resignation', (req, res) => {
    new Resignations({
        employee_id: "32323232fggf",
        employee_name: "Waqas khan",
        dept: "Admin",
        designation: "Manager",
        reason: "move on to bigger org",
        read: false,
        status: 0, // 0-> applied , 1->approved , -1->rejected
        active: true
    }).save(() => {
        res.end('done');
    });
})

hrm.get('/get_resignations_info', (req, res) => {
    Resignations.find({}, (err, resignations) => {
        res.json({ resignations: resignations });
        res.end();
    })
    // res.render('modules/hrm/add_employee');
});

hrm.get('/employees_list', (req, res) => {
    res.render('modules/hrm/employees_list');
});

hrm.get('/resignations_info', (req, res) => {
    res.render('modules/hrm/resignations_info');

});

hrm.get('/leaves_applications', (req, res) => {
    res.render('modules/hrm/leaves_applications');
});

hrm.post('/leaves_action', (req, res) => {
    let id = req.body.id;
    let flag = req.body.flag;
    Leaves.findByIdAndUpdate(id, { $set: { status: flag } }, (err, leave) => {
        console.log(leave);
        res.json({ success: true });
        res.end();
    })
})

hrm.post('/resignations_action', (req, res) => {
    let id = req.body.id;
    let flag = req.body.flag;
    Resignations.findByIdAndUpdate(id, { $set: { status: flag } }, (err, leave) => {
        console.log(leave);
        res.json({ success: true });
        res.end();
    })
})

hrm.post('/add_labour', (req, res) => {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let obj = {};
        obj.name = fields.name;
        obj.father_name = fields.father_name;
        obj.cnic = fields.cnic;
        obj.address = fields.address;
        obj.email = fields.email;
        obj.telephone = fields.telephone;
        obj.mobile = fields.mobile;
        obj.age = fields.age;
        obj.marital_status = fields.marital_status;
        obj.basic_salary = fields.basic_salary;
        obj.reference = fields.reference;
        // new Notifications({
        //     title: 'Orientation and training',
        //     detail: 'New employee named ' + obj.name + ' joined in ' + obj.dept + ' department , please take his orientation',
        //     from: 'HR',
        //     to: obj.dept
        // }).save();
        console.log(obj);
        let unique = Math.floor((Math.random() * 100000) + (Math.random() * 100000));
        var oldpath = files.picture.path;
        var path_new = path.join("./public/assets/pictures/labours/picture_" + unique + "_" + files.picture.name);
        var db_path = path.join("./labours/picture_" + unique + "_" + files.picture.name);
        obj.picture = db_path;
        new Labour(obj).save(() => {
            fs.copyFile(oldpath, path_new, (err) => {
                if (err) {
                    throw err
                }
                fs.unlink(oldpath, (err_4) => {
                    if (err_4) {
                        throw err_4
                    }
                    console.log(obj);
                    res.redirect('./add_labour')

                })
            })

         });
    });

});


hrm.post('/add_employee', (req, res) => {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let obj = {};
        obj.name = fields.name;
        obj.father_name = fields.father_name;
        obj.cnic = fields.cnic;
        obj.address = fields.address;
        obj.city = fields.city;
        obj.email = fields.email;
        obj.telephone = fields.telephone;
        obj.mobile = fields.mobile;
        obj.ext = fields.ext; 
        obj.dob = fields.dob;
        obj.ntn = fields.ntn;
        obj.division = fields.division; 
        obj.dl_number = fields.dl_number;
        obj.dl_expiry = fields.dl_expiry;
        obj.pp_number = fields.pp_number;
        obj.pp_expiry = fields.pp_expiry;
        obj.bg = fields.bg;
        obj.doi = fields.doi;
        obj.section = fields.section; 
        obj.e_code = fields.e_code; 
        obj.a_hr = fields.a_hr;
        obj.a_lunch = fields.a_lunch;
        obj.a_mobile = fields.a_mobile;
        obj.a_transport = fields.a_transport;
        obj.d_tax = fields.d_tax;
        obj.d_retention = fields.d_retention;
        obj.d_sales = fields.d_sales;
        obj.a_package = fields.a_package;
        obj.hpw = fields.hpw;
        obj.w_b = fields.w_b;
        obj.p_e = fields.p_e;
        obj.reference = fields.reference;
        obj.marital_status = fields.marital_status;
        obj.education = fields.education;
        obj.experiences = fields.experience;
        obj.basic_salary = fields.basic_salary;
        obj.dept = fields.dept;
        obj.designation = fields.designation;
        new Notifications({
            title: 'Orientation and training',
            detail: 'New employee named ' + obj.name + ' joined in ' + obj.dept + ' department , please take his orientation',
            from: 'HR',
            to: obj.dept
        }).save();
        // console.log(obj);
        let unique = Math.floor((Math.random() * 100000) + (Math.random() * 100000));
        var oldpath = files.picture.path;
        var path_new = path.join("./public/assets/pictures/employees/picture_" + unique + "_" + files.picture.name);
        var db_path = path.join("./employees/picture_" + unique + "_" + files.picture.name);
        obj.picture = db_path;
        new Employee(obj).save(() => {
            Applicants.findOneAndDelete({cnic:obj.cnic},(err)=>{
                if(err){
                    throw err;
                }
                console.log('applicant is deleted');
            });
            fs.copyFile(oldpath, path_new, (err) => {
                if (err) {
                    throw err
                }
                fs.unlink(oldpath, (err_4) => {
                    if (err_4) {
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