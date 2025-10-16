const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/companyController');
const { isCompany } = require('../middlewares/authMiddleware');

// Toutes les routes sont protégées par isCompany
router.use(isCompany);

// Dashboard principal
router.get('/dashboard', companyController.dashboard);

// Gestion des offres
router.get('/advertisements', companyController.listAdvertisements);
router.get('/advertisements/new', companyController.newAdvertisementForm);
router.post('/advertisements', companyController.createAdvertisement);
router.get('/advertisements/:id/edit', companyController.editAdvertisementForm);
router.post('/advertisements/:id/edit', companyController.updateAdvertisement);
router.post('/advertisements/:id/delete', companyController.deleteAdvertisement);
router.post('/advertisements/:id/toggle', companyController.toggleAdvertisement);

// Gestion des candidatures
router.get('/applications', companyController.listApplications);
router.get('/applications/:id', companyController.viewApplication);
router.post('/applications/:id/status', companyController.updateApplicationStatus);

module.exports = router;

