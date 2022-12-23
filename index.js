const fs = require("fs")

class ProductManager { 
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo
    }

    async #leerUnArchivo(){
        try{
            const contenido = await fs.promises.readFile(this.rutaArchivo, "utf-8")
            const contenidoParseado = JSON.parse(contenido)
            return contenidoParseado
        } catch(error){
            console.log(error);
        }
    }

    async addProduct (obj){
        const contenidoArchivo = await this.#leerUnArchivo()
        if (contenidoArchivo.length !== 0){
            await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2), "utf-8")
        }else{
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{...obj, id: 1}]), "utf-8")
        }
    }

    async getProductById(id){
        try {
            const contenidoArchivo = await this.#leerUnArchivo()
            let idFound = contenidoArchivo.find((prod) => prod.id === id);
            //console.log(idFound);
          } catch (error) {
            throw new Error(error, "error al traer el producto con el id");
          }
    }

    async updateProduct(id, newPropiedades){
        
            const contenidoArchivo = await this.#leerUnArchivo()
            const foundProduct =  await this.getProductById(id)

            const update = {...foundProduct, ...newPropiedades}

            const updateElement = contenidoArchivo.map(e=>{
                if(e.id === update.id){
                    return update
                }else{
                    return e
                }
            })

            const stringProduct = await JSON.stringify(updateElement, null, "utf-8")
            await this.addProduct(stringProduct)
            return stringProduct
    }

    async deleteProduct (id){
        try {
            const contenidoArchivo = await this.#leerUnArchivo()
            const deleted = contenidoArchivo.filter((producto) => producto.id !== id);
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(deleted, null, 4));
            console.log('Deleted');
          } catch (error) {
            throw new Error(error, 'Error al eliminar producto por id');
          }

    }

    async getRandom(){
        try{
            const contenidoArchivo = await this.#leerUnArchivo()
            let productoRandom = contenidoArchivo[Math.floor(Math.random() * contenidoArchivo.length)]
            //return (productoRandom)
            console.log(productoRandom);
        }catch(error){
            throw new Error(error, 'Error al traer producto random');
        }
        
    }
    
    
    async getProducts () {
        const contenidoArchivo = await this.#leerUnArchivo()
        //console.log(contenidoArchivo);
        //return (contenidoArchivo);
        
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.rutaArchivo, []);
            console.log('Todos los productos borrados');
          } catch (error) {
            throw new Error(error, 'Error al eliminar todos los productos');
          }
        }





    }
        

    

    

const contenedor = new ProductManager("./productos.txt")
//contenedor.addProduct ({nombre: "producto 1", precio: "100", img:"imggggg"})

//contenedor.getProducts()
//contenedor.getProductById(3);
//contenedor.deleteProduct(5);
//contenedor.deleteAll();
//contenedor.getRandom();
contenedor.updateProduct(2, {price:2000})