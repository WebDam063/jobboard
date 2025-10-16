const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret_change_this_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 heures
        httpOnly: true,
        secure: false, // Mettre à true en production avec HTTPS
        sameSite: 'lax'
    },
    name: 'jobboard.sid' // Nom personnalisé pour le cookie de session
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.success = req.session.success || null;
    res.locals.error = req.session.error || null;
    delete req.session.success;
    delete req.session.error;
    next();
});

const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const advertisementRoutes = require('./routes/advertisementRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/advertisements', advertisementRoutes);
app.use('/applications', applicationRoutes);
app.use('/admin', adminRoutes);
app.use('/company', companyRoutes);

app.use((req, res) => {
    res.status(404).render('errors/404-pro', { title: '404 - Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

