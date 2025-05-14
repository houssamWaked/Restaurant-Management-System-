const OrderItemsRepository = require('../repositories/orderItemsRepository');
const MenuItemsRepository = require('../repositories/menuItemsRepository');
const ordersRepository= require('../repositories/ordersRepository');

class OrderItemsService {
 
    static async createOrderItem(orderItemData) {
        const menuItem = await MenuItemsRepository.getMenuItemById(orderItemData.menu_item_id);
        const order = await ordersRepository.getOrderById(orderItemData.order_id);
    if(!menuItem) {
        throw new Error(`Menu item with ID ${orderItemData.menu_item_id} not found`);

    }
    if(!order) {
        throw new Error(`Order with ID ${orderItemData.order_id} not found`);
    }
        return OrderItemsRepository.createOrderItem(orderItemData);
    }

    static async getAllOrderItems() {
        return OrderItemsRepository.getAllOrderItems();
    }

    static async getOrderItemById(order_item_id) {
        return OrderItemsRepository.getOrderItemById(order_item_id);
    }

    static async updateOrderItem(order_item_id, updates) {
        const orderItem = await OrderItemsRepository.getOrderItemById(order_item_id);
        if (!orderItem) {
            throw new Error(`Order item with ID ${order_item_id} not found`);
        }
        const menuItem = await MenuItemsRepository.getMenuItemById(updates.menu_item_id);
        const order = await ordersRepository.getOrderById(updates.order_id);
        if(!menuItem) {
            throw new Error(`Menu item with ID ${updates.menu_item_id} not found`);
        }
        if(!order) {
            throw new Error(`Order with ID ${updates.order_id} not found`);
        }
        return OrderItemsRepository.updateOrderItem(order_item_id, updates);
    }
    static async deleteOrderItem(order_item_id) {
        const orderItem = await OrderItemsRepository.getOrderItemById(order_item_id);
        if (!orderItem) {
            throw new Error(`Order item with ID ${order_item_id} not found`);
        }
        return OrderItemsRepository.deleteOrderItem(order_item_id);
    }
    static async getOrderItemsByOrderId(order_id) {
        const order = await ordersRepository.getOrderById(order_id);
        if (!order) {
            throw new Error(`Order with ID ${order_id} not found`);
        }
        return OrderItemsRepository.getOrderItemsByOrderId(order_id);
    }
    static async getOrderItemsByMenuItemId(menu_item_id) {
        const menuItem = await MenuItemsRepository.getMenuItemById(menu_item_id);
        if (!menuItem) {
            throw new Error(`Menu item with ID ${menu_item_id} not found`);
        }
        return OrderItemsRepository.getOrderItemsByMenuItemId(menu_item_id);
    }
    static async getOrderItemsByQuantity(quantity) {
        return OrderItemsRepository.getOrderItemsByQuantity(quantity);
    }
    static async getOrderItemsByPrice(price) {
        return OrderItemsRepository.getOrderItemsByPrice(price);
    }
    static async getTotalPriceByOrderId(order_id) {
        const order = await ordersRepository.getOrderById(order_id);
        if (!order) {
            throw new Error(`Order with ID ${order_id} not found`);
        }
        return OrderItemsRepository.getTotalPriceByOrderId(order_id);
    }
    static async getTotalQuantityByOrderId(order_id) {
        const order = await ordersRepository.getOrderById(order_id);
        if (!order) {
            throw new Error(`Order with ID ${order_id} not found`);
        }
        return OrderItemsRepository.getTotalQuantityByOrderId(order_id);
    }
}
module.exports = OrderItemsService;
    