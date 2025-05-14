const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/ordersController');

const {
       ValidateOrderCreation,
    ValidateOrderIdParam,
    ValidateOrderCustomerNameParam,
    ValidateOrderUpdate,
    ValidateOrderDateRange,
    ValidateOrderCustomerNameAndDateRange,
    ValidateOrderAmountParam,
 
} = require('../validators/ordersDTO');


// Route to create a new order
router.post('/', ValidateOrderCreation, (req, res) =>
    OrderController.createOrder(req, res)
);
// Route to get all orders
router.get('/', (req, res) => OrderController.getAllOrders(req, res));
// Route to get order by ID
router.get('/id/:order_id', ValidateOrderIdParam, (req, res) =>
    OrderController.getOrderById(req, res)
);
// Route to get order by customer name
router.get('/customer_name/:customer_name', ValidateOrderCustomerNameParam, (req, res) =>
    OrderController.getOrdersByCustomerName(req, res)
);

//Route to update order by ID
router.put('/:order_id', ValidateOrderIdParam, ValidateOrderUpdate, (req, res) =>
    OrderController.updateOrder(req, res)
);
// Route to delete order by ID
router.delete('/:order_id', ValidateOrderIdParam, (req, res) =>
    OrderController.deleteOrder(req, res)
);
// Route to get orders by date range
router.get('/date_range',ValidateOrderDateRange, (req, res) =>
    OrderController.getOrdersByDateRange(req, res)
);
// Route to get latest updated order
router.get('/latest_updated',ValidateOrderAmountParam, (req, res) =>
    OrderController.getLatUpdateOrder(req, res)
);
// Route to get orders by customer name and date range
router.get('/customer_name/date_range',ValidateOrderCustomerNameAndDateRange ,(req, res) =>
    OrderController.getOrdersByCustomerNameAndDateRange(req, res)
);


module.exports = router;