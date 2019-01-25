const cot = require('express').Router();
cot.get('/',(req,res)=>{
    res.render('modules/cot/index');
})


module.exports = cot;