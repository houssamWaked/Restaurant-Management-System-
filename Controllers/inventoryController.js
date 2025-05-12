const InventoryService=require('../services/inventoryService');



class InventoryController {
    static handleError(res, error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'An error occurred' });
    }

    static async createInventoryItem(req, res) {
        try {
            const itemData = req.body;
            const inventoryItem = await InventoryService.createInventoryItem(itemData);
            res.status(201).json(inventoryItem);
        } catch (error) {
            InventoryController.handleError(res, error);
        }
    }
    static async getAllInventoryItems(req, res) {
        try {
            const inventoryItems = await InventoryService.getAllInventoryItems();
            res.status(200).json(inventoryItems);
        } catch (error) {
            InventoryController.handleError(res, error);
        }
    }
    static async getInventoryItemByName(req, res) {
        try {
            const { item_name } = req.params;
            const inventoryItem = await InventoryService.getInventoryItemByName(item_name);
            res.status(200).json(inventoryItem);
        } catch (error) {
            InventoryController.handleError(res, error);
        }
    }
    static async getInventoryItemById(req, res) {
        try {
            const { inventory_id } = req.params;
            const inventoryItem = await InventoryService.getInventoryItemById(inventory_id);
            res.status(200).json(inventoryItem);
        } catch (error) {
            InventoryController.handleError(res, error);
        }
    }
    static async updateInventoryItem(req, res) {
        try {
            const { inventory_id } = req.params;
            const updates = req.body;
            const updatedInventoryItem = await InventoryService.updateInventoryItem(inventory_id, updates);
            res.status(200).json(updatedInventoryItem);
        } catch (error) {
            InventoryController.handleError(res, error);
        }
    }
    static async getLastUpdatedInventoryItem(req, res) {
        try {
            const { amount } = req.params;
            const inventoryItem = await InventoryService.getLastUpdatedInventoryItem(amount);
            res.status(200).json(inventoryItem);
        } catch (error) {
            InventoryController.handleError(res, error);
        }
    }
    static async deleteInventoryItem(req, res) {
        try {
            const { inventory_id } = req.params;
            await InventoryService.deleteInventoryItem(inventory_id);
            res.status(204).send();
        } catch (error) {
            InventoryController.handleError(res, error);
        }
    }
}
module.exports = InventoryController;