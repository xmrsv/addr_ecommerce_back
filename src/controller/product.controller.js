// Ruta: src/controller/product.controller.js
// Nombre del archivo: product.controller.js

import Product from '../model/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, stock } = req.body;

    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      imagen,
      stock
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { nombre, descripcion, precio, imagen, stock } = req.body;

    const updatedProduct = await Product.update(
      {
        nombre,
        descripcion,
        precio,
        imagen,
        stock
      },
      { where: { id: productId } }
    );

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findByPk(productId);
    res.json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProductCount = await Product.destroy({ where: { id: productId } });

    if (deletedProductCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};