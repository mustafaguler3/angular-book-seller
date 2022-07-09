const express = require("express")
const app = express();


const root = __dirname + "/dist/angular-book-seller";

app.use("*",(req,res)=>{
    res.sendFile("index.html",{root:root})
})

app.listen(process.env.PORT || 8001);