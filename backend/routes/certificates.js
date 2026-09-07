const { Router } = require('express');
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificatesController');
const router = Router();
router.get('/', getCertificates);
router.post('/', createCertificate);
router.put('/update', updateCertificate);
router.delete('/:id', deleteCertificate);
module.exports = router;
