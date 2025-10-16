const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.session.error = 'Vous devez être connecté pour accéder à cette page';
    res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.session.error = 'Accès réservé aux administrateurs';
    res.redirect('/');
};

const isCompany = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'company') {
        return next();
    }
    req.session.error = 'Accès réservé aux entreprises';
    res.redirect('/');
};

const isCandidate = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'candidate') {
        return next();
    }
    req.session.error = 'Accès réservé aux candidats';
    res.redirect('/');
};

const isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    res.redirect('/');
};

module.exports = {
    isAuthenticated,
    isAdmin,
    isCompany,
    isCandidate,
    isGuest
};

