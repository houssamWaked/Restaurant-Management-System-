
const sequelize= require('../config/sequelize');
const Orders= require('../models/ordersModel');

class OrdersRepository {
    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; 
    }
    static async createOrder(orderData) {
        const t = await sequelize.transaction();
        try {
            const order = await Orders.create({
                customer_name: orderData.customer_name,
                item_name: orderData.item_name,
                quantity: orderData.quantity,
                unit: orderData.unit,
            }, { transaction: t });

            await t.commit();
            return order;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createOrder', t);
        }
    }   
    static async getAllOrders() {
        try {
            return await Orders.findAll();
        } catch (e) {
            this.handleError(e, 'getAllOrders');
        }
    }
    static async getOrderById(order_id) {
        try {
            const order = await Orders.findOne({ where: { order_id } });
            return order;
        } catch (e) {
            this.handleError(e, 'getOrderById');
        }
    }
    static async updateOrder(order_id, updates) {
        const t = await sequelize.transaction();
        try {
            const order = await Orders.findOne({ where: { order_id } });
            if (!order) {
                throw new Error(`Order with ID ${order_id} not found`);
            }
            await order.update(updates, { transaction: t });
            await t.commit();
            return order;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateOrder', t);
        }
    }
    static async deleteOrder(order_id) {
        const t = await sequelize.transaction();
        try {
            const order = await Orders.findOne({ where: { order_id } });
            if (!order) {
                throw new Error(`Order with ID ${order_id} not found`);
            }
            await order.destroy({ transaction: t });
            await t.commit();
            return order;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteOrder', t);
        }
    }
    static async getOrdersByCustomerName(customer_name) {
        try {
            const orders = await Orders.findAll({ where: { customer_name } });
            return orders;
        } catch (e) {
            this.handleError(e, 'getOrdersByCustomerName');
        }
    }
    
    static async getOrdersByDateRange(startDate, endDate) {
        try {
            const orders = await Orders.findAll({
                where: {
                    createdAt: {
                        [sequelize.Op.between]: [startDate, endDate],
                    },
                },
            });
            return orders;
        } catch (e) {
            this.handleError(e, 'getOrdersByDateRange');
        }
    }
    static async getLastUpdatedOrders(amount) {
        try {
            amount = amount || 10; // Default to 10 if no amount is provided
            const orders = await Orders.findAll({
                order: [['updatedAt', 'DESC']],
                limit: amount,
            });
            return orders;
        } catch (e) {
            this.handleError(e, 'getLastUpdatedOrders');
        }
    }
    static async getOrdersByCustomerNameAndDateRange(customer_name, startDate, endDate) {
        try {
            const orders = await Orders.findAll({
                where: {
                    customer_name,
                    createdAt: {
                        [sequelize.Op.between]: [startDate, endDate],
                    },
                },
            });
            return orders;
        } catch (e) {
            this.handleError(e, 'getOrdersByCustomerNameAndDateRange');
        }
    }
}
module.exports = OrdersRepository;
  