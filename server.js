import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
// import { hash,compare } from 'bcrypt';
import productsRouter from './routes/productsRoutes.js';
import cookieParser from 'cookie-parser';
// import { getAllProduct, getProducts, deleteAProduct, updateProduct } from './controller/products.js';
// import productRoutes from './controller/products';
// import jwt from 'jsonwebtoken'


config()
let PORT = process.env.PORT

const app = express()
app.use(cors({
    origin:' http://localhost:8080/',
    credentials:true})
    )
app.use(express.json())
app.use(express.static('views'))
app.use(cookieParser())


app.use('/products', productsRouter);

// const middleware =(req,es,next)=>{
//     console.log('I would like a camcoder please.');
//     req.body.response === "ok"? next(): res.send('Please repeat that?')
// }
// app.get('/products', middleware, async(req,res)=>{
//     res.send(await getProducts())
// })

app.get('/products/:productID', async(req,res)=>{
    res.send(await getProduct(+req.params.productID))
})

app.post('/products', async(req,res)=>{
    
})

app.delete('/product/:productID', async(req,res)=>{
    // res.send(await deleteProduct(req.params.productID))
    // prodname ? prodname=prodname : {prodname}=product
    // category ? category=category : {category}=product
    // amount ? amount=amount : {amount}=product
    // produrl ? produrl=produrl : {produrl}=product
    // console.log(product);
    // await updateProduct(prodname,category,amount,produrl, +req.params.productID)
    // res.json(await getProduct())
})

app.listen(process.env.PORT, ()=>{
    console.log('http://localhost:'+ PORT);
})
