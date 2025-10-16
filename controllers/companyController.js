const Advertisement = require('../Models/Advertisement');
const Application = require('../Models/Application');
const Company = require('../Models/Company');

// Dashboard principal avec statistiques
exports.dashboard = async (req, res) => {
    try {
        const companyId = req.session.user.companyId;
        
        // Récupérer les statistiques
        const totalAds = await Advertisement.count({ company_id: companyId });
        const activeAds = await Advertisement.count({ company_id: companyId, is_active: true });
        const totalApplications = await Application.countByCompany(companyId);
        const pendingApplications = await Application.countByCompany(companyId, 'pending');
        
        // Récupérer les dernières offres
        const recentAds = await Advertisement.getAll(5, 0, { company_id: companyId });
        
        // Récupérer les dernières candidatures
        const recentApplications = await Application.getByCompany(companyId, 5, 0);
        
        res.render('company/dashboard', {
            title: 'Tableau de bord - Entreprise',
            user: req.session.user,
            stats: {
                totalAds,
                activeAds,
                totalApplications,
                pendingApplications
            },
            recentAds,
            recentApplications,
            success: req.session.success,
            error: req.session.error
        });
        
        delete req.session.success;
        delete req.session.error;
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur', user: req.session.user });
    }
};

// Liste des offres de l'entreprise
exports.listAdvertisements = async (req, res) => {
    try {
        const companyId = req.session.user.companyId;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        
        const advertisements = await Advertisement.getAll(limit, offset, { company_id: companyId });
        const total = await Advertisement.count({ company_id: companyId });
        const totalPages = Math.ceil(total / limit);
        
        res.render('company/advertisements/list', {
            title: 'Mes offres d\'emploi',
            user: req.session.user,
            advertisements,
            currentPage: page,
            totalPages,
            success: req.session.success,
            error: req.session.error
        });
        
        delete req.session.success;
        delete req.session.error;
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur', user: req.session.user });
    }
};

// Formulaire nouvelle offre
exports.newAdvertisementForm = (req, res) => {
    res.render('company/advertisements/new', {
        title: 'Créer une offre d\'emploi',
        user: req.session.user,
        error: req.session.error
    });
    delete req.session.error;
};

// Créer une offre
exports.createAdvertisement = async (req, res) => {
    try {
        const companyId = req.session.user.companyId;
        const { title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max } = req.body;
        
        // Validation
        if (!title || !short_description || !full_description) {
            req.session.error = 'Les champs titre, description courte et description complète sont obligatoires';
            return res.redirect('/company/advertisements/new');
        }
        
        await Advertisement.create(companyId, {
            title,
            short_description,
            full_description,
            location: location || null,
            contract_type: contract_type || null,
            working_time: working_time || null,
            salary_min: salary_min || null,
            salary_max: salary_max || null,
            is_active: true
        });
        
        req.session.success = 'Offre d\'emploi créée avec succès';
        res.redirect('/company/advertisements');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la création de l\'offre';
        res.redirect('/company/advertisements/new');
    }
};

// Formulaire modification offre
exports.editAdvertisementForm = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.session.user.companyId;
        
        const ad = await Advertisement.findById(id);
        
        if (!ad) {
            req.session.error = 'Offre non trouvée';
            return res.redirect('/company/advertisements');
        }
        
        // Vérifier que l'offre appartient à l'entreprise
        if (ad.company_id !== companyId) {
            req.session.error = 'Accès non autorisé';
            return res.redirect('/company/advertisements');
        }
        
        res.render('company/advertisements/edit', {
            title: 'Modifier l\'offre',
            user: req.session.user,
            ad,
            error: req.session.error
        });
        delete req.session.error;
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur', user: req.session.user });
    }
};

// Mettre à jour une offre
exports.updateAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.session.user.companyId;
        const { title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max } = req.body;
        
        const ad = await Advertisement.findById(id);
        
        if (!ad || ad.company_id !== companyId) {
            req.session.error = 'Offre non trouvée ou accès non autorisé';
            return res.redirect('/company/advertisements');
        }
        
        await Advertisement.update(id, {
            title,
            short_description,
            full_description,
            location: location || null,
            contract_type: contract_type || null,
            working_time: working_time || null,
            salary_min: salary_min || null,
            salary_max: salary_max || null
        });
        
        req.session.success = 'Offre mise à jour avec succès';
        res.redirect('/company/advertisements');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la mise à jour';
        res.redirect(`/company/advertisements/${req.params.id}/edit`);
    }
};

// Supprimer une offre
exports.deleteAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.session.user.companyId;
        
        const ad = await Advertisement.findById(id);
        
        if (!ad || ad.company_id !== companyId) {
            req.session.error = 'Offre non trouvée ou accès non autorisé';
            return res.redirect('/company/advertisements');
        }
        
        await Advertisement.delete(id);
        
        req.session.success = 'Offre supprimée avec succès';
        res.redirect('/company/advertisements');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la suppression';
        res.redirect('/company/advertisements');
    }
};

// Activer/désactiver une offre
exports.toggleAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.session.user.companyId;
        
        const ad = await Advertisement.findById(id);
        
        if (!ad || ad.company_id !== companyId) {
            req.session.error = 'Offre non trouvée ou accès non autorisé';
            return res.redirect('/company/advertisements');
        }
        
        await Advertisement.update(id, {
            is_active: !ad.is_active
        });
        
        req.session.success = ad.is_active ? 'Offre désactivée' : 'Offre activée';
        res.redirect('/company/advertisements');
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la modification';
        res.redirect('/company/advertisements');
    }
};

// Liste des candidatures
exports.listApplications = async (req, res) => {
    try {
        const companyId = req.session.user.companyId;
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const offset = (page - 1) * limit;
        const status = req.query.status || '';
        
        const applications = await Application.getByCompany(companyId, limit, offset, status);
        const total = await Application.countByCompany(companyId, status);
        const totalPages = Math.ceil(total / limit);
        
        res.render('company/applications/list', {
            title: 'Candidatures reçues',
            user: req.session.user,
            applications,
            currentPage: page,
            totalPages,
            filterStatus: status,
            success: req.session.success,
            error: req.session.error
        });
        
        delete req.session.success;
        delete req.session.error;
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur', user: req.session.user });
    }
};

// Voir une candidature
exports.viewApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.session.user.companyId;
        
        const application = await Application.findByIdWithDetails(id);
        
        if (!application) {
            req.session.error = 'Candidature non trouvée';
            return res.redirect('/company/applications');
        }
        
        // Vérifier que la candidature concerne une offre de l'entreprise
        if (application.company_id !== companyId) {
            req.session.error = 'Accès non autorisé';
            return res.redirect('/company/applications');
        }
        
        res.render('company/applications/view', {
            title: 'Détails de la candidature',
            user: req.session.user,
            application,
            success: req.session.success,
            error: req.session.error
        });
        
        delete req.session.success;
        delete req.session.error;
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur', user: req.session.user });
    }
};

// Mettre à jour le statut d'une candidature
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const companyId = req.session.user.companyId;
        
        const application = await Application.findByIdWithDetails(id);
        
        if (!application || application.company_id !== companyId) {
            req.session.error = 'Candidature non trouvée ou accès non autorisé';
            return res.redirect('/company/applications');
        }
        
        if (!['pending', 'accepted', 'rejected'].includes(status)) {
            req.session.error = 'Statut invalide';
            return res.redirect(`/company/applications/${id}`);
        }
        
        await Application.updateStatus(id, status);
        
        req.session.success = 'Statut mis à jour avec succès';
        res.redirect(`/company/applications/${id}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Erreur lors de la mise à jour';
        res.redirect(`/company/applications/${id}`);
    }
};

