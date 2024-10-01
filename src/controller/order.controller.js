// src/controller/order.controller.js

import Order from "../model/Order.js";
import OrderItem from "../model/OrderItem.js";
import Product from "../model/Product.js";

function generarOrdenId() {
    try {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    } catch (error) {
        console.error("Error al generar Orden ID:", error);
        throw error;
    }
}

export const getOrders = async (req, res) => {
    try {
        const { estado, ordenId } = req.query;

        let whereClause = {};

        if (estado) {
            whereClause.estado = estado;
        }

        if (ordenId) {
            whereClause.ordenId = ordenId;
        }

        const orders = await Order.findAll({
            where: whereClause,
            attributes: {
                exclude: ["id"],
            },
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

        res.json(orders);
    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({
            where: {
                ordenId: orderId,
            },
            attributes: {
                exclude: ["id"],
            },
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
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json(order);
    } catch (error) {
        console.error("Error al obtener la orden por orderId:", error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const deleteOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const deletedOrderCount = await Order.destroy({
            where: {
                ordenId: orderId,
            },
        });

        if (deletedOrderCount === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar la orden por orderId:", error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { estado, descripcionOrden, fechaSalida, fechaEntrega, items } =
            req.body;
        const ordenId = generarOrdenId();

        const newOrder = await Order.create({
            estado,
            descripcionOrden,
            fechaSalida,
            fechaEntrega,
            ordenId,
        });

        for (const item of items) {
            await OrderItem.create({
                orderId: newOrder.id,
                productId: item.productId,
                cantidad: item.cantidad,
            });
        }

        const orderWithoutId = {
            estado: newOrder.estado,
            descripcionOrden: newOrder.descripcionOrden,
            fechaSalida: newOrder.fechaSalida,
            fechaEntrega: newOrder.fechaEntrega,
            ordenId: newOrder.ordenId,
        };

        res.status(201).json(orderWithoutId);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const actualizarOrden = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { estado, descripcionOrden, fechaSalida, fechaEntrega, items } =
            req.body;

        const updatedOrder = await Order.update(
            {
                estado,
                descripcionOrden,
                fechaSalida,
                fechaEntrega,
            },
            {
                where: {
                    ordenId: orderId,
                },
            }
        );

        if (updatedOrder[0] === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        await OrderItem.destroy({
            where: {
                orderId: updatedOrder.id,
            },
        });

        for (const item of items) {
            const product = await Product.findOne({
                where: {
                    productCode: item.productCode,
                },
            });

            if (product) {
                await OrderItem.create({
                    orderId: newOrder.id,
                    productId: product.id,
                    cantidad: item.cantidad,
                });
            } else {
                console.error(`Producto no encontrado: ${item.productCode}`);
            }
        }

        const order = await Order.findOne({
            where: {
                ordenId: orderId,
            },
            attributes: {
                exclude: ["id"],
            },
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

        res.json(order);
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};
