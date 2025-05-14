const {body,param,validationResult} = require('express-validator');
const handleValidationErrors = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
const ValidateTableCreation = [
    body('number')
        .notEmpty().withMessage('Table number is required')
        .isInt({ gt: 0 }).withMessage('Table number must be a positive integer'),
    
    body('seats')
        .notEmpty().withMessage('Number of seats is required')
        .isInt({ gt: 0 }).withMessage('Number of seats must be a positive integer'),
    
    body('status')
        .optional()
        .isIn(['available', 'reserved']).withMessage('Status must be either available or reserved'),

    handleValidationErrors,
];
const ValidateTableIdParam = [
    param('table_id')
        .isInt({ gt: 0 }).withMessage('Table ID must be a positive integer'),
    handleValidationErrors,
];  
const ValidateTableNumberParam = [
    param('number')
        .isInt({ gt: 0 }).withMessage('Table number must be a positive integer'),
    handleValidationErrors,
];
const ValidateTableUpdate = [
    body('number')
        .optional()
        .isInt({ gt: 0 }).withMessage('Table number must be a positive integer'),
    
    body('seats')
        .optional()
        .isInt({ gt: 0 }).withMessage('Number of seats must be a positive integer'),
    
    body('status')
        .optional()
        .isIn(['available', 'reserved']).withMessage('Status must be either available or reserved'),

    handleValidationErrors,
];
module.exports = {
    ValidateTableCreation,
    ValidateTableIdParam,
    ValidateTableNumberParam,
    ValidateTableUpdate
};