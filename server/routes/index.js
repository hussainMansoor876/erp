const path = require('path');
const routes = require('express').Router();
const modules = require('./modules');
routes.get('/',(req,res)=>{

    res.render('modules/index')
});
routes.get('/logout',(req,res)=>{

    res.clearCookie("employee");
    res.redirect("/");
});
routes.use('/modules',modules);
module.exports = routes