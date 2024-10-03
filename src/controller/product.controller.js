// src/controller/product.controller.js
import Product from "../model/Product.js";
import { logger } from "../utils/logger.js";

export const getProducts = async (req, res) => {
    try {
        logger.info("Fetching all products...");
        const products = await Product.findAll();
        logger.info(`Found ${products.length} products.`);
        res.json(products);
    } catch (error) {
        logger.error(`Error fetching products: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getProductById = async (req, res) => {
    const { productCode } = req.params;
    try {
        logger.info(`Fetching product with code ${productCode}...`);
        const product = await Product.findOne({ where: { productCode } });

        if (!product) {
            logger.warn(`Product with code ${productCode} not found.`);
            return res.status(404).json({ message: "Product not found" });
        }

        logger.info(`Product with code ${productCode} found.`);
        res.json(product);
    } catch (error) {
        logger.error(
            `Error fetching product with code ${productCode}: ${error}`
        );
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const createProduct = async (req, res) => {
    try {
        logger.info("Creating a new product...");
        const { nombre, descripcion, precio, imagen, stock, productCode } =
            req.body;

        logger.info(
            `Creating product with data: ${JSON.stringify({
                nombre,
                descripcion,
                precio,
                imagen,
                stock,
                productCode,
            })}`
        );

        const newProduct = await Product.create({
            nombre,
            descripcion,
            precio,
            imagen,
            stock,
            productCode,
        });

        logger.info(`Product created with ID: ${newProduct.id}`);
        res.status(201).json(newProduct);
    } catch (error) {
        logger.error(`Error creating product: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateProduct = async (req, res) => {
    const { productCode } = req.params;
    try {
        logger.info(`Updating product with code ${productCode}...`);
        const { nombre, descripcion, precio, imagen, stock } = req.body;

        logger.info(
            `Updating product with data: ${JSON.stringify({
                nombre,
                descripcion,
                precio,
                imagen,
                stock,
            })}`
        );

        const updatedProduct = await Product.update(
            {
                nombre,
                descripcion,
                precio,
                imagen,
                stock,
            },
            { where: { productCode } }
        );

        if (updatedProduct[0] === 0) {
            logger.warn(`Product with code ${productCode} not found.`);
            return res.status(404).json({ message: "Product not found" });
        }

        logger.info(`Product with code ${productCode} updated successfully.`);

        const product = await Product.findOne({ where: { productCode } });
        logger.info(`Returning updated product: ${JSON.stringify(product)}`);
        res.json(product);
    } catch (error) {
        logger.error(
            `Error updating product with code ${productCode}: ${error}`
        );
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteProduct = async (req, res) => {
    const { productCode } = req.params;
    try {
        logger.info(`Deleting product with code ${productCode}...`);

        const deletedProductCount = await Product.destroy({
            where: { productCode },
        });

        if (deletedProductCount === 0) {
            logger.warn(`Product with code ${productCode} not found.`);
            return res.status(404).json({ message: "Product not found" });
        }

        logger.info(`Product with code ${productCode} deleted successfully.`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(
            `Error deleting product with code ${productCode}: ${error}`
        );
        return res.status(500).json({ message: "Something went wrong" });
    }
};
