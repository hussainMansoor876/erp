const gp = require('express').Router();
gp.get('/',(req,res)=>{
    res.render('modules/gp/index');
})


module.exports = gp;