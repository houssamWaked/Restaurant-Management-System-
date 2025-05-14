const {body,param,validationResult} = require('express-validator');
const handleValidationErrors = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}
const ValidateOrderCreation = [
    body('customer_name')
        .notEmpty().withMessage('Customer name is required')
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),
    
    body('menu_items')
        .isArray().withMessage('Menu items must be an array')
        .notEmpty().withMessage('Menu items are required'),

    body('total_price')
        .notEmpty().withMessage('Total price is required')
        .isFloat({gt:0}).withMessage('Total price must be a positive number'),

    handleValidationErrors,
];
const ValidateOrderIdParam = [
    param('order_id')
        .isInt({gt:0}).withMessage('Order ID must be a positive integer'),
    handleValidationErrors,
];
const ValidateOrderCustomerNameParam = [
    param('customer_name')
        .notEmpty().withMessage('Customer name is required')
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),
    handleValidationErrors,
];
const ValidateOrderUpdate = [
    body('customer_name')
        .optional()
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),

    body('menu_items')
        .optional()
        .isArray().withMessage('Menu items must be an array'),

    body('total_price')
        .optional()
        .isFloat({gt:0}).withMessage('Total price must be a positive number'),

    handleValidationErrors,
];
const ValidateOrderDateRange = [
    param('startDate')
        .notEmpty().withMessage('Start date is required')
        .isDate().withMessage('Start date must be a valid date'),

    param('endDate')
        .notEmpty().withMessage('End date is required')
        .isDate().withMessage('End date must be a valid date'),

    handleValidationErrors,
];
const ValidateOrderCustomerNameAndDateRange = [
    param('customer_name')
        .notEmpty().withMessage('Customer name is required')
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),

    param('startDate')
        .notEmpty().withMessage('Start date is required')
        .isDate().withMessage('Start date must be a valid date'),

    param('endDate')
        .notEmpty().withMessage('End date is required')
        .isDate().withMessage('End date must be a valid date'),

    handleValidationErrors,
];
const ValidateOrderAmountParam = [
    param('amount')
        .optional()
        .isInt({gt:0}).withMessage('Amount must be a positive integer'),
    handleValidationErrors,
];

module.exports = {
    ValidateOrderCreation,
    ValidateOrderIdParam,
    ValidateOrderCustomerNameParam,
    ValidateOrderUpdate,
    ValidateOrderDateRange,
    ValidateOrderCustomerNameAndDateRange,
    ValidateOrderAmountParam,
};