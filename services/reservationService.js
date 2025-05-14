
const ReservationRepository= require('../repositories/resarvationRepository');
const tableRepository = require('../repositories/tableRepository');

class ReservationService {
    static async createReservation(reservationData) {
        return ReservationRepository.createReservation(reservationData);
    }

    static async getAllReservations() {
        return ReservationRepository.getAllReservations();
    }

    static async getReservationById(reservation_id) {
        return ReservationRepository.getReservationById(reservation_id);
    }
    static async getReservationByName(customer_name) {
        return ReservationRepository.getReservationByName(customer_name);
    }

    static async updateReservation(reservation_id, updates) {
        if(updates.table_id) {
            const table = await tableRepository.getTableById(updates.table_id);
            if (!table) {
                throw new Error('Table not found');
            }
                if (!updates || typeof updates !== 'object') {
      throw new Error("No updates provided");
    }
        }
        return ReservationRepository.updateReservation(reservation_id, updates);
    }

    static async deleteReservation(reservation_id) {
        return ReservationRepository.deleteReservation(reservation_id);
 
    }
   static async getLastUpdatedReservation(amount) {
        return ReservationRepository.getLastUpdatedReservation(amount);
    }
    static async getReservationByCustomerName(customer_name) {
        return ReservationRepository.getReservationByCustomerName(customer_name);
    }
    static async getReservationByContactInfo(contact_info) {
        return ReservationRepository.getReservationByContactInfo(contact_info);
    }
    static async getReservationByTableNumber(tableNumber) {
        return ReservationRepository.getReservationByTableNumber(tableNumber);
    }
    static async getReservationByStatus(status) {
        return ReservationRepository.getReservationByStatus(status);
    }
    static async getReservationByTime(reservation_time) {
        return ReservationRepository.getReservationByTime(reservation_time);
    }
    static async getReservationByNumberOfGuests(number_of_guests) {
        return ReservationRepository.getReservationByNumberOfGuests(number_of_guests);
    }
    static async bookReservation(reservation_id) {
        return ReservationRepository.bookReservation(reservation_id);
    }
    static async completeReservation(reservation_id) {
        return ReservationRepository.completeReservation(reservation_id);
    }
    static async cancelReservation(reservation_id) {
        return ReservationRepository.cancelReservation(reservation_id);
    }
  

}
module.exports = ReservationService;