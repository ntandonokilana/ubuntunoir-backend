import express from 'express';
import {
  getAllProducts,
  getSingleProduct,
  addAProduct,
  deleteAProduct,
  updateAProduct
} from '../controller/products.js';

const router = express.Router();

// Get all products
// router.get('/', getAllProducts);

// Get product by ID

// Add a product
// router.post('/products', addAProduct);

// Delete a product
// router.delete('/products/:productID', deleteAProduct);

// router.get('/products/:productID', getSingleProduct);
// // Update a product
// router.patch('/products/:productID', updateAProduct);


router.route('/')
  .get(getAllProducts)
  .post(addAProduct);


router.route('/:id')
  .get(getSingleProduct)
  .delete(deleteAProduct)
  .patch(updateAProduct)
export default router;