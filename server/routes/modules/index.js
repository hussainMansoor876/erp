const modules = require('express').Router();
const ep = require("./all/ep");
const cot = require("./all/cot");
const fam = require("./all/fam");
const gp = require("./all/gp");
const hrm = require("./all/hrm");
const opm = require("./all/opm");
const otd = require("./all/otd");
const pmc = require("./all/pmc");
const tm = require("./all/tm");

//const all = require('./all');
modules.get('/',(req,res)=>{
   res.render('modules/index');
});
modules.use('/cot',cot);
modules.use('/ep',ep);
modules.use('/fam',fam);
modules.use('/gp',gp);
modules.use('/hrm',hrm);
modules.use('/opm',opm);
modules.use('/otd',otd);
modules.use('/pmc',pmc);
modules.use('/tm',tm);


module.exports = modules;