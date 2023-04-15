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

server.set("view engine","ejs")


server.get("/",(req,res)=>{
    // res.send("你好~");
    res.render("main",{name: 'Ian'})
})

//根目錄要用express.static()
server.use(express.static("public"))
server.use(express.static("node_modules/bootstrap/dist"))


server.use((req,res)=>{
    res.status(404).send(`<h1>找不到頁面</h1><p>404</p><img src="/imgs/12345.jpeg"/>`)
})

const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`伺服器正常啟動:${port}`);
})