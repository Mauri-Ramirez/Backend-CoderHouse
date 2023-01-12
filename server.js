const express = require("express");
const app = express();
const PORT = 8080

const ProductManager = require("./index")
const productosTxt = new ProductManager("./productos.txt")


//2-estructura

app.get("/saludo", (req, res)=>{
   // res.status(200).json({mensje:"Hola con json"})
    res.status(200).send("Hola con send")
});

/* app.get("/products", async (req, res)=>{
    const producto = await productosTxt.getProducts()
    res.status(200).json(producto)
 }); */ 

 app.get("/products", async (req,res)=>{
     const products = await productosTxt.getProducts()
     const limit = Number(req.query.limit)
     if(limit){
         const limitProducts = products.slice(0, limit)
         res.send(limitProducts)
     }else{
         res.send(products)
     }
 })

app.get("/products/:pid", async (req,res)=>{
    const pid = Number(req.params.pid);
    const product = await productosTxt.getProductById(pid)
    if(!product){
        return res.status(404).send("product not found")
    }
    res.send(product)
    
})




//3-en marcha

app.listen(PORT,()=>{
    console.log("server corriendo");
})