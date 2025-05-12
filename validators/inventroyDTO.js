const{body,param,validationResult} = require('express-validator');


const handleValidationErrors = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}

const ValidateInventoryCreation = [
    body('item_name')
        .notEmpty().withMessage('Item name is required')
        .isLength({min:3}).withMessage('Item name must be at least 3 characters'),
    
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({gt:0}).withMessage('Quantity must be a positive integer'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({gt:0}).withMessage('Price must be a positive number'),

    handleValidationErrors,
];
const ValidateInventoryIdParam = [
    param('inventory_id')
        .isInt({gt:0}).withMessage('Inventory ID must be a positive integer'),
    handleValidationErrors,
];
const ValidateInventoryNameParam = [
    param('item_name')
        .notEmpty().withMessage('Item name is required')
        .isLength({min:3}).withMessage('Item name must be at least 3 characters'),
    handleValidationErrors,
];
const ValidateInventoryUpdate = [
    body('item_name')
        .optional()
        .isLength({min:3}).withMessage('Item name must be at least 3 characters'),

    body('quantity')
        .optional()
        .isInt({gt:0}).withMessage('Quantity must be a positive integer'),

    body('price')
        .optional()
        .isFloat({gt:0}).withMessage('Price must be a positive number'),

    handleValidationErrors,
];

const ValidateInventoryLastUpdatedParam = [
    param('amount')
        .notEmpty().withMessage('Last updated amount is required')
       .isInt({gt:0}).withMessage('Last updated amount must be a positive integer'),
    handleValidationErrors,
];

module.exports = {
    ValidateInventoryCreation,
    ValidateInventoryIdParam,
    ValidateInventoryNameParam,
    ValidateInventoryUpdate,
   
    ValidateInventoryLastUpdatedParam,
};