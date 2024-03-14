import {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
} from '../models/database.js';

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Getting product by ID
// Getting product by ID
// Getting product by ID
// Getting product by ID
const getSingleProduct = async (req, res) => {
  try {
      console.log('Product ID:', req.params.productID); // Log the value of productID
      const productID = parseInt(req.params.productID);
      console.log('Parsed Product ID:', productID); // Log the parsed productID
      if (isNaN(productID)) {
          return res.status(400).json({ error: 'Invalid product ID' });
      }
      const product = await getProduct(productID);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Adding a product
const addAProduct = async (req, res) => {
    try {
        const { productID, prodname, category, amount, produrl } = req.body;
        const newProduct = await addProduct(productID, prodname, category, amount, produrl);
        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Deleting a product
const deleteAProduct = async (req, res) => {
    try {
        const deletedProduct = await deleteProduct(req.params.productID);
        res.json(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Updating a product
const updateAProduct = async (req, res) => {
    try {
        const { prodname, category, amount, produrl } = req.body;
        await updateProduct(prodname, category, amount, produrl, +req.params.productID);
        const updatedProducts = await getProducts();
        res.json(updatedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export { getAllProducts, getSingleProduct, addAProduct, deleteAProduct, updateAProduct };