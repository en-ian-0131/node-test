if(process.argv[2] && process.argv[2]==='production'){
    require('dotenv').config({
        path:'./production.env'
    })
}else{
    require('dotenv').config({
        path:'./dev.env'
    })
}

const express = require("express");
const server = express();
const multer = require('multer')
const upload = require('./module/upload-img')
// const upload = multer({dest: 'nodeUpload/'})
const session = require('express-session')

server.set("view engine","ejs")


server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use((req,res,next)=>{
    res.locals.title = "Ian的網站"
    next();
})
server.use(session({
    saveUninitialized:false,
    resave:false,
    secret:'nlrjviljfljnkjmsdo623gb3g3n2t32b',
    cookie:{
        maxAge:120_000
    }
}))


server.get("/",(req,res)=>{
    // res.send("<h1>Hello world~</h1>");
    res.locals.title = '首頁-' + res.locals.title;
    res.render("main",{name: 'Ian'})
})

server.get("/sales-json",(req,res)=>{
    const sales = require(__dirname + "/data/sales.json")
    // res.json(sales)
    res.render("sales-json",{sales,title:'業務員資料'})
})


// const urlEncoded = express.urlencoded({extended:false})
server.post('/try-post',(req,res)=>{
    res.send({
        query:req.query,
        body:req.body
    });
})


server.use('/admin2',require('./routers/route'))


server.get('/admin2/:account/:password',(req,res)=>{
    res.send(req.params);
})


server.get('/try-post-form',(req,res)=>{
    // res.render('try-post-form',{account:'',password:''});
    res.render('try-post-form');
})
server.post('/try-post-form',(req,res)=>{
    // res.json(req.body);
    res.render('try-post-form',req.body);
})
server.post('/try-upload',upload.single('avatar'),(req,res)=>{
    res.json({
        body:req.body,
        file:req.file,
    });
})
server.get('/try-sess',(req,res)=>{
    req.session.mySeesion = req.session.mySeesion || 0;
    req.session.mySeesion++;
    res.json(req.session);
})





server.use(express.static("public"))
server.use(express.static('node_modules/bootstrap/dist'))



server.use((req,res)=>{
    res.status(404).send(`<h1>404 找不到頁面</h1> <img src="./imgs/12345.jpeg" />`)
})

const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`伺服器${port}正常啟動`);
})