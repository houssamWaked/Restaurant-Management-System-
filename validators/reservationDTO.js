const {body,param,validationResult} = require('express-validator');
const handleValidationErrors = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}
const ValidateReservationCreation = [
    body('customer_name')
        .notEmpty().withMessage('Customer name is required')
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),
    
    body('contact_info')
        .notEmpty().withMessage('Contact info is required')
        .isEmail().withMessage('Contact info must be a valid email address'),

    body('tableNumber')
        .notEmpty().withMessage('Table number is required')
        .isInt({gt:0}).withMessage('Table number must be a positive integer'),

    body('reservation_time')
        .notEmpty().withMessage('Reservation time is required')
        .isISO8601().withMessage('Reservation time must be a valid date'),

    body('number_of_guests')
        .notEmpty().withMessage('Number of guests is required')
        .isInt({gt:0}).withMessage('Number of guests must be a positive integer'),

    handleValidationErrors,
];
const ValidateReservationIdParam = [
    param('reservation_id')
        .isInt({gt:0}).withMessage('Reservation ID must be a positive integer'),
    handleValidationErrors,
];
const ValidateReservationNameParam = [
    param('customer_name')
        .notEmpty().withMessage('Customer name is required')
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),
    handleValidationErrors,
];
const ValidateReservationUpdate = [
    body('customer_name')
        .optional()
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),

    body('contact_info')
        .optional()
        .isEmail().withMessage('Contact info must be a valid email address'),

    body('tableNumber')
        .optional()
        .isInt({gt:0}).withMessage('Table number must be a positive integer'),

    body('reservation_time')
        .optional()
        .isISO8601().withMessage('Reservation time must be a valid date'),

    body('number_of_guests')
        .optional()
        .isInt({gt:0}).withMessage('Number of guests must be a positive integer'),

    handleValidationErrors,
];
const ValidateReservationLastUpdatedParam = [
    param('amount')
        .notEmpty().withMessage('Last updated amount is required')
        .isInt({gt:0}).withMessage('Last updated amount must be a positive integer'),
    handleValidationErrors,
];
const ValidateReservationStatusParam = [
    param('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Status must be one of the following: pending, confirmed, completed, cancelled'),
    handleValidationErrors,
];
const ValidateReservationTimeParam = [
    param('reservation_time')
        .notEmpty().withMessage('Reservation time is required')
        .isISO8601().withMessage('Reservation time must be a valid date'),
    handleValidationErrors,
];
const ValidateReservationNumberOfGuestsParam = [
    param('number_of_guests')
        .notEmpty().withMessage('Number of guests is required')
        .isInt({gt:0}).withMessage('Number of guests must be a positive integer'),
    handleValidationErrors,
];
const ValidateReservationTableNumberParam = [
    param('tableNumber')
        .notEmpty().withMessage('Table number is required')
        .isInt({gt:0}).withMessage('Table number must be a positive integer'),
    handleValidationErrors,
];
const ValidateReservationCustomerNameParam = [
    param('customer_name')
        .notEmpty().withMessage('Customer name is required')
        .isLength({min:3}).withMessage('Customer name must be at least 3 characters'),
    handleValidationErrors,
];
const ValidateReservationContactInfoParam = [
    param('contact_info')
        .notEmpty().withMessage('Contact info is required')
        .isEmail().withMessage('Contact info must be a valid email address'),
    handleValidationErrors,
];
const ValidateReservationStatusUpdate = [
    body('status')
        .optional()
        .isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Status must be one of the following: pending, confirmed, completed, cancelled'),
    handleValidationErrors,
];
const ValidateReservationId = [
    param('reservation_id')
        .isInt({gt:0}).withMessage('Reservation ID must be a positive integer'),
    handleValidationErrors,
];


module.exports = {
    ValidateReservationCreation,
    ValidateReservationIdParam,
    ValidateReservationNameParam,
    ValidateReservationUpdate,
    ValidateReservationLastUpdatedParam,
    ValidateReservationStatusParam,
    ValidateReservationTimeParam,
    ValidateReservationNumberOfGuestsParam,
    ValidateReservationTableNumberParam,
    ValidateReservationCustomerNameParam,
    ValidateReservationContactInfoParam,
    ValidateReservationStatusUpdate,
    ValidateReservationId
};