const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');
const {
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
} = require('../validators/reservationDTO');

// Route to create a new reservation
router.post('/', ValidateReservationCreation, (req, res) =>
    ReservationController.createReservation(req, res)
);
// Route to get all reservations
router.get('/', (req, res) => ReservationController.getAllReservations(req, res));
// Route to get reservation by name
router.get('/name/:customer_name', ValidateReservationNameParam, (req, res) =>
    ReservationController.getReservationByCustomerName(req, res)
);
// Route to get reservation by ID
router.get('/id/:reservation_id', ValidateReservationIdParam, (req, res) =>
    ReservationController.getReservationById(req, res)
);
// Route to update reservation by ID
router.put('/:reservation_id', [ValidateReservationIdParam, ValidateReservationUpdate], (req, res) =>
    ReservationController.updateReservation(req, res)
);
// Route to delete reservation by ID
router.delete('/:reservation_id', ValidateReservationIdParam, (req, res) =>
    ReservationController.deleteReservation(req, res)
);

// Route to get last updated reservation
router.get('/last-updated/:amount', ValidateReservationLastUpdatedParam, (req, res) =>
    ReservationController.getLastUpdatedReservation(req, res)
);
//Route to get resarvation by contact info
router.get('/contact/:contact_info', ValidateReservationContactInfoParam, (req, res) =>
    ReservationController.getReservationByContactInfo(req, res)
)

//Route to get reservation by status
router.get('/status/:status', ValidateReservationStatusParam, (req, res) =>
    ReservationController.getReservationByStatus(req, res)
)
//Route to get reservation by reservation time
router.get('/reservation_time/:reservation_time', ValidateReservationTimeParam, (req, res) =>
    ReservationController.getReservationByReservationTime(req, res)
)
//Route to get reservation by number of guests
router.get('/number_of_guests/:number_of_guests', ValidateReservationNumberOfGuestsParam, (req, res) =>
    ReservationController.getReservationByNumberOfGuests(req, res)
)
//Route to get reservation by table number
router.get('/tableNumber/:tableNumber', ValidateReservationTableNumberParam, (req, res) =>
    ReservationController.getReservationByTableNumber(req, res)
)
//Route to book reservation
router.post('/book/:reservation_id', ValidateReservationId, (req, res) =>
    ReservationController.bookReservation(req, res)
)
//Route to complete reservation
router.post('/complete/:reservation_id', ValidateReservationId, (req, res) =>
    ReservationController.completeReservation(req, res)
)
//Route to cancel reservation
router.post('/cancel/:reservation_id', ValidateReservationId, (req, res) =>
    ReservationController.cancelReservation(req, res)
)


module.exports = router;

