const ReservationService= require('../services/reservationService');

class ReservationController {
    static handleError(res, error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'An error occurred' });
    }

    static async createReservation(req, res) {
        try {
            const reservationData = req.body;
            const reservation = await ReservationService.createReservation(reservationData);
            res.status(201).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getAllReservations(req, res) {
        try {
            const reservations = await ReservationService.getAllReservations();
            res.status(200).json(reservations);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getReservationById(req, res) {
        try {
            const { reservation_id } = req.params;
            const reservation = await ReservationService.getReservationById(reservation_id);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
  
    static async updateReservation(req, res) {
        try {
            const { reservation_id } = req.params;
            const updates = req.body;
            const updatedReservation = await ReservationService.updateReservation(reservation_id, updates);
            res.status(200).json(updatedReservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async deleteReservation(req, res) {
        try {
            const { reservation_id } = req.params;
            const deletedReservation = await ReservationService.deleteReservation(reservation_id);
            res.status(200).json(deletedReservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getLastUpdatedReservation(req, res) {
        try {
            const { amount } = req.params;
            const reservations = await ReservationService.getLastUpdatedReservation(amount);
            res.status(200).json(reservations);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getReservationByCustomerName(req, res) {
        try {
            const { customer_name } = req.params;
            const reservation = await ReservationService.getReservationByCustomerName(customer_name);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getReservationByContactInfo(req, res) {
        try {
            const { contact_info } = req.params;
            const reservation = await ReservationService.getReservationByContactInfo(contact_info);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getReservationByTableNumber(req, res) {
        try {
            const { tableNumber } = req.params;
            const reservation = await ReservationService.getReservationByTableNumber(tableNumber);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getReservationByStatus(req, res) {
        try {
            const { status } = req.params;
            const reservation = await ReservationService.getReservationByStatus(status);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getReservationByTime(req, res) {
        try {
            const { reservation_time } = req.params;
            const reservation = await ReservationService.getReservationByTime(reservation_time);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async getReservationByNumberOfGuests(req, res) {
        try {
            const { number_of_guests } = req.params;
            const reservation = await ReservationService.getReservationByNumberOfGuests(number_of_guests);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async bookReservation(req, res) {
        try {
            const { reservation_id } = req.params;
            const reservation = await ReservationService.bookReservation(reservation_id);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async completeReservation(req, res) {
        try {
            const { reservation_id } = req.params;
            const reservation = await ReservationService.completeReservation(reservation_id);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
    static async cancelReservation(req, res) {
        try {
            const { reservation_id } = req.params;
            const reservation = await ReservationService.cancelReservation(reservation_id);
            res.status(200).json(reservation);
        } catch (error) {
            ReservationController.handleError(res, error);
        }
    }
}

module.exports = ReservationController;