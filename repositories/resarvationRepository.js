const sequelize=require('../config/sequelize');
const Reservation= require('../models/reservationModel');
class ReservationRepository  {

    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; 
    }
    static async createReservation(reservationData) {
        const t = await sequelize.transaction();
        try {
            const existingReservation = await this.getReservationByName(reservationData.customer_name, { transaction: t });
            if (existingReservation) {
                throw new Error(`Reservation with name ${reservationData.customer_name} already exists`);
            }
            const reservation = await Reservation.create({
                customer_name: reservationData.customer_name,
                contact_info: reservationData.contact_info,
                tableNumber: reservationData.tableNumber,
                reservation_time: reservationData.reservation_time,
                number_of_guests: reservationData.number_of_guests,
                status: reservationData.status,
            }, { transaction: t });

            await t.commit();
            return reservation;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createReservation', t);
        }

    }
    static async getAllReservations() {
        try {
            return await Reservation.findAll();
        } catch (e) {
            this.handleError(e, 'getAllReservations');
        }
    }
    static async getReservationByName(customer_name) {
        try {
            const reservation = await Reservation.findOne({ where: { customer_name } });
            return reservation;
        } catch (e) {
            this.handleError(e, 'getReservationByName');
        }
    }
    static async getReservationById(reservation_id) {
        try {
            const reservation = await Reservation.findOne({ where: { reservation_id } });
            return reservation;
        } catch (e) {
            this.handleError(e, 'getReservationById');
        }
    }
    static async updateReservation(reservation_id, updates) {
        const t = await sequelize.transaction();
        try {
            const reservation = await this.getReservationById(reservation_id, { transaction: t });
            if (!reservation) {
                throw new Error(`Reservation with ID ${reservation_id} not found`);
            }
            const updatedReservation = await reservation.update(updates, { transaction: t });
            await t.commit();
            return updatedReservation;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateReservation', t);
        }
    }
    static async deleteReservation(reservation_id) {
        const t = await sequelize.transaction();
        try {
            const reservation = await this.getReservationById(reservation_id, { transaction: t });
            if (!reservation) {
                throw new Error(`Reservation with ID ${reservation_id} not found`);
            }
            await reservation.destroy({ transaction: t });
            await t.commit();
            return reservation;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteReservation', t);
        }
    }
    static async getLastUpdatedReservations(amount) {
        try {
            amount = amount || 10; // Default to 10 if no amount is provided
            const reservations = await Reservation.findAll({
                order: [['updatedAt', 'DESC']],
                limit: amount,
            });
            return reservations;
        } catch (e) {
            this.handleError(e, 'getLastUpdatedReservations');
        }
    }
    static async getReservationByTableNumber(tableNumber) {
        try {
            const reservation = await Reservation.findOne({ where: { tableNumber } });
            return reservation;
        } catch (e) {
            this.handleError(e, 'getReservationByTableNumber');
        }
    }
    static async getReservationByContactInfo(contact_info) {
        try {
            const reservation = await Reservation.findOne({ where: { contact_info } });
            return reservation;
        } catch (e) {
            this.handleError(e, 'getReservationByContactInfo');
        }
    }
    static async getReservationByStatus(status) {
        try {
            const reservation = await Reservation.findOne({ where: { status } });
            return reservation;
        } catch (e) {
            this.handleError(e, 'getReservationByStatus');
        }
    }
    static async getReservationByTime(reservation_time) {
        try {
            const reservation = await Reservation.findOne({ where: { reservation_time } });
            return reservation;
        } catch (e) {
            this.handleError(e, 'getReservationByTime');
        }
    }
    static async getReservationByNumberOfGuests(number_of_guests) {
        try {
            const reservation = await Reservation.findOne({ where: { number_of_guests } });
            return reservation;
        } catch (e) {
            this.handleError(e, 'getReservationByNumberOfGuests');
        }
    }
    static async getReservationByCustomerName(customer_name) {
        try {
            const reservation = await Reservation.findOne({ where: { customer_name } });
            return reservation;
        }
        catch (e) {
            this.handleError(e, 'getReservationByCustomerName');
        }
    }

    
   static async bookReservation(reservation_id) {
        const t = await sequelize.transaction();
        try {
            const reservation = await this.getReservationById(reservation_id, { transaction: t });
            if (!reservation) {
                throw new Error(`Reservation with ID ${reservation_id} not found`);
            }
            reservation.status = 'booked';
            await reservation.save({ transaction: t });
            await t.commit();
            return reservation;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'bookReservation', t);
        }
    }
    static async completeReservation(reservation_id) {
        const t = await sequelize.transaction();
        try {
            const reservation = await this.getReservationById(reservation_id, { transaction: t });
            if (!reservation) {
                throw new Error(`Reservation with ID ${reservation_id} not found`);
            }
            reservation.status = 'completed';
            await reservation.save({ transaction: t });
            await t.commit();
            return reservation;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'completeReservation', t);
        }
    }
    static async cancelReservation(reservation_id) {
        const t = await sequelize.transaction();
        try {
            const reservation = await this.getReservationById(reservation_id, { transaction: t });
            if (!reservation) {
                throw new Error(`Reservation with ID ${reservation_id} not found`);
            }
            reservation.status = 'cancelled';
            await reservation.save({ transaction: t });
            await t.commit();
            return reservation;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'cancelReservation', t);
        }
    }

}
module.exports = ReservationRepository;


