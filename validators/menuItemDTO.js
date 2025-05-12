const {body,param,validationResult} = require('express-validator');
const handleValidationErrors = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}
const ValidateMenuItemCreation = [
    body('menu_name')
        .notEmpty().withMessage('Menu name is required')
        .isLength({min:3}).withMessage('Menu name must be at least 3 characters'),
    
    body('category')
        .notEmpty().withMessage('Category is required')
        .isLength({min:3}).withMessage('Category must be at least 3 characters'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({gt:0}).withMessage('Price must be a positive number'),

    handleValidationErrors,
];
const ValidateMenuItemIdParam = [
    param('menu_id')
        .isInt({gt:0}).withMessage('Menu ID must be a positive integer'),
    handleValidationErrors,
];
const ValidateMenuItemNameParam = [
    param('menu_name')
        .notEmpty().withMessage('Menu name is required')
        .isLength({min:3}).withMessage('Menu name must be at least 3 characters'),
    handleValidationErrors,
];
const ValidateMenuItemUpdate = [
    body('menu_name')
        .optional()
        .isLength({min:3}).withMessage('Menu name must be at least 3 characters'),

    body('category')
        .optional()
        .isLength({min:3}).withMessage('Category must be at least 3 characters'),

    body('price')
        .optional()
        .isFloat({gt:0}).withMessage('Price must be a positive number'),

    handleValidationErrors,
];
const ValidateMenuItemCategoryParam = [
    param('category')
        .notEmpty().withMessage('Category is required')
        .isLength({min:3}).withMessage('Category must be at least 3 characters'),
    handleValidationErrors,
];

module.exports = {
    ValidateMenuItemCreation,
    ValidateMenuItemIdParam,
    ValidateMenuItemNameParam,
    ValidateMenuItemUpdate,
    ValidateMenuItemCategoryParam,
};