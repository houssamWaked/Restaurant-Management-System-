const sequelize = require('sequelize');
const OrderItem = require('../models/orderItemsModel');



class OrderItemsRepository {
    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; 
    }
    static async createOrderItem(orderItemData) {
        const t = await sequelize.transaction();
        try {
            const orderItem = await OrderItem.create({
                order_id: orderItemData.order_id,
                menu_item_id: orderItemData.menu_item_id,
                quantity: orderItemData.quantity,
                price: orderItemData.price,
            }, { transaction: t });

            await t.commit();
            return orderItem;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createOrderItem', t);
        }
    }
    static async getAllOrderItems() {
        try {
            return await OrderItem.findAll();
        } catch (e) {
            this.handleError(e, 'getAllOrderItems');
        }
    }
    static async getOrderItemById(order_item_id) {
        try {
            const orderItem = await OrderItem.findOne({ where: { order_item_id } });
            return orderItem;
        } catch (e) {
            this.handleError(e, 'getOrderItemById');
        }
    }
    static async updateOrderItem(order_item_id, orderItemData) {
        const t = await sequelize.transaction();
        try {
            const orderItem = await OrderItem.findOne({ where: { order_item_id } });
            if (!orderItem) {
                throw new Error(`Order item with ID ${order_item_id} not found`);
            }

            await OrderItem.update(orderItemData, { where: { order_item_id }, transaction: t });

            await t.commit();
            return orderItem;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateOrderItem', t);
        }
    }
    static async deleteOrderItem(order_item_id) {
        const t = await sequelize.transaction();
        try {
            const orderItem = await OrderItem.findOne({ where: { order_item_id } });
            if (!orderItem) {
                throw new Error(`Order item with ID ${order_item_id} not found`);
            }

            await OrderItem.destroy({ where: { order_item_id }, transaction: t });

            await t.commit();
            return orderItem;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteOrderItem', t);
        }
    }
    static async getOrderItemsByOrderId(order_id) {
        try {
            const orderItems = await OrderItem.findAll({ where: { order_id } });
            return orderItems;
        } catch (e) {
            this.handleError(e, 'getOrderItemsByOrderId');
        }
    }
    static async getOrderItemsByMenuItemId(menu_item_id) {
        try {
            const orderItems = await OrderItem.findAll({ where: { menu_item_id } });
            return orderItems;
        } catch (e) {
            this.handleError(e, 'getOrderItemsByMenuItemId');
        }
    }
    static async getOrderItemsByQuantity(quantity) {
        try {
            const orderItems = await OrderItem.findAll({ where: { quantity } });
            return orderItems;
        } catch (e) {
            this.handleError(e, 'getOrderItemsByQuantity');
        }
    }
    static async getOrderItemsByPrice(price) {
        try {
            const orderItems = await OrderItem.findAll({ where: { price } });
            return orderItems;
        } catch (e) {
            this.handleError(e, 'getOrderItemsByPrice');
        }
    }
    static async getTotalPriceByOrderId(order_id) {
        try {
            const orderItems = await OrderItem.findAll({ where: { order_id } });
            let totalPrice = 0;
            orderItems.forEach(item => {
                totalPrice += item.price * item.quantity;
            });
            return totalPrice;
        } catch (e) {
            this.handleError(e, 'getTotalPriceByOrderId');
        }
       
    
    }
    static async getTotalQuantityByOrderId(order_id) {
        try {
            const orderItems = await OrderItem.findAll({ where: { order_id } });
            let totalQuantity = 0;
            orderItems.forEach(item => {
                totalQuantity += item.quantity;
            });
            return totalQuantity;
        } catch (e) {
            this.handleError(e, 'getTotalQuantityByOrderId');
        }
    }
}
module.exports = OrderItemsRepository;
