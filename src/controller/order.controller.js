// Ruta: src/controller/order.controller.js
// Nombre del archivo: order.controller.js

import Order from "../model/Order.js"; // Importa el modelo Order
import OrderItem from "../model/OrderItem.js"; // Importa el modelo OrderItem
import Product from "../model/Product.js"; // Importa el modelo Product

// Función para generar un ID de orden aleatorio
function generarOrdenId() {
  try {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } catch (error) {
    console.error("Error al generar Orden ID:", error);
    throw error; // Re-lanzar el error para que sea manejado por el bloque try...catch externo
  }
}

export const getOrders = async (req, res) => {
  try {
    const { estado, ordenId } = req.query; // Obtiene los filtros de la consulta

    let whereClause = {}; // Crea un objeto para la cláusula WHERE

    if (estado) {
      whereClause.estado = estado; // Agrega el filtro de estado si está presente
    }

    if (ordenId) {
      whereClause.ordenId = ordenId; // Agrega el filtro de ordenId si está presente
    }

    const orders = await Order.findAll({
      where: whereClause,
      attributes: { exclude: ["id"] }, // Excluye el ID de la base de datos de la respuesta
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
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params; // Obtiene el orderId de la ruta

    const order = await Order.findOne({
      where: { ordenId: orderId },
      attributes: { exclude: ["id"] }, // Excluye el ID de la base de datos de la respuesta
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
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error al obtener la orden por orderId:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    const { orderId } = req.params; // Obtiene el orderId de la ruta

    const deletedOrderCount = await Order.destroy({
      where: { ordenId: orderId },
    });

    if (deletedOrderCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar la orden por orderId:", error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { estado, descripcionOrden, fechaSalida, fechaEntrega, items } =
      req.body; // items es un array de objetos con productId y cantidad
    const ordenId = generarOrdenId();

    const newOrder = await Order.create({
      estado,
      descripcionOrden,
      fechaSalida,
      fechaEntrega,
      ordenId,
    });

    // Crear los OrderItems para cada producto en la orden
    for (const item of items) {
      await OrderItem.create({
        orderId: newOrder.id,
        productId: item.productId,
        cantidad: item.cantidad,
      });
    }

    // Excluye el ID de la base de datos de la respuesta
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
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const actualizarOrden = async (req, res) => {
  try {
    const { orderId } = req.params; // Obtiene el orderId de la ruta
    const { estado, descripcionOrden, fechaSalida, fechaEntrega, items } =
      req.body; // ordenId no se puede actualizar

    const updatedOrder = await Order.update(
      {
        estado,
        descripcionOrden,
        fechaSalida,
        fechaEntrega,
      },
      { where: { ordenId: orderId } },
    );

    if (updatedOrder[0] === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Eliminar los OrderItems existentes para la orden
    await OrderItem.destroy({ where: { orderId: updatedOrder.id } });

    // Crear los OrderItems para cada producto en la orden
    for (const item of items) {
      // Busca el producto por su productCode
      const product = await Product.findOne({
        where: { productCode: item.productCode },
      });

      if (product) {
        // Crea el OrderItem usando el productId del producto encontrado
        await OrderItem.create({
          orderId: newOrder.id,
          productId: product.id, // Usa product.id en lugar de item.productCode
          cantidad: item.cantidad,
        });
      } else {
        // Maneja el caso en que el producto no se encuentra
        console.error(`Producto no encontrado: ${item.productCode}`);
        // Puedes devolver un error al usuario o continuar con la creación de la orden sin el producto
      }
    }

    const order = await Order.findOne({
      where: { ordenId: orderId },
      attributes: { exclude: ["id"] }, // Excluye el ID de la base de datos de la respuesta
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
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
