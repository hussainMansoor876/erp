const path = require('path');
const routes = require('express').Router();
const modules = require('./modules');
routes.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'../../views/landing.html'))
    res.render('modules/index')
});
routes.use('/modules',modules);
module.exports = routes