const InventoryRepository=require('../repositories/inventoryRepository');


class InventoryService {
    static async createInventoryItem(itemData) {
        return InventoryRepository.createInventoryItem(itemData);
    }

    static async getAllInventoryItems() {
        return InventoryRepository.getAllInventoryItems();
    }

    static async getInventoryItemByName(item_name) {
        return InventoryRepository.getInventoryItemByName(item_name);
    }

    static async getInventoryItemById(inventory_id) {
        return InventoryRepository.getInventoryItemById(inventory_id);
    }

    static async updateInventoryItem(inventory_id, updates) {
        return InventoryRepository.updateInventoryItem(inventory_id, updates);
    }
    static async getLastUpdatedInventoryItem(amount) {
        return InventoryRepository.getLastUpdatedInventoryItem(amount);
    }
    static async deleteInventoryItem(inventory_id) {
        return InventoryRepository.deleteInventoryItem(inventory_id);
    }
}

module.exports = InventoryService;