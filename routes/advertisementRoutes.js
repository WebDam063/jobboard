const express = require('express');
const router = express.Router();
const advertisementController = require('../Controllers/advertisementController');

router.get('/:id', advertisementController.show);
router.get('/:id/details', advertisementController.getDetails);

module.exports = router;

