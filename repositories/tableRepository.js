const sequelize=require('../config/sequelize');
const table=require('../models/tableModel');
class TableRepository {
    static handleError(e, method, transaction = null) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Database Error in ${method}:`, e);
        }
        if (transaction) {
            console.log(`Rolling back transaction due to error in ${method}`);
        }
        throw e; 
    }

    static async createTable(tableData) {
        const t = await sequelize.transaction();
        try {
            const existingTable = await this.getTableByNumber(tableData.number, { transaction: t });
            if (existingTable) {
                throw new Error(`Table with number ${tableData.number} already exists`);
            }
            const table = await table.create({
                number: tableData.number,
                seats: tableData.seats,
                status: tableData.status || 'available',
            }, { transaction: t });

            await t.commit();
            return table;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'createTable', t);
        }
    }
    static async getAllTables() {
        try {
            return await table.findAll();
        } catch (e) {
            this.handleError(e, 'getAllTables');
        }
    }
    static async getTableByNumber(number) {
        try {
            const table = await table.findOne({ where: { number } });
            return table;
        } catch (e) {
            this.handleError(e, 'getTableByNumber');
        }
    }
    static async getTableById(table_id) {
        try {
            const table = await table.findOne({ where: { table_id } });
            return table;
        } catch (e) {
            this.handleError(e, 'getTableById');
        }
    }
    static async updateTable(table_id, tableData) {
        const t = await sequelize.transaction();
        try {
            const table = await this.getTableById(table_id, {
                transaction: t
            });
            if (!table) {
                throw new Error(`Table with ID ${table_id} not found`);
            }
            await table.update(tableData, { transaction: t });
            await t.commit();
            return table;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'updateTable', t);
        }
    }
    static async deleteTable(table_id) {
        const t = await sequelize.transaction();
        try {
            const table = await this.getTableById(table_id, {
                transaction: t
            });
            if (!table) {
                throw new Error(`Table with ID ${table_id} not found`);
            }
            await table.destroy({ transaction: t });
            await t.commit();
            return table;
        } catch (e) {
            await t.rollback();
            this.handleError(e, 'deleteTable', t);
        }
    }
    static async getTableByStatus(status) {
        try {
            const table = await table.findAll({ where: { status } });
            return table;
        } catch (e) {
            this.handleError(e, 'getTableByStatus');
        }
    }
}

module.exports = TableRepository;