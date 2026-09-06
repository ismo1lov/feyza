const { Router } = require('express');
const { getServices, createService, updateService, deleteService } = require('../controllers/servicesController');
const router = Router();
router.get('/', getServices);
router.post('/', createService);
router.put('/update', updateService);
router.delete('/:id', deleteService);
module.exports = router;
