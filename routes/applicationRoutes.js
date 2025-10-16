const express = require('express');
const router = express.Router();
const applicationController = require('../Controllers/applicationController');
const { isAuthenticated, isCandidate } = require('../middlewares/authMiddleware');

router.post('/', applicationController.create);
router.get('/my-applications', isAuthenticated, isCandidate, applicationController.list);

module.exports = router;

