const {body,param,validationResult} = require('express-validator');
const handleValidationErrors = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}
const ValidateOrderItemCreation = [
    body('order_id')
        .notEmpty().withMessage('Order ID is required')
        .isInt({gt:0}).withMessage('Order ID must be a positive integer'),
    
    body('menu_item_id')
        .notEmpty().withMessage('Menu Item ID is required')
        .isInt({gt:0}).withMessage('Menu Item ID must be a positive integer'),

    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({gt:0}).withMessage('Quantity must be a positive integer'),

    handleValidationErrors,
];
const ValidateOrderItemUpdate = [
    param('order_item_id')
        .notEmpty().withMessage('Order Item ID is required')
        .isInt({gt:0}).withMessage('Order Item ID must be a positive integer'),

    body('order_id')
        .optional()
        .isInt({gt:0}).withMessage('Order ID must be a positive integer'),

    body('menu_item_id')
        .optional()
        .isInt({gt:0}).withMessage('Menu Item ID must be a positive integer'),

    body('quantity')
        .optional()
        .isInt({gt:0}).withMessage('Quantity must be a positive integer'),

    handleValidationErrors,
];
const ValidateOrderItemDeletion = [
    param('order_item_id')
        .notEmpty().withMessage('Order Item ID is required')
        .isInt({gt:0}).withMessage('Order Item ID must be a positive integer'),

    handleValidationErrors,
];
const ValidateOrderItemRetrieval = [
    param('order_item_id')
        .notEmpty().withMessage('Order Item ID is required')
        .isInt({gt:0}).withMessage('Order Item ID must be a positive integer'),

    handleValidationErrors,
];
const ValidateOrderItemsByOrderId = [
    param('order_id')
        .notEmpty().withMessage('Order ID is required')
        .isInt({gt:0}).withMessage('Order ID must be a positive integer'),

    handleValidationErrors,
];
const ValidateOrderItemsByMenuItemId = [
    param('menu_item_id')
        .notEmpty().withMessage('Menu Item ID is required')
        .isInt({gt:0}).withMessage('Menu Item ID must be a positive integer'),

    handleValidationErrors,
];
const ValidateOrderItemsByQuantity = [
    param('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({gt:0}).withMessage('Quantity must be a positive integer'),

    handleValidationErrors,
];
const ValidateOrderItemsByPrice = [
    param('price')
        .notEmpty().withMessage('Price is required')
        .isDecimal().withMessage('Price must be a decimal number'),

    handleValidationErrors,
];

module.exports = {
    ValidateOrderItemCreation,
    ValidateOrderItemUpdate,
    ValidateOrderItemDeletion,
    ValidateOrderItemRetrieval,
    ValidateOrderItemsByOrderId,
    ValidateOrderItemsByMenuItemId,
    ValidateOrderItemsByQuantity,
    ValidateOrderItemsByPrice,
};