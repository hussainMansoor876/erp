const opm = require('express').Router();
opm.get('/',(req,res)=>{
    res.render('modules/opm/index');
})


module.exports = opm;