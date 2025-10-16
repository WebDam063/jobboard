const Application = require('../Models/Application');
const Advertisement = require('../Models/Advertisement');
const Candidate = require('../Models/Candidate');

exports.create = async (req, res) => {
    try {
        const { advertisement_id, first_name, last_name, email, phone, message } = req.body;

        const advertisement = await Advertisement.findById(advertisement_id);
        if (!advertisement) {
            req.session.error = 'Annonce non trouvée';
            return res.redirect('/');
        }

        let applicationData = {
            first_name,
            last_name,
            email,
            phone,
            message
        };

        // Si c'est un candidat connecté, récupérer automatiquement ses informations
        if (req.session.user && req.session.user.role === 'candidate') {
            const candidate = await Candidate.findById(req.session.user.candidateId);
            if (candidate) {
                applicationData = {
                    candidate_id: req.session.user.candidateId,
                    first_name: candidate.first_name,
                    last_name: candidate.last_name,
                    email: req.session.user.email,
                    phone: candidate.phone,
                    message
                };
            } else {
                applicationData.candidate_id = req.session.user.candidateId;
            }
        }

        await Application.create(advertisement_id, applicationData);

        req.session.success = 'Votre candidature a été envoyée avec succès';
        res.redirect(`/advertisements/${advertisement_id}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Une erreur est survenue lors de l\'envoi de votre candidature';
        res.redirect(`/advertisements/${req.body.advertisement_id}`);
    }
};

exports.list = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== 'candidate') {
            return res.redirect('/');
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const applications = await Application.getAll(limit, offset, {
            candidate_id: req.session.user.profileId
        });
        const total = await Application.count({ candidate_id: req.session.user.profileId });
        const totalPages = Math.ceil(total / limit);

        res.render('applications/list-pro', {
            title: 'Mes candidatures',
            applications,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};
