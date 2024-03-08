import {createPool} from 'mysql2'
import { config } from 'dotenv'
config()

const pool = createPool({
    host:process.env.MYSQL_ADDON_HOST,
    database:process.env.MYSQL_ADDON_DB,
    user:process.env.MYSQL_ADDON_USER,
    port:process.env.MYSQL_ADDON_PORT,
    password:process.env.MYSQL_ADDON_PASSWORD,
}).promise()

const getProducts = async()=>{
    const[results] = await pool.query(`
        SELECT * FROM products
        `)
        return results
}

const getProduct = async(productID)=>{
    const [result] = await pool.query(`
    SELECT * FROM products WHERE productID = ?`, 
    [productID])
    return result
}

const addProduct = async(productID,prodname,category,amount,produrl)=>{
    const [product] = await pool.query(`
    INSERT INTO products (productID,prodname,category,amount,produrl) VALUES (?,?,?,?,?)`,
    [productID,prodname,category,amount,produrl]
    );
    return getProducts();
}

const deleteProduct = async (productID)=>{
    await pool.query(`DELETE FROM products WHERE productID= ?`, [productID]);
    return getProducts();
}

const updateProduct = async(prodname,category,amount,produrl,productID)=>{
    await pool.query(`UPDATE products SET prodname=?, category=?, amount=?, produrl=?
    WHERE productID=?`,
    [prodname,category,amount,produrl,productID]);
    return getProducts();
}
 

export{getProducts, getProduct, addProduct, deleteProduct, updateProduct}