const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.listByCompany);
router.post('/', employeeController.create);
router.get('/:id', employeeController.getOne);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

module.exports = router;
