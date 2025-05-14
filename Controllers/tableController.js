const TableServices= require('../services/tableServices');


class TableController {
    static handleError(res, error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'An error occurred' });
    }
    static async createTable(req, res) {
        try {
            const tableData = req.body;
            const table = await TableServices.createTable(tableData);
            res.status(201).json(table);
        } catch (error) {
            TableController.handleError(res, error);
        }
    }
    static async getAllTables(req, res) {
        try {
            const tables = await TableServices.getAllTables();
            res.status(200).json(tables);
        } catch (error) {
            TableController.handleError(res, error);
        }
    }
    static async getTableByNumber(req, res) {
        try {
            const { number } = req.params;
            const table = await TableServices.getTableByNumber(number);
            res.status(200).json(table);
        } catch (error) {
            TableController.handleError(res, error);
        }
    }
    static async getTableById(req, res) {
        try {
            const { table_id } = req.params;
            const table = await TableServices.getTableById(table_id);
            res.status(200).json(table);
        } catch (error) {
            TableController.handleError(res, error);
        }
    }
    static async updateTable(req, res) {
        try {
            const { table_id } = req.params;
            const updates = req.body;
            const updatedTable = await TableServices.updateTable(table_id, updates);
            res.status(200).json(updatedTable);
        } catch (error) {
            TableController.handleError(res, error);
        }
    }
    static async deleteTable(req, res) {
        try {
            const { table_id } = req.params;
            await TableServices.deleteTable(table_id);
            res.status(204).send();
        } catch (error) {
            TableController.handleError(res, error);
        }
    }
    static async getTableByStatus(req, res) {
        try {
            const { status } = req.params;
            const tables = await TableServices.getTableByStatus(status);
            res.status(200).json(tables);
        } catch (error) {
            TableController.handleError(res, error);
        }
    }
}
module.exports=TableController;
