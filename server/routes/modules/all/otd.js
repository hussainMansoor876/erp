const otd = require('express').Router();
otd.get('/',(req,res)=>{
    res.render('modules/otd/index');
})


module.exports = otd;