const Advertisement = require('../Models/Advertisement');

exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const offset = (page - 1) * limit;

        const filters = {
            is_active: true,
            search: req.query.search || '',
            location: req.query.location || '',
            contract_type: req.query.contract_type || '',
            working_time: req.query.working_time || '',
            salary_min: req.query.salary_min ? parseInt(req.query.salary_min) : null,
            salary_max: req.query.salary_max ? parseInt(req.query.salary_max) : null
        };


        Object.keys(filters).forEach(key => {
            if (!filters[key]) delete filters[key];
        });
        filters.is_active = true;

        const activeFiltersCount = Object.keys(filters).filter(key => key !== 'is_active').length;

        const advertisements = await Advertisement.getAll(limit, offset, filters);
        const total = await Advertisement.count(filters);
        const totalPages = Math.ceil(total / limit);

        res.render('home/index-pro', {
            title: 'Job Board - Offres d\'emploi',
            advertisements,
            currentPage: page,
            totalPages,
            search: req.query.search || '',
            location: req.query.location || '',
            contract_type: req.query.contract_type || '',
            working_time: req.query.working_time || '',
            salary_min: req.query.salary_min || '',
            salary_max: req.query.salary_max || '',
            activeFiltersCount,
            totalResults: total
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};
