const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/', companyController.list);
router.post('/', companyController.create);
router.get('/:id', companyController.getOne);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);

module.exports = router;
