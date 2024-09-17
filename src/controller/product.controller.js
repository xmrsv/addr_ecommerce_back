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
    const { productCode } = req.params; // Usamos productCode en lugar de productId
    const product = await Product.findOne({ where: { productCode } }); // Buscamos por productCode

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
    const { nombre, descripcion, precio, imagen, stock, productCode } = req.body; // Obtiene el productCode del cuerpo de la petición

    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      imagen,
      stock,
      productCode // Guarda el productCode en la base de datos
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productCode } = req.params; // Usamos productCode en lugar de productId
    const { nombre, descripcion, precio, imagen, stock } = req.body; // Obtiene los datos del cuerpo de la petición

    const updatedProduct = await Product.update(
      {
        nombre,
        descripcion,
        precio,
        imagen,
        stock
      },
      { where: { productCode } } // Actualiza el producto por productCode
    );

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findOne({ where: { productCode } }); // Busca el producto actualizado
    res.json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productCode } = req.params; // Usamos productCode en lugar de productId
    const deletedProductCount = await Product.destroy({ where: { productCode } }); // Elimina el producto por productCode

    if (deletedProductCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};