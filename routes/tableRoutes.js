const express= require('express');
const router= express.Router();
const TableController= require('../controllers/tableController');
const{
    ValidateTableCreation,
    ValidateTableIdParam,
    ValidateTableNumberParam,
    ValidateTableUpdate
}=require('../validators/tableDTO');
// Route to create a new table
router.post('/', ValidateTableCreation, (req, res) =>
    TableController.createTable(req, res)
);
// Route to get all tables
router.get('/', (req, res) => TableController.getAllTables(req, res));
// Route to get table by number
router.get('/number/:number', ValidateTableNumberParam, (req, res) =>
    TableController.getTableByNumber(req, res)
);
// Route to get table by ID
router.get('/id/:table_id', ValidateTableIdParam, (req, res) =>
    TableController.getTableById(req, res)
);
// Route to update table by ID
router.put('/:table_id', [ValidateTableIdParam, ValidateTableUpdate], (req, res) =>
    TableController.updateTable(req, res)
);
// Route to delete table by ID
router.delete('/:table_id', ValidateTableIdParam, (req, res) =>
    TableController.deleteTable(req, res)
);
// Route to get table by status
router.get('/status/:status', (req, res) =>
    TableController.getTableByStatus(req, res)
);

module.exports=router;