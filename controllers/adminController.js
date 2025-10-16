const User = require('../Models/User');
const Candidate = require('../Models/Candidate');
const Company = require('../Models/Company');
const Advertisement = require('../Models/Advertisement');
const Application = require('../Models/Application');

exports.dashboard = (req, res) => {
    res.render('admin/dashboard-pro', { title: 'Administration' });
};

exports.listUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        const users = await User.getAll(limit, offset);
        const total = await User.count();
        const totalPages = Math.ceil(total / limit);

        res.render('admin/users/list-pro', {
            title: 'Gestion des utilisateurs',
            users,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};

exports.listCandidates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        const candidates = await Candidate.getAll(limit, offset);
        const total = await Candidate.count();
        const totalPages = Math.ceil(total / limit);

        res.render('admin/candidates/list-pro', {
            title: 'Gestion des candidats',
            candidates,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};

exports.listCompanies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        const companies = await Company.getAll(limit, offset);
        const total = await Company.count();
        const totalPages = Math.ceil(total / limit);

        res.render('admin/companies/list-pro', {
            title: 'Gestion des entreprises',
            companies,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};

exports.listAdvertisements = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        const advertisements = await Advertisement.getAll(limit, offset);
        const total = await Advertisement.count();
        const totalPages = Math.ceil(total / limit);

        res.render('admin/advertisements/list-pro', {
            title: 'Gestion des annonces',
            advertisements,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};

exports.listApplications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        const applications = await Application.getAll(limit, offset);
        const total = await Application.count();
        const totalPages = Math.ceil(total / limit);

        res.render('admin/applications/list-pro', {
            title: 'Gestion des candidatures',
            applications,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.delete(req.params.id);
        req.session.success = 'Utilisateur supprimé avec succès';
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la suppression';
        res.redirect('/admin/users');
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        await Candidate.delete(req.params.id);
        req.session.success = 'Candidat supprimé avec succès';
        res.redirect('/admin/candidates');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la suppression';
        res.redirect('/admin/candidates');
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        await Company.delete(req.params.id);
        req.session.success = 'Entreprise supprimée avec succès';
        res.redirect('/admin/companies');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la suppression';
        res.redirect('/admin/companies');
    }
};

exports.deleteAdvertisement = async (req, res) => {
    try {
        await Advertisement.delete(req.params.id);
        req.session.success = 'Annonce supprimée avec succès';
        res.redirect('/admin/advertisements');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la suppression';
        res.redirect('/admin/advertisements');
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        await Application.delete(req.params.id);
        req.session.success = 'Candidature supprimée avec succès';
        res.redirect('/admin/applications');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la suppression';
        res.redirect('/admin/applications');
    }
};
