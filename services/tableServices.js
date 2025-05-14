const TableRepository= require('../repositories/tableRepository');



class TableServices {
    static async createTable(tableData) {
        return TableRepository.createTable(tableData);
    }

    static getAllTables() {
        return TableRepository.getAllTables();
    }

    static getTableByNumber(number) {
        return TableRepository.getTableByNumber(number);
    }

    static getTableById(table_id) {
        return TableRepository.getTableById(table_id);
    }

    static async updateTable(table_id, tableData) {
        return TableRepository.updateTable(table_id, tableData);
    }
    static async deleteTable(table_id) {
        return TableRepository.deleteTable(table_id);
    }
    static async getTableByStatus(status) {
        return TableRepository.getTableByStatus(status);
    }
}
module.exports=TableServices;