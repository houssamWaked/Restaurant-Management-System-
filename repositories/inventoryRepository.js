const sequelize=require('../config/sequelize');
const Inventory= require('../models/inventoryModel');


class InventoryRepository {
    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; 
    }
    static async createInventoryItem(itemData) {
        const t = await sequelize.transaction();
        try {
            const existingItem = await this.getInventoryItemByName(itemData.item_name, { transaction: t });
            if (existingItem) {
                throw new Error(`Item with name ${itemData.item_name} already exists`);
            }
            const item = await Inventory.create({
                item_name: itemData.item_name,
                quantity: itemData.quantity,
                unit: itemData.unit,
            }, { transaction: t });

            await t.commit();
            return item;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createInventoryItem', t);
        }
    }   
    static async getAllInventoryItems() {
        try {
            return await Inventory.findAll();
        } catch (e) {
            this.handleError(e, 'getAllInventoryItems');
        }
    }
    static async getInventoryItemByName(item_name) {
        try {
            const item = await Inventory.findOne({ where: { item_name } });
            return item;
        } catch (e) {
            this.handleError(e, 'getInventoryItemByName');
        }
    }

    static async getInventoryItemById(inventory_id) {
        try {
            const item = await Inventory.findOne({ where: { inventory_id } });
            return item;
        } catch (e) {
            this.handleError(e, 'getInventoryItemById');
        }
    }
    static async updateInventoryItem(inventory_id, updates) {
        const t = await sequelize.transaction();
        try {
            const item = await this.getInventoryItemById(inventory_id, { transaction: t });
            if (!item) {
                throw new Error(`Item with ID ${inventory_id} not found`);
            }
            if (!updates || typeof updates !== 'object') {
                throw new Error("No updates provided");
            }
            const updatedItem = await Inventory.update(updates, { where: { inventory_id }, transaction: t });
            await t.commit();
            return updatedItem;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateInventoryItem', t);
        }
    }
    static async getLastUpdatedInventoryItem(amount) {
        try {
            amount = amount || 10; // Default to 10 if no amount is provided
            const items = await Inventory.findAll({
                order: [['updatedAt', 'DESC']],
                limit: amount,
            });
            return items;
        } catch (e) {
            this.handleError(e, 'getLast10UpdatedInventoryItem');
        }
    }

    static async deleteInventoryItem(inventory_id) {
        const t = await sequelize.transaction();
        try {
            const item = await this.getInventoryItemById(inventory_id, { transaction: t });
            if (!item) {
                throw new Error(`Item with ID ${inventory_id} not found`);
            }
            await Inventory.destroy({ where: { inventory_id }, transaction: t });
            await t.commit();
            return item;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteInventoryItem', t);
        }
    }
   
}
module.exports = InventoryRepository;