// src/controller/order.controller.js

import Order from "../model/Order.js";
import OrderItem from "../model/OrderItem.js";
import Product from "../model/Product.js";
import { logger } from "../utils/logger.js";

function generarOrdenId() {
    try {
        logger.info("Generating new order ID...");
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        logger.info(`Generated order ID: ${result}`);
        return result;
    } catch (error) {
        logger.error(`Error generating order ID: ${error}`);
        throw error;
    }
}

export const getOrders = async (req, res) => {
    try {
        logger.info("Fetching all orders...");
        const { estado, ordenId } = req.query;

        let whereClause = {};

        if (estado) {
            whereClause.estado = estado;
            logger.info(`Filtering orders by estado: ${estado}`);
        }

        if (ordenId) {
            whereClause.ordenId = ordenId;
            logger.info(`Filtering orders by ordenId: ${ordenId}`);
        }

        const orders = await Order.findAll({
            where: whereClause,
            attributes: { exclude: ["id"] },
            include: [
                {
                    model: OrderItem,
                    attributes: ["cantidad"],
                    include: [
                        {
                            model: Product,
                            attributes: ["nombre", "precio"],
                        },
                    ],
                },
            ],
        });

        logger.info(`Found ${orders.length} orders.`);
        res.json(orders);
    } catch (error) {
        logger.error(`Error fetching orders: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        logger.info(`Fetching order with ID: ${orderId}`);

        const order = await Order.findOne({
            where: { ordenId: orderId },
            attributes: { exclude: ["id"] },
            include: [
                {
                    model: OrderItem,
                    attributes: ["cantidad"],
                    include: [
                        {
                            model: Product,
                            attributes: ["nombre", "precio"],
                        },
                    ],
                },
            ],
        });

        if (!order) {
            logger.warn(`Order with ID ${orderId} not found.`);
            return res.status(404).json({ message: "Order not found" });
        }

        logger.info(`Order found: ${JSON.stringify(order)}`);
        res.json(order);
    } catch (error) {
        logger.error(`Error fetching order with ID ${orderId}:`, error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        logger.info(`Deleting order with ID: ${orderId}`);

        const deletedOrderCount = await Order.destroy({
            where: { ordenId: orderId },
        });

        if (deletedOrderCount === 0) {
            logger.warn(`Order with ID ${orderId} not found.`);
            return res.status(404).json({ message: "Order not found" });
        }

        logger.info(`Order with ID ${orderId} deleted successfully.`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting order with ID ${orderId}:`, error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const createOrder = async (req, res) => {
    try {
        logger.info("Creating a new order...");
        const { estado, descripcionOrden, fechaSalida, fechaEntrega, items } =
            req.body;
        const ordenId = generarOrdenId();

        logger.info(
            `Creating order with data: ${JSON.stringify({
                estado,
                descripcionOrden,
                fechaSalida,
                fechaEntrega,
                ordenId,
            })}`
        );

        const newOrder = await Order.create({
            estado,
            descripcionOrden,
            fechaSalida,
            fechaEntrega,
            ordenId,
        });

        logger.info(`Order created with ID: ${newOrder.id}`);

        for (const item of items) {
            logger.info(
                `Creating order item for product with code: ${item.productCode}`
            );
            // Busca el producto por su productCode
            const product = await Product.findOne({
                where: { productCode: item.productCode },
            });

            if (product) {
                logger.info(
                    `Product with code ${item.productCode} found. Creating order item...`
                );
                await OrderItem.create({
                    orderId: newOrder.id,
                    productId: product.id,
                    cantidad: item.cantidad,
                });
                logger.info(
                    `Order item created for product with code: ${item.productCode}`
                );
            } else {
                logger.error(
                    `Product with code ${item.productCode} not found.`
                );
            }
        }

        const orderWithoutId = {
            estado: newOrder.estado,
            descripcionOrden: newOrder.descripcionOrden,
            fechaSalida: newOrder.fechaSalida,
            fechaEntrega: newOrder.fechaEntrega,
            ordenId: newOrder.ordenId,
        };

        logger.info(
            `Returning created order data: ${JSON.stringify(orderWithoutId)}`
        );
        res.status(201).json(orderWithoutId);
    } catch (error) {
        logger.error(`Error creating order: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const actualizarOrden = async (req, res) => {
    const { orderId } = req.params;
    try {
        logger.info(`Updating order with ID: ${orderId}`);
        const { estado, descripcionOrden, fechaSalida, fechaEntrega, items } =
            req.body;

        logger.info(
            `Updating order with data: ${JSON.stringify({
                estado,
                descripcionOrden,
                fechaSalida,
                fechaEntrega,
            })}`
        );

        const updatedOrder = await Order.update(
            {
                estado,
                descripcionOrden,
                fechaSalida,
                fechaEntrega,
            },
            { where: { ordenId: orderId } }
        );

        if (updatedOrder[0] === 0) {
            logger.warn(`Order with ID ${orderId} not found.`);
            return res.status(404).json({ message: "Order not found" });
        }

        logger.info(`Order with ID ${orderId} updated successfully.`);

        logger.info(
            `Deleting existing order items for order with ID: ${orderId}`
        );
        await OrderItem.destroy({ where: { orderId: updatedOrder.id } });
        logger.info(
            `Existing order items for order with ID ${orderId} deleted successfully.`
        );

        for (const item of items) {
            logger.info(
                `Creating new order item for product with code: ${item.productCode}`
            );
            const product = await Product.findOne({
                where: { productCode: item.productCode },
            });

            if (product) {
                logger.info(
                    `Product with code ${item.productCode} found. Creating order item...`
                );
                await OrderItem.create({
                    orderId: updatedOrder.id,
                    productId: product.id,
                    cantidad: item.cantidad,
                });
                logger.info(
                    `Order item created for product with code: ${item.productCode}`
                );
            } else {
                logger.error(
                    `Product with code ${item.productCode} not found.`
                );
            }
        }

        logger.info(`Fetching updated order with ID: ${orderId}`);
        const order = await Order.findOne({
            where: { ordenId: orderId },
            attributes: { exclude: ["id"] },
            include: [
                {
                    model: OrderItem,
                    attributes: ["cantidad"],
                    include: [
                        {
                            model: Product,
                            attributes: ["nombre", "precio"],
                        },
                    ],
                },
            ],
        });

        logger.info(`Returning updated order: ${JSON.stringify(order)}`);
        res.json(order);
    } catch (error) {
        logger.error(`Error updating order with ID ${orderId}:`, error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
