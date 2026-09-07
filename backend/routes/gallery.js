const { Router } = require('express');
const { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const router = Router();
router.get('/', getGallery);
router.post('/', createGalleryItem);
router.put('/update', updateGalleryItem);
router.delete('/:id', deleteGalleryItem);
module.exports = router;
