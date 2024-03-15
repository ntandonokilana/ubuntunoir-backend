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
};

// Users logic

const adduser = async (userID, firstName, lastName, userAge, Gender, emailAdd, userPass, userProfile) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userPass, 10);

    await pool.query(
        "INSERT INTO users (UserID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) VALUES (?,?,?,?,?,?,?,?,?)",
        [UserID, firstName, lastName, userAge, Gender, emailAdd, hashedPassword, userProfile]
    );

    return getusers();
};

const getusers = async () => {
    const [result] = await pool.query(`SELECT * FROM users`);
    return result;
};

const getuser = async (idusers) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE idusers = ?`, [idusers]);
    return result;
};

const deleteuser = async (idusers) => {
    await pool.query(`DELETE FROM users WHERE idusers = ?`, [idusers]);
    return getusers();
};

const updateuser = async (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, idusers) => {
    await pool.query(`
        UPDATE users 
        SET firstName=?, lastName=?, userAge=?, Gender=?, userRole=?, emailAdd=?, userPass=?, userProfile=?
        WHERE idusers=?
    `, [firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, idusers]);
    return getusers();
};

const checkuser = async (emailAdd, userPass) => {
    try {
        const [result] = await pool.query(`SELECT userPass FROM users WHERE emailAdd = ?`, [emailAdd]);

        if (result.length === 0) {
            // User not found
            return false;
        }

        const hashedPassword = result[0].userPass;

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(userPass, hashedPassword);

        return passwordMatch;
    } catch (error) {
        console.error(error);
        return false;
    }
};
 

export{getProducts, getProduct, addProduct, deleteProduct, updateProduct, adduser, checkuser, getusers, getuser, deleteuser, updateuser}