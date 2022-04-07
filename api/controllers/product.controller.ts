import mongoose from "mongoose";
import {Request, Response} from 'express'
import {
    CreateProductInput,
    UpdateProductInput,
} from '../schemaValidators/product.schema'
import {
    createProduct,
    deleteProduct,
    findAndUpdateProduct,
    findProduct,
    findProducts
} from '../services/product.service'


// get product/
export async function getAllProductsHandler(
    req: Request<{}, {}, CreateProductInput["body"]>, res: Response ) {

        const products = await findProducts({})
        if (!products) {
            return res.sendStatus(404)
        }
        return res.send(products)
}

// get product/:id

export async function getSingleProductHandler(
    // TODO update request so it looks similar to createProductHandler
    req: Request, res: Response ){

    const id = req.params.id
    const product = await findProduct({id})
    if (!product) {
        return res.sendStatus(404)
    }
    return res.send(product)
}

// post product/
export async function createProductHandler(
    req: Request<{}, {}, CreateProductInput["body"]>, res: Response ) {
        const body = req.body
        const product = await createProduct({...body})
        return res.send(product)
}

// patch product/:id

export async function updateSingleProductHandler(
    // TODO update request so it looks similar to createProductHandler
    req: Request, res: Response ) {

        
        const body = req.body
        const id = req.params.id
        const product = await findProduct({id})

        if (!product) {
            return res.sendStatus(404)
        }

        const updatedProduct = await findAndUpdateProduct({ id }, body, {
            new: true,
          });
        
          return res.send(updatedProduct);

}

// delete product/:id
export async function deleteProductHandler(
        // TODO update request so it looks similar to createProductHandler
    req: Request, res: Response ){
    
    const id = req.params.id
    const product =  await findProduct({id})
    if (!product) {
        return res.sendStatus(404)
    }
    await deleteProduct({id})
    return res.sendStatus(200)
}