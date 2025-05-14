const orderItemsService = require('../Services/orderItemsService');

class OrderItemsController {
    static handleError(res, error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'An error occurred' });
    }
    static async createOrderItem(req, res) {
        try {
            const orderItemData = req.body;
            const orderItem = await orderItemsService.createOrderItem(orderItemData);
            res.status(201).json(orderItem);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getAllOrderItems(req, res) {
        try {
            const orderItems = await orderItemsService.getAllOrderItems();
            res.status(200).json(orderItems);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getOrderItemById(req, res) {
        try {
            const { order_item_id } = req.params;
            const orderItem = await orderItemsService.getOrderItemById(order_item_id);
            res.status(200).json(orderItem);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async updateOrderItem(req, res) {
        try {
            const { order_item_id } = req.params;
            const updates = req.body;
            const updatedOrderItem = await orderItemsService.updateOrderItem(order_item_id, updates);
            res.status(200).json(updatedOrderItem);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async deleteOrderItem(req, res) {
        try {
            const { order_item_id } = req.params;
            const deletedOrderItem = await orderItemsService.deleteOrderItem(order_item_id);
            res.status(200).json(deletedOrderItem);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getOrderItemsByOrderId(req, res) {
        try {
            const { order_id } = req.params;
            const orderItems = await orderItemsService.getOrderItemsByOrderId(order_id);
            res.status(200).json(orderItems);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getOrderItemsByMenuItemId(req, res) {
        try {
            const { menu_item_id } = req.params;
            const orderItems = await orderItemsService.getOrderItemsByMenuItemId(menu_item_id);
            res.status(200).json(orderItems);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getOrderItemsByQuantity(req, res) {
        try {
            const { quantity } = req.params;
            const orderItems = await orderItemsService.getOrderItemsByQuantity(quantity);
            res.status(200).json(orderItems);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getOrderItemsByPrice(req, res) {
        try {
            const { price } = req.params;
            const orderItems = await orderItemsService.getOrderItemsByPrice(price);
            res.status(200).json(orderItems);
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getTotalPriceByOrderId(req, res) {
        try {
            const { order_id } = req.params;
            const totalPrice = await orderItemsService.getTotalPriceByOrderId(order_id);
            res.status(200).json({ totalPrice });
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }
    static async getTotalQuantityByOrderId(req, res) {
        try {
            const { order_id } = req.params;
            const totalQuantity = await orderItemsService.getTotalQuantityByOrderId(order_id);
            res.status(200).json({ totalQuantity });
        } catch (error) {
            OrderItemsController.handleError(res, error);
        }
    }

}
module.exports = OrderItemsController;