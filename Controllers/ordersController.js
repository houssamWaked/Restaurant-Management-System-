const OrderService= require('../services/orderServices');


class OrderController{
    static handleError(res, error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'An error occurred' });
    }

    static async createOrder(req, res) {
        try {
            const orderData = req.body;
            const order = await OrderService.createOrder(orderData);
            res.status(201).json(order);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async getOrderById(req, res) {
        try {
            const { order_id } = req.params;
            const order = await OrderService.getOrderById(order_id);
            res.status(200).json(order);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async updateOrder(req, res) {
        try {
            const { order_id } = req.params;
            const updates = req.body;
            const updatedOrder = await OrderService.updateOrder(order_id,updates);
            res.status(200).json(updatedOrder);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async deleteOrder(req, res) {
        try {
            const { order_id } = req.params;
            const deletedOrder = await OrderService.deleteOrder(order_id);
            res.status(200).json(deletedOrder);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async getOrdersByCustomerName(req, res) {
        try {
            const { customer_name } = req.params;
            const orders = await OrderService.getOrdersByCustomerName(customer_name);
            res.status(200).json(orders);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async getOrdersByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.params;
            const orders = await OrderService.getOrdersByDateRange(startDate, endDate);
            res.status(200).json(orders);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async getLatUpdateOrder(req, res) {
        try {
            const { amount } = req.params;
            const orders = await OrderService.getLatUpdateOrder(amount);
            res.status(200).json(orders);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
    static async getOrdersByCustomerNameAndDateRange(req, res) {
        try {
            const { customer_name, startDate, endDate } = req.params;
            const orders = await OrderService.getOrdersByCustomerNameAndDateRange(customer_name, startDate, endDate);
            res.status(200).json(orders);
        } catch (error) {
            OrderController.handleError(res, error);
        }
    }
}
module.exports = OrderController;