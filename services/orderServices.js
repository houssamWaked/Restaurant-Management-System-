const ordersRepository = require('../repositories/ordersRepository');
const UserRepository = require('../repositories/userRepositories');


class OrderService {
    static async createOrder(orderData) {
        return ordersRepository.createOrder(orderData);
    }

    static async getAllOrders() {
        return ordersRepository.getAllOrders();
    }

    static async getOrderById(order_id) {
        return ordersRepository.getOrderById(order_id);
    }

    static async updateOrder(order_id, updates) {
        if(!updates.customer_name) {
            const user = await UserRepository.getUserById(updates.user_id);
            if (!user) {
                throw new Error(`User with ID ${updates.user_id} not found`);
            }
            updates.customer_name = user.name;
        }
        return ordersRepository.updateOrder(order_id, updates);
    }

    static async deleteOrder(order_id) {
        return ordersRepository.deleteOrder(order_id);
    }
    static async getOrdersByCustomerName(customer_name) {
        const user = await UserRepository.getUserByName(customer_name);
        if (!user) {
            throw new Error(`User with name ${customer_name} not found`);
        }
        return ordersRepository.getOrdersByCustomerName(customer_name);
    }
    static async getOrdersByDateRange(startDate, endDate) {
        return ordersRepository.getOrdersByDateRange(startDate, endDate);
    }
    static async getLatUpdateOrder(amount) {
        return ordersRepository.getLatUpdateOrder(amount);
    }
    static async getOrdersByCustomerNameAndDateRange(customer_name, startDate, endDate) {
        const user = await UserRepository.getUserByName(customer_name);
        if (!user) {
            throw new Error(`User with name ${customer_name} not found`);
        }
        return ordersRepository.getOrdersByCustomerNameAndDateRange(customer_name, startDate, endDate);
    }
}
module.exports = OrderService;