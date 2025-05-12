const sequelize = require('../config/sequelize');
const MenuItem = require('../models/menuItemsModel');


class MenuItemsRepository {
    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; 
    }

    static async createMenuItem(menuItemData) {
        const t = await sequelize.transaction();
        try {
            const existingMenuItem = await this.getMenuItemByName(menuItemData.name, { transaction: t });
            if (existingMenuItem) {
                throw new Error(`Menu item with name ${menuItemData.name} already exists`);
            }

            const menuItem = await MenuItem.create({
                name: menuItemData.name,
                description: menuItemData.description,
                price: menuItemData.price,
                category: menuItemData.category,
                availabe: menuItemData.availabe || true,
            }, { transaction: t });

            await t.commit();
            return menuItem;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createMenuItem', t);
        }

    }
    static async getAllMenuItems() {
        try {
            return await MenuItem.findAll();
        } catch (e) {
            this.handleError(e, 'getAllMenuItems');
        }
    }
    static async getMenuItemByName(name) {
        try {
            const menuItem = await MenuItem.findOne({ where: { name } });
            return menuItem;
        } catch (e) {
            this.handleError(e, 'getMenuItemByName');
        }
    }
    static async getMenuItemById(menu_id) {
        try {
            const menuItem = await MenuItem.findOne({ where: { menu_id } });
            return menuItem;
        } catch (e) {
            this.handleError(e, 'getMenuItemById');
        }
    }
    static async updateMenuItem(menu_id, updates) {
        const t = await sequelize.transaction();
        try {
            const menuItem = await this.getMenuItemById(menu_id, { transaction: t });
            if (!menuItem) {
                throw new Error(`Menu item with ID ${menu_id} not found`);
            }

            const updatedMenuItem = await menuItem.update(updates, { transaction: t });
            await t.commit();
            return updatedMenuItem;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateMenuItem', t);
        }
    }
    static async getMenuItemsByCategory(category) {
        try {
            const menuItems = await MenuItem.findAll({ where: { category } });
            return menuItems;
        } catch (e) {
            this.handleError(e, 'getMenuItemsByCategory');
        }
    }
    static async deleteMenuItem(menu_id) {
        const t = await sequelize.transaction();
        try {
            const menuItem = await this.getMenuItemById(menu_id, { transaction: t });
            if (!menuItem) {
                throw new Error(`Menu item with ID ${menu_id} not found`);
            }

            await menuItem.destroy({ transaction: t });
            await t.commit();
            return menuItem;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteMenuItem', t);
        }
    }
}

module.exports = MenuItemsRepository;