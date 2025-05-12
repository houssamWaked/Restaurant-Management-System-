
    const MenuItemService= require('../services/menuItemService');


    class MenuItemController {
        static handleError(res, error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message || 'An error occurred' });
        }
    static async createMenuItem(req, res) {
            try {
                const menuItemData = req.body;
                const menuItem = await MenuItemService.createMenuItem(menuItemData);
                res.status(201).json(menuItem);
            } catch (error) {
                MenuItemController.handleError(res, error);
            }
        }
        static async getAllMenuItems(req, res) {
            try {
                const menuItems = await MenuItemService.getAllMenuItems();
                res.status(200).json(menuItems);
            } catch (error) {
                MenuItemController.handleError(res, error);
            }
        }
        static async getMenuItemByName(req, res) {
            try {
                const { name } = req.params;
                const menuItem = await MenuItemService.getMenuItemByName(name);
                res.status(200).json(menuItem);
            } catch (error) {
                MenuItemController.handleError(res, error);
            }
        }
        static async getMenuItemById(req, res) {
            try {
                const { menu_id } = req.params;
                const menuItem = await MenuItemService.getMenuItemById(menu_id);
                res.status(200).json(menuItem);
            } catch (error) {
                MenuItemController.handleError(res, error);
            }
        }
        static async getMenuItemsByCategory(req, res) {
            try {
                const { category } = req.params;
                const menuItems = await MenuItemService.getMenuItemsByCategory(category);
                res.status(200).json(menuItems);
            } catch (error) {
                MenuItemController.handleError(res, error);
            }
        }
        static async updateMenuItem(req, res) {
            try {
                const { menu_id } = req.params;
                const updates = req.body;
                const updatedMenuItem = await MenuItemService.updateMenuItem(menu_id, updates);
                res.status(200).json(updatedMenuItem);
            } catch (error) {
                MenuItemController.handleError(res, error);
            }
        }
        static async deleteMenuItem(req, res) {
            try {
                const { menu_id } = req.params;
                await MenuItemService.deleteMenuItem(menu_id);
                res.status(204).send();
            } catch (error) {
                MenuItemController.handleError(res, error);
            }
        }
    }
    module.exports = MenuItemController;