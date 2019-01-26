const path = require('path');
const routes = require('express').Router();
const modules = require('./modules');
routes.get('/',(req,res)=>{

    res.render('modules/index')
});
routes.use('/modules',modules);
module.exports = routes