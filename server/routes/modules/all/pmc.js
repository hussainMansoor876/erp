const pmc = require('express').Router();
pmc.get('/',(req,res)=>{
    res.render('modules/pmc/index');
})


module.exports = pmc;