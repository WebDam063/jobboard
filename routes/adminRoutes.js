const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { isAdmin } = require('../middlewares/authMiddleware');

router.use(isAdmin);

router.get('/', adminController.dashboard);

router.get('/users', adminController.listUsers);
router.post('/users/:id/delete', adminController.deleteUser);

router.get('/candidates', adminController.listCandidates);
router.post('/candidates/:id/delete', adminController.deleteCandidate);

router.get('/companies', adminController.listCompanies);
router.post('/companies/:id/delete', adminController.deleteCompany);

router.get('/advertisements', adminController.listAdvertisements);
router.post('/advertisements/:id/delete', adminController.deleteAdvertisement);

router.get('/applications', adminController.listApplications);
router.post('/applications/:id/delete', adminController.deleteApplication);

module.exports = router;

