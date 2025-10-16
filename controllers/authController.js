const User = require('../Models/User');
const Candidate = require('../Models/Candidate');
const Company = require('../Models/Company');

exports.showLoginPage = (req, res) => {
    res.render('auth/login-pro', { title: 'Connexion' });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            req.session.error = 'Email ou mot de passe incorrect';
            return res.redirect('/auth/login');
        }

        const isValid = await User.verifyPassword(password, user.password);
        if (!isValid) {
            req.session.error = 'Email ou mot de passe incorrect';
            return res.redirect('/auth/login');
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        if (user.role === 'candidate') {
            const candidate = await Candidate.findByUserId(user.id);
            req.session.user.candidateId = candidate.id;
        } else if (user.role === 'company') {
            const company = await Company.findByUserId(user.id);
            req.session.user.companyId = company.id;
            req.session.user.companyName = company.name;
        }

        req.session.success = 'Connexion réussie';

        // Redirection selon le rôle
        if (user.role === 'admin') {
            return res.redirect('/admin');
        } else if (user.role === 'company') {
            return res.redirect('/company/dashboard');
        }

        res.redirect('/');
    } catch (error) {
        console.error(error);
        req.session.error = 'Une erreur est survenue';
        res.redirect('/auth/login');
    }
};

exports.showRegisterCandidatePage = (req, res) => {
    res.render('auth/register-candidate-pro', { title: 'Inscription Candidat' });
};

exports.registerCandidate = async (req, res) => {
    try {
        const { email, password, first_name, last_name, phone } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            req.session.error = 'Cet email est déjà utilisé';
            return res.redirect('/auth/register/candidate');
        }

        const userId = await User.create(email, password, 'candidate');
        await Candidate.create(userId, first_name, last_name, phone);

        req.session.success = 'Inscription réussie ! Vous pouvez maintenant vous connecter';
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        req.session.error = 'Une erreur est survenue lors de l\'inscription';
        res.redirect('/auth/register/candidate');
    }
};

exports.showRegisterCompanyPage = (req, res) => {
    res.render('auth/register-company-pro', { title: 'Inscription Entreprise' });
};

exports.registerCompany = async (req, res) => {
    try {
        const { email, password, name, description, website } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            req.session.error = 'Cet email est déjà utilisé';
            return res.redirect('/auth/register/company');
        }

        const userId = await User.create(email, password, 'company');
        await Company.create(userId, name, description, website);

        req.session.success = 'Inscription réussie ! Vous pouvez maintenant vous connecter';
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        req.session.error = 'Une erreur est survenue lors de l\'inscription';
        res.redirect('/auth/register/company');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
