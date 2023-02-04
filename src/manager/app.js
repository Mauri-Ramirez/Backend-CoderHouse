const fs = require("fs")

class ProductManager { 
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo
    }

    async #leerUnArchivo(){
        try{
            const contenido = await fs.promises.readFile(this.rutaArchivo, "utf-8")
            //console.log(contenido);
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
    
    async getProducts () {
        const contenidoArchivo = await this.#leerUnArchivo()
        //console.log(contenidoArchivo);
        return (contenidoArchivo);
        
    }

    async getProductById(id){
        try {
            const contenidoArchivo = await this.#leerUnArchivo()
            let idFound = contenidoArchivo.find((prod) => prod.id === id);
            console.log(idFound);
            return idFound
          } catch (error) {
            console.log(error);
          }
    }

     async updateProduct(id, product){
        try{

            const contenidoArchivo = await this.#leerUnArchivo()
            const tarjetProduct =  await this.getProductById(id)
            console.log(tarjetProduct);
            if(tarjetProduct){
                const updateProduct = {...tarjetProduct, ...product}
                const updateList = contenidoArchivo.map(prod =>{
                    if(prod.id === id){
                        return updateProduct
                    }else{
                        return prod
                    }
                })
                const productListString = JSON.stringify(updateList, null, 2)
                await fs.promises.writeFile(this.rutaArchivo, productListString)
                console.log("producto modificado");
            }
        }
        catch(error){
            console.log(err);
        }    
    } 

    async deleteProduct (id){
        try {
            const contenidoArchivo = await this.#leerUnArchivo()
            const deleted = contenidoArchivo.filter((producto) => producto.id !== id);
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(deleted, null, 4));
            console.log("Removed Product");
          } catch (error) {
            throw new Error(error, 'Error al eliminar producto por id');
          }

    }

    }
        

const contenedor = new ProductManager("./products.json")
//contenedor.addProduct ({tittle: "producto ejemplo", price: "100", img:"imggggg"})
//contenedor.getProducts()
//contenedor.getProductById(6);
//contenedor.deleteProduct(6);
//contenedor.updateProduct(4, {price:5000})
//JSON.parse(`{"nombe":"mauri"}`) EJEMPLO

module.exports = ProductManager