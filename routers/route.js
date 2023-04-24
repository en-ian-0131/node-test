const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('<h1>/ of admin2</h1>');
})

router.get('/admin3/:account/:password',(req,res)=>{
    const {url,baseUrl ,originalUrl} = req;
    res.send({url,baseUrl ,originalUrl,params:req.params});
})



module.exports = router;