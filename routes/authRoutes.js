const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { isGuest } = require('../middlewares/authMiddleware');

router.get('/login', isGuest, authController.showLoginPage);
router.post('/login', authController.login);

router.get('/register/candidate', isGuest, authController.showRegisterCandidatePage);
router.post('/register/candidate', authController.registerCandidate);

router.get('/register/company', isGuest, authController.showRegisterCompanyPage);
router.post('/register/company', authController.registerCompany);

router.get('/logout', authController.logout);

module.exports = router;

