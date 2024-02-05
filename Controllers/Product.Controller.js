import mongoose from "mongoose";
import Product from "../Models/Product.Model.js";
import fs from "fs";
import slugify from 'slugify';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get a single Product
export const getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product Not Found!" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const {
    title,
    price,
    description,
    //add images from files
  } = req.body;

  const slug = slugify(title, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  })

  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }
  const image = req.file.filename;

  try {
    const newProduct = Product.create({
        title,
        price,
        description,
        imageArray,
        slug,
    });
    res
      .status(200)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { title, description, price} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const slug = slugify(title, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  })

  const oldProduct = await Product.findById(id);

  try {

    const updatedProduct = {
        title: title || existingBlog.title_en,
        description: description || existingBlog.description_en,
        price: price || oldProduct.price,
        slug: slug || oldProduct.slug,
        }

     await Blog.findByIdAndUpdate(id, updateProduct, {new: true});

    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      error: `Error, ${error.message}`,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

