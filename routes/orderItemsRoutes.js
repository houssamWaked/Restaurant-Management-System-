const express = require('express');
const router = express.Router();
const OrderItemsController = require('../controllers/orderItemsController');
const {
     ValidateOrderItemCreation,
    ValidateOrderItemUpdate,
    ValidateOrderItemDeletion,
    ValidateOrderItemRetrieval,
    ValidateOrderItemsByOrderId,
    ValidateOrderItemsByMenuItemId,
    ValidateOrderItemsByQuantity,
    ValidateOrderItemsByPrice,
} = require('../validators/orderItemsDTO');

// Route to create a new order item
router.post('/', ValidateOrderItemCreation, (req, res) =>
    OrderItemsController.createOrderItem(req, res)
);
// Route to get all order items
router.get('/', (req, res) =>
    OrderItemsController.getAllOrderItems(req, res)
);
// Route to get order item by ID
router.get('/:order_item_id', ValidateOrderItemRetrieval, (req, res) =>
    OrderItemsController.getOrderItemById(req, res)
);
// Route to update an order item
router.put('/:order_item_id', ValidateOrderItemUpdate, (req, res) =>
    OrderItemsController.updateOrderItem(req, res)
);
// Route to delete an order item
router.delete('/:order_item_id', ValidateOrderItemDeletion, (req, res) =>
    OrderItemsController.deleteOrderItem(req, res)
);
// Route to get order items by order ID
router.get('/order/:order_id', ValidateOrderItemsByOrderId, (req, res) =>
    OrderItemsController.getOrderItemsByOrderId(req, res)
);
// Route to get order items by menu item ID
router.get('/menu/:menu_item_id',ValidateOrderItemsByMenuItemId, (req, res) =>
    OrderItemsController.getOrderItemsByMenuItemId(req, res)
);
//Route to get order Items by quantity
router.get('/quantity/:quantity',ValidateOrderItemsByQuantity, (req, res) =>
    OrderItemsController.getOrderItemsByQuantity(req, res)
);
// Route to get order items by price
router.get('/price/:price',ValidateOrderItemsByPrice, (req, res) =>
    OrderItemsController.getOrderItemsByPrice(req, res)
);

//Route to get total price by order ID
router.get('/total/:order_id',ValidateOrderItemsByOrderId, (req, res) =>
    OrderItemsController.getTotalPriceByOrderId(req, res)
);
//Route to get total quantity by order ID
router.get('/totalQuantity/:order_id',ValidateOrderItemsByOrderId, (req, res) =>
    OrderItemsController.getTotalQuantityByOrderId(req, res)
);


module.exports = router;
