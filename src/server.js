const express = require("express");
const apiRoutes = require("./routes/app.routers")


const app = express();
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api", apiRoutes)


//3-en marcha

app.listen(PORT,()=>{
    console.log("server corriendo");
})