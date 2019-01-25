const fam = require('express').Router();
fam.get('/',(req,res)=>{
    res.render('modules/fam/index');
})


module.exports = fam;