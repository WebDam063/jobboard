# Job Board - Plateforme Professionnelle d'Offres d'Emploi

Projet d'école réalisé avec Node.js, Express, MySQL et EJS suivant une architecture MVC stricte.

## 🎨 Design

Interface **corporate professionnelle** inspirée de Welcome to the Jungle et Indeed avec :
- Layout en 2 colonnes pour une navigation optimale
- Palette de couleurs corporate personnalisée
- Animations subtiles et transitions fluides
- Icônes modernes (Lucide Icons)
- Typographie professionnelle

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v5.7 ou supérieur)
- npm ou yarn

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd jobboard
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données

1. Créer un fichier `.env` à la racine :

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=jobboard
DB_PORT=3306

# Session Secret
SESSION_SECRET=votre_secret_key_changez_en_production
```

2. Créer la base de données et importer le schéma :

```bash
# Créer la base
mysql -u root -p -e "CREATE DATABASE jobboard;"

# Importer le schéma
mysql -u root -p jobboard < database/schema.sql
```

### 4. Lancer l'application

**Mode développement** :
```bash
npm run dev
```

**Mode production** :
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
jobboard/
├── Models/              # Modèles (accès aux données)
│   ├── User.js
│   ├── Candidate.js
│   ├── Company.js
│   ├── Advertisement.js
│   └── Application.js
├── Controllers/         # Contrôleurs (logique métier)
│   ├── homeController.js
│   ├── authController.js
│   ├── advertisementController.js
│   ├── applicationController.js
│   └── adminController.js
├── Views/              # Vues EJS
│   ├── home/
│   ├── auth/
│   ├── advertisements/
│   ├── applications/
│   ├── admin/
│   ├── partials/
│   └── errors/
├── routes/             # Routes
├── middlewares/        # Middlewares d'authentification
├── config/            # Configuration DB
├── public/            # Fichiers statiques
│   ├── css/
│   │   └── main.css   # Design professionnel corporate
│   └── js/
├── database/          # Scripts SQL
└── app.js            # Point d'entrée
```

## 🎯 Fonctionnalités

### ✅ Étape 1 - Base de données
- Structure SQL avec 5 tables relationnelles
- Relations complexes entre utilisateurs, candidats, entreprises
- Données de test incluses

### ✅ Étape 2 - Affichage des annonces
- Layout 2 colonnes (liste + détails)
- Design corporate moderne
- Navigation fluide

### ✅ Étape 3 - Affichage dynamique
- Chargement des détails sans rechargement de page
- Transitions douces
- API REST

### ✅ Étape 4 - API RESTful
- Routes CRUD complètes
- Verbes HTTP appropriés
- Architecture MVC respectée

### ✅ Étape 5 - Candidature
- Formulaire modal élégant
- Validation des données
- Stockage en base

### ✅ Étape 6 - Authentification
- Connexion sécurisée (bcrypt)
- 2 types d'inscription (candidat/entreprise)
- Sessions persistantes
- Auto-remplissage pour utilisateurs connectés

### ✅ Étape 7 - Administration
- Dashboard administrateur complet
- CRUD sur toutes les tables
- Pagination
- Interface professionnelle avec icônes

## 🎨 Palette de couleurs

```css
--primary: #456990     /* Lapis Lazuli */
--secondary: #49beaa   /* Keppel */
--accent: #ef767a      /* Light Coral */
--success: #49dcb1     /* Turquoise */
--warning: #eeb868     /* Earth Yellow */
```

## 🔒 Sécurité

- Mots de passe hashés avec bcrypt
- Protection des routes admin/company/candidate
- Sessions sécurisées
- Validation des entrées
- Protection CSRF (sessions)

## 🛠️ Technologies

- **Backend** : Node.js, Express.js
- **Template Engine** : EJS
- **Database** : MySQL avec mysql2
- **Authentification** : bcrypt, express-session
- **Validation** : express-validator
- **Icons** : Lucide Icons
- **Architecture** : MVC strict

## 📝 Licence

Projet d'école - Tous droits réservés

