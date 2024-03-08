import {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
  } from '../models/database.js';
  
  // Get all products
   const getAllProducts = async (req, res) => {
    res.send(await getProducts());
  };
  
  // Getting product by ID
  const getSingleProduct = async (req, res) => {
    res.send(await getProduct(+req.params.productID));
  };
  
  // Adding a product
  const addAProduct = async (req, res) => {
    const {productID, prodname,category,amount,produrl} = req.body;
    res.send(await addProduct(productID, prodname,category,amount,produrl));
  };
  
  // Deleting a product
   const deleteAProduct = async(req, res) =>{
    res.send(await deleteProduct(req.params.productID));
  };
  
  // Updating a product
  let updateAProduct = async (req, res)=>{
    try {
      const {prodname,category,amount,produrl} = req.body;
      await updateProduct(prodname,category,amount,produrl, +req.params.productID);
      res.json(await getProducts());
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  
  
  
  export{getAllProducts,getSingleProduct,addAProduct,deleteAProduct,updateAProduct}