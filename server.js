// importing modules//
const mongoose = require("mongoose");
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const sessions = require("express-session");
const bodyparser = require('body-parser');
const routes = require('./server/routes');
// importing modules end//
//importing models //
var User = require('./server/models/users');
var Project = require('./server/models/project');
// importing models end //
// configuring express app //
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(sessions({
    secret: 'ddfd344f4dud8d8d8d8j',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,"/views"));
app.listen(3000,()=>{
    console.log('server is started');
})
// configuring express app end//
// mongoose connection //
mongoose.connect("mongodb://rapshek:natsikap1@ds026898.mlab.com:26898/greeshams",{ useNewUrlParser: true  }, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connection with mongodb is successfull");
    }
});
// mongoose connection //
app.use('/',routes);
// get routes //
// app.get('/',(req,res)=>{
//     res.render('index');
// })
app.get('/get_users',async (req,res)=>{
    let users = await User.find();
    res.end(JSON.stringify(users))
});
app.get('/admin/previledges/:id/:pass',(req,res)=>{
    if(req.params.id === 'iqra' && req.params.pass === '1234')
    {
        res.render('previledge');
    }
    else{
        res.end('access denied');
    }
})
app.get('/push_user',async (req,res)=>{
    // let user = await new User({
    //     name:'Syed Iqra',
    //     username:'iqra',
    //     password:'1234',
    //     previledge:['hrm','tm','gp','ep']
    // }).save();
    // res.end(JSON.stringify(user))
})
// app.get('/module/ep',(req,res)=>{
//     res.render('ep');
// })
app.get('/landing',(req,res)=>{

})
// get routes end //
// post routes//
app.post('/admin/previledges/update_previledges',(req,res)=>{
let id = req.body.id;
let previledge =  JSON.parse(req.body.previledges) ;
User.findByIdAndUpdate(id,{$set:{previledge:previledge}},(err,user)=>{
res.json({success:true});
})
})
app.post('/module/ep',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({username:username},(err,user)=>{
        if(user===null)
        {
            res.end('user does not exist')
        }
        else{
            if(user.password===password)
            {
                if(user.previledge.indexOf('ep')!== -1)
                {
                    res.redirect('/module/ep');
                }
                else{
                    res.end('user does not have previledge to access this module');
 
                }
            }
            else{
                res.end("password does not match with user");
            }
        }
    })
})
// post routes end //