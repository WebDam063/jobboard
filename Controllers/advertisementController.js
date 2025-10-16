const Advertisement = require('../Models/Advertisement');

exports.show = async (req, res) => {
    try {
        const advertisement = await Advertisement.findById(req.params.id);
        
        if (!advertisement) {
            return res.status(404).render('errors/404-pro', { title: '404 - Annonce non trouvée' });
        }

        res.render('advertisements/show-pro', {
            title: advertisement.title,
            advertisement
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('errors/500-pro', { title: 'Erreur serveur' });
    }
};

exports.getDetails = async (req, res) => {
    try {
        const advertisement = await Advertisement.findById(req.params.id);
        
        if (!advertisement) {
            return res.status(404).json({ error: 'Annonce non trouvée' });
        }

        res.json(advertisement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
