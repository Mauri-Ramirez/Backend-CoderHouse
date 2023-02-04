const { Router } = require("express");
const router = Router(); // crear instancia del router
const ProductManager = require("../../manager/app");
const manager = new ProductManager(process.cwd() + "/src/products.json"); // devuelve la ruta  raiz "process cwd" del proyecto

//RUTAS

//GET ---> TRAE TODOS LOS PRODUCTOS

router.get("/", async (req, res) => {
    //console.log(process.cwd());
  const products = await manager.getProducts();
  console.log(products);
  console.log(manager);

  if (req.query.limit) {
    const limit = Number(req.query.limit);
    if (isNaN(limit)) {
      return res.status(400).send("debe ser un numero");
    }
    const limitProducts = products.slice(0, limit);
    res.json({
      status: "success",
      data: limitProducts,
    });
  } else {
    res.json({
      status: "success",
      data: products,
    });
  }
});



//GET ----> TRAE UN PRODUCTO POR SU ID

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const data = await manager.getProductById(pid);

  if (isNaN(pid)) {
    res.status(400).send("el id tiene que ser un numero");
  }

  if (data) {
    res.json({
      status: "success",
      data: data,
    });
  } else {
    res.status(400).send("invalid data");
  }
});


//POST ---> Agrega un producto al array de productos

router.post("/", async (req, res) =>{
  const product = req.body;
  if(
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.status ||
    !product.category ||
    !product.thumbnails
  ) {
    res.status(400).send("Todos los campos son obligatorios");
  }else{
    res.json({
      status: "succes",
      data: await manager.addProduct(product),
    });

  }
});


//PUT --->ACTUALIZAR POR LOS CAMPOS ENVIADOS DESDE EL BODY

router.put("/:pid", async (req, res) =>{
  const pid = Number(req.params.pid);
  const fieldToUpdate = req.body;
  const foundId = fieldToUpdate.hasOwnProperty("id");
  const data = await manager.updateProduct(pid, fieldToUpdate)
  console.log(data);

  if (foundId){
    res.status(400).send("no se puede modificar el id")
  }else{
    if(data){
      res.json({
        status: "succes",
        data: data
      });
    }else{
      res.status(400).send("no se encontro el producto")
    }
  }
});

// DELETE --->ELIMINA EL PRODUCTO CON EL ID INDICADO

router.delete("/:pid", async (req, res)=>{
  const pid = Number(req.params.pid);
  if(isNaN(pid)){
    res.status(400).send("debe ser un numero");
  }else{
    res.json({
      status: "succes",
      data: await manager.deleteProduct(pid),
    })
  }
})



module.exports = router;
