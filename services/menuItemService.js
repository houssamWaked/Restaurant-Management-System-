    const MenuItemsRepository= require('../repositories/menuItemsRepository');



    class MenuItemService {
        static async createMenuItem(menuItemData) {
            return MenuItemsRepository.createMenuItem(menuItemData);
        }
    
        static async getAllMenuItems() {
            return MenuItemsRepository.getAllMenuItems();
        }
    
        static async getMenuItemByName(name) {
            return MenuItemsRepository.getMenuItemByName(name);
        }
    
        static async getMenuItemById(menu_id) {
            return MenuItemsRepository.getMenuItemById(menu_id);
        }
        static async getMenuItemsByCategory(category) {
            return MenuItemsRepository.getMenuItemsByCategory(category);
        }

        static async updateMenuItem(menu_id, updates) {
            return MenuItemsRepository.updateMenuItem(menu_id, updates);
        }
        static async deleteMenuItem(menu_id) {
            return MenuItemsRepository.deleteMenuItem(menu_id);
        }
    }
    module.exports = MenuItemService;