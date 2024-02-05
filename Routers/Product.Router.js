import {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  } from "../Controllers/Product.Controller.js";
  import express from "express";
//   import upload from "../middleware/Multer.js";
  import { authenticate, checkRole } from "../middleware/Auth.js";
  
  const productRouter = express.Router();

  productRouter.get("/:slug", getProduct);
  productRouter.get("/", getAllProducts);
  productRouter.post("/",authenticate, checkRole(["Admin"]), createProduct);
  productRouter.post("/update/:id", authenticate, checkRole(["Admin"]) , updateProduct);
  productRouter.delete("/:id", authenticate, checkRole(["Admin"]) , deleteProduct);
  
  export default productRouter;
  
  
  