const express=require('express');
const router=express.Router();

const MenuItemController=require('../controllers/menuItemController');
const {
    ValidateMenuItemCreation,
    ValidateMenuItemIdParam,
    ValidateMenuItemNameParam,
    ValidateMenuItemCategoryParam,
    ValidateMenuItemUpdate,
} = require('../validators/menuItemDTO');

// Route to create a new menu item
router.post('/', ValidateMenuItemCreation, (req, res) =>
    MenuItemController.createMenuItem(req, res)
);

// Route to get all menu items
router.get('/', (req, res) =>
    MenuItemController.getAllMenuItems(req, res)
);

// Route to get menu item by name
router.get('/name/:menu_name', ValidateMenuItemNameParam, (req, res) =>
    MenuItemController.getMenuItemByName(req, res)
);

// Route to get menu item by ID
router.get('/id/:menu_id', ValidateMenuItemIdParam, (req, res) =>
    MenuItemController.getMenuItemById(req, res)
);
// Route to get menu items by category
router.get('/category/:category', ValidateMenuItemCategoryParam, (req, res) =>
    MenuItemController.getMenuItemsByCategory(req, res)
);

// Route to update menu item by ID
router.put('/:menu_id', [ValidateMenuItemIdParam, ValidateMenuItemUpdate], (req, res) =>
    MenuItemController.updateMenuItem(req, res)
);

// Route to delete menu item by ID
router.delete('/:menu_id', ValidateMenuItemIdParam, (req, res) =>
    MenuItemController.deleteMenuItem(req, res)
);

module.exports=router;