const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/inventoryController');



const {
    ValidateInventoryCreation,
    ValidateInventoryIdParam,
    ValidateInventoryNameParam,
    ValidateInventoryUpdate,
    ValidateInventoryLastUpdatedParam,
} = require('../validators/inventroyDTO');


// Route to create a new inventory item
router.post('/', ValidateInventoryCreation, (req, res) =>
    InventoryController.createInventoryItem(req, res)
);

// Route to get all inventory items
router.get('/', (req, res) =>
    InventoryController.getAllInventoryItems(req, res)
);

// Route to get inventory item by name
router.get('/name/:item_name', ValidateInventoryNameParam, (req, res) =>
    InventoryController.getInventoryItemByName(req, res)
);

// Route to get inventory item by ID
router.get('/id/:inventory_id', ValidateInventoryIdParam, (req, res) =>
    InventoryController.getInventoryItemById(req, res)
);
// Route to update inventory item by ID
router.put('/:inventory_id', [ValidateInventoryIdParam, ValidateInventoryUpdate], (req, res) =>
    InventoryController.updateInventoryItem(req, res)
);

// Route to get last updated inventory item
router.get('/lastUpdated/:amount', ValidateInventoryLastUpdatedParam, (req, res) =>
    InventoryController.getLastUpdatedInventoryItem(req, res)
);


// Route to delete inventory item by ID
router.delete('/:inventory_id', ValidateInventoryIdParam, (req, res) =>
    InventoryController.deleteInventoryItem(req, res)
);

module.exports = router;