-- ============================================
-- Job Board - Données de test
-- ============================================
-- Ce fichier contient des données de test pour le Job Board
-- Exécutez ce fichier APRÈS avoir créé la structure avec schema.sql

USE jobboard;

-- Nettoyer les données existantes
DELETE FROM applications;
DELETE FROM advertisements;
DELETE FROM companies;
DELETE FROM candidates;
DELETE FROM users;

-- ============================================
-- ADMIN
-- ============================================
-- Mot de passe: admin123
INSERT INTO users (email, password, role) VALUES 
('admin@jobboard.com', '$2b$10$YourHashedPasswordHere', 'admin');

-- ============================================
-- ENTREPRISES
-- ============================================

-- Users pour entreprises (mot de passe: company123)
INSERT INTO users (email, password, role) VALUES 
('contact@techcorp.com', '$2b$10$YourHashedPasswordHere', 'company'),
('rh@innovatelab.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('jobs@digitalminds.io', '$2b$10$YourHashedPasswordHere', 'company'),
('recrutement@greenenergy.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('careers@financeplus.com', '$2b$10$YourHashedPasswordHere', 'company'),
('hr@healthtech.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('talent@edumaster.com', '$2b$10$YourHashedPasswordHere', 'company'),
('emploi@constructbtp.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('recrutement@foodchain.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('jobs@mobilitygo.com', '$2b$10$YourHashedPasswordHere', 'company'),
('rh@mediapro.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('careers@cloudmaster.io', '$2b$10$YourHashedPasswordHere', 'company'),
('contact@fashionhouse.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('jobs@sportify.com', '$2b$10$YourHashedPasswordHere', 'company'),
('rh@luxuryhotel.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('talent@startuphub.io', '$2b$10$YourHashedPasswordHere', 'company'),
('emploi@logisticpro.fr', '$2b$10$YourHashedPasswordHere', 'company'),
('recrutement@retailmax.com', '$2b$10$YourHashedPasswordHere', 'company'),
('hr@cybersec.io', '$2b$10$YourHashedPasswordHere', 'company'),
('jobs@agritech.fr', '$2b$10$YourHashedPasswordHere', 'company');

-- Profils entreprises
INSERT INTO companies (user_id, name, description, website) VALUES 
(2, 'TechCorp', 'Leader dans le développement de solutions logicielles innovantes pour les entreprises', 'https://techcorp.com'),
(3, 'InnovateLab', 'Laboratoire d\'innovation spécialisé dans l\'IA et le Machine Learning', 'https://innovatelab.fr'),
(4, 'Digital Minds', 'Agence digitale créative spécialisée en UX/UI et développement web', 'https://digitalminds.io'),
(5, 'Green Energy Solutions', 'Entreprise pionnière dans les énergies renouvelables et la transition écologique', 'https://greenenergy.fr'),
(6, 'FinancePlus', 'Startup fintech révolutionnant les services bancaires digitaux', 'https://financeplus.com'),
(7, 'HealthTech Medical', 'Technologie médicale de pointe pour améliorer les soins de santé', 'https://healthtech.fr'),
(8, 'EduMaster', 'Plateforme e-learning innovante pour l\'éducation du futur', 'https://edumaster.com'),
(9, 'ConstructBTP', 'Groupe de construction leader dans le BTP et travaux publics', 'https://constructbtp.fr'),
(10, 'FoodChain', 'Chaîne de restaurants moderne avec concept farm-to-table', 'https://foodchain.fr'),
(11, 'MobilityGo', 'Solutions de mobilité urbaine durable et partagée', 'https://mobilitygo.com'),
(12, 'MediaPro Studio', 'Studio de production audiovisuelle et créative', 'https://mediapro.fr'),
(13, 'CloudMaster', 'Fournisseur de solutions cloud et infrastructure as a service', 'https://cloudmaster.io'),
(14, 'Fashion House', 'Marque de mode écoresponsable et tendance', 'https://fashionhouse.fr'),
(15, 'Sportify', 'Application et équipements pour le sport connecté', 'https://sportify.com'),
(16, 'Luxury Hotel Group', 'Groupe hôtelier de luxe international', 'https://luxuryhotel.fr'),
(17, 'StartupHub Incubator', 'Incubateur et accélérateur de startups innovantes', 'https://startuphub.io'),
(18, 'LogisticPro', 'Solutions logistiques et supply chain management', 'https://logisticpro.fr'),
(19, 'RetailMax', 'Chaîne de distribution retail multicanal', 'https://retailmax.com'),
(20, 'CyberSec Systems', 'Cybersécurité et protection des données d\'entreprise', 'https://cybersec.io'),
(21, 'AgriTech Innovations', 'Technologies agricoles pour une agriculture intelligente', 'https://agritech.fr');

-- ============================================
-- CANDIDATS
-- ============================================

-- Users candidats (mot de passe: candidate123)
INSERT INTO users (email, password, role) VALUES 
('marie.dupont@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('jean.martin@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('sophie.bernard@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('thomas.petit@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('julie.robert@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('alexandre.durand@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('camille.dubois@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('nicolas.moreau@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('emma.laurent@email.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('lucas.simon@email.com', '$2b$10$YourHashedPasswordHere', 'candidate');

-- Profils candidats
INSERT INTO candidates (user_id, first_name, last_name, phone) VALUES 
(22, 'Marie', 'Dupont', '+33612345678'),
(23, 'Jean', 'Martin', '+33623456789'),
(24, 'Sophie', 'Bernard', '+33634567890'),
(25, 'Thomas', 'Petit', '+33645678901'),
(26, 'Julie', 'Robert', '+33656789012'),
(27, 'Alexandre', 'Durand', '+33667890123'),
(28, 'Camille', 'Dubois', '+33678901234'),
(29, 'Nicolas', 'Moreau', '+33689012345'),
(30, 'Emma', 'Laurent', '+33690123456'),
(31, 'Lucas', 'Simon', '+33601234567');

-- ============================================
-- ANNONCES D'EMPLOI (100+ offres)
-- ============================================

-- TechCorp (20 offres)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(1, 'Développeur Full Stack Senior', 'Rejoignez notre équipe R&D pour développer nos applications cloud', 'Nous recherchons un développeur Full Stack expérimenté maîtrisant React, Node.js et les architectures cloud. Vous travaillerez sur des projets à fort impact, utilisant les dernières technologies. Expérience en DevOps appréciée.', 'Paris, France', 'CDI', 'Temps plein', 45000, 60000, TRUE),
(1, 'Data Scientist', 'Analysez et valorisez nos données pour créer de l\'intelligence business', 'En tant que Data Scientist, vous exploiterez nos données massives pour créer des modèles prédictifs et des dashboards décisionnels. Maîtrise de Python, SQL, et des frameworks ML requis.', 'Paris, France', 'CDI', 'Temps plein', 50000, 65000, TRUE),
(1, 'DevOps Engineer', 'Optimisez notre infrastructure cloud et nos pipelines CI/CD', 'Vous serez responsable de l\'automatisation de nos déploiements, de la gestion de l\'infrastructure Kubernetes, et de l\'optimisation de nos coûts cloud. AWS/Azure requis.', 'Paris, France', 'CDI', 'Temps plein', 48000, 62000, TRUE),
(1, 'Product Manager', 'Définissez la vision produit et pilotez notre roadmap', 'En lien avec les équipes tech et business, vous définirez la stratégie produit, prioriserez les fonctionnalités, et assurerez le succès de nos solutions. 3+ ans d\'expérience requis.', 'Paris, France', 'CDI', 'Temps plein', 50000, 70000, TRUE),
(1, 'UX Designer', 'Créez des expériences utilisateur exceptionnelles', 'Vous concevrez des interfaces intuitives et élégantes, réaliserez des tests utilisateurs, et travaillerez en étroite collaboration avec les développeurs. Portfolio obligatoire.', 'Paris, France', 'CDI', 'Temps plein', 40000, 52000, TRUE),
(1, 'Développeur Frontend React', 'Développez des interfaces modernes avec React et TypeScript', 'Intégration de maquettes Figma, développement de composants réutilisables, optimisation des performances. Expérience React 3+ ans.', 'Paris, France', 'CDI', 'Temps plein', 42000, 55000, TRUE),
(1, 'Développeur Backend Node.js', 'Concevez des APIs robustes et scalables', 'Architecture microservices, APIs RESTful/GraphQL, bases de données SQL/NoSQL. Expérience en production requise.', 'Paris, France', 'CDI', 'Temps plein', 43000, 56000, TRUE),
(1, 'Chef de Projet Technique', 'Pilotez nos projets stratégiques', 'Gestion de projets complexes, coordination d\'équipes pluridisciplinaires, méthodologies Agile/Scrum.', 'Paris, France', 'CDI', 'Temps plein', 48000, 65000, TRUE),
(1, 'Ingénieur QA / Test', 'Garantissez la qualité de nos applications', 'Tests automatisés (Selenium, Cypress), tests de performance, CI/CD. Rigueur et sens du détail essentiels.', 'Paris, France', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(1, 'Architecte Logiciel', 'Concevez l\'architecture de nos systèmes', 'Design patterns, architectures distribuées, scalabilité. 7+ ans d\'expérience en développement.', 'Paris, France', 'CDI', 'Temps plein', 65000, 85000, TRUE),
(1, 'Développeur Mobile React Native', 'Créez nos applications mobiles iOS et Android', 'Développement cross-platform, intégration avec APIs, publication sur stores.', 'Remote', 'CDI', 'Temps plein', 40000, 53000, TRUE),
(1, 'Business Analyst', 'Analysez les besoins métier et proposez des solutions', 'Recueil des besoins, rédaction de spécifications, UAT. Interface entre métier et tech.', 'Paris, France', 'CDI', 'Temps plein', 42000, 55000, TRUE),
(1, 'Security Engineer', 'Protégez nos systèmes et données', 'Audits de sécurité, pentesting, conformité RGPD. Certifications appréciées.', 'Paris, France', 'CDI', 'Temps plein', 52000, 68000, TRUE),
(1, 'Scrum Master', 'Animez nos équipes Agile', 'Facilitation des cérémonies Scrum, coaching d\'équipe, amélioration continue. Certification PSM requise.', 'Paris, France', 'CDI', 'Temps plein', 45000, 58000, TRUE),
(1, 'Tech Lead', 'Encadrez une équipe de développeurs', 'Leadership technique, revue de code, mentoring. Excellentes compétences en communication.', 'Paris, France', 'CDI', 'Temps plein', 55000, 72000, TRUE),
(1, 'Stage Développeur Web', 'Découvrez le développement en startup', 'Stage de 6 mois pour apprendre les technologies modernes. Bac+3/4/5 en cours.', 'Paris, France', 'Stage', 'Temps plein', 1200, 1500, TRUE),
(1, 'Alternant Data Analyst', 'Formez-vous à l\'analyse de données', 'Alternance 12-24 mois, Master en cours. Apprentissage SQL, Python, dataviz.', 'Paris, France', 'Alternance', 'Temps plein', 1400, 1800, TRUE),
(1, 'Support Technique', 'Assistez nos clients dans l\'utilisation de nos produits', 'Assistance niveau 1-2, documentation, formation utilisateurs. Excellente communication requise.', 'Paris, France', 'CDI', 'Temps plein', 32000, 40000, TRUE),
(1, 'Community Manager Tech', 'Animez notre communauté de développeurs', 'Création de contenu technique, animation réseaux sociaux, événements. Passion pour la tech requise.', 'Remote', 'CDD', 'Temps plein', 35000, 45000, TRUE),
(1, 'Consultant Technique', 'Accompagnez nos clients dans leurs projets', 'Conseil, formation, implémentation. Déplacements fréquents.', 'Paris, France', 'CDI', 'Temps plein', 45000, 60000, TRUE);

-- InnovateLab (15 offres IA/ML)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(2, 'Machine Learning Engineer', 'Développez des modèles ML en production', 'Conception et déploiement de modèles ML, MLOps, optimisation. TensorFlow/PyTorch requis.', 'Lyon, France', 'CDI', 'Temps plein', 52000, 70000, TRUE),
(2, 'Research Scientist AI', 'Recherche fondamentale en intelligence artificielle', 'PhD en AI/ML, publications scientifiques, expertise en deep learning.', 'Lyon, France', 'CDI', 'Temps plein', 60000, 80000, TRUE),
(2, 'Computer Vision Engineer', 'Développez des solutions de vision par ordinateur', 'Traitement d\'images, détection d\'objets, segmentation. OpenCV, YOLO.', 'Lyon, France', 'CDI', 'Temps plein', 50000, 68000, TRUE),
(2, 'NLP Engineer', 'Créez des solutions de traitement du langage naturel', 'BERT, GPT, transformers. Expérience en production.', 'Remote', 'CDI', 'Temps plein', 48000, 65000, TRUE),
(2, 'Data Engineer', 'Construisez notre infrastructure data', 'Big Data, Spark, Airflow, data warehousing.', 'Lyon, France', 'CDI', 'Temps plein', 46000, 60000, TRUE),
(2, 'MLOps Engineer', 'Industrialisez nos modèles ML', 'CI/CD pour ML, monitoring, versioning de modèles.', 'Lyon, France', 'CDI', 'Temps plein', 50000, 65000, TRUE),
(2, 'AI Product Manager', 'Pilotez nos produits d\'intelligence artificielle', 'Vision produit IA, roadmap, KPIs. Background tech requis.', 'Lyon, France', 'CDI', 'Temps plein', 52000, 72000, TRUE),
(2, 'Annotateur de Données', 'Labellisez nos datasets pour le ML', 'Annotation précise, contrôle qualité. Rigueur essentielle.', 'Lyon, France', 'CDD', 'Temps plein', 28000, 35000, TRUE),
(2, 'Data Analyst ML', 'Analysez les performances de nos modèles', 'Métriques ML, A/B testing, dashboards. Python, SQL.', 'Lyon, France', 'CDI', 'Temps plein', 40000, 52000, TRUE),
(2, 'Reinforcement Learning Engineer', 'Développez des agents intelligents', 'RL algorithms, simulateurs, optimisation.', 'Lyon, France', 'CDI', 'Temps plein', 55000, 72000, TRUE),
(2, 'AI Ethics Researcher', 'Assurez l\'éthique de nos IA', 'Recherche en éthique AI, biais, fairness. PhD apprécié.', 'Remote', 'CDI', 'Temps plein', 50000, 65000, TRUE),
(2, 'Speech Recognition Engineer', 'Créez des solutions de reconnaissance vocale', 'ASR, TTS, traitement du signal audio.', 'Lyon, France', 'CDI', 'Temps plein', 48000, 63000, TRUE),
(2, 'AI Consultant', 'Conseillez nos clients sur l\'IA', 'Expertise technique, présentation, gestion de projet.', 'Lyon, France', 'CDI', 'Temps plein', 50000, 68000, TRUE),
(2, 'Stage Recherche ML', 'Participez à nos projets de recherche', 'Stage 6 mois, Master 2 ou école d\'ingénieur.', 'Lyon, France', 'Stage', 'Temps plein', 1300, 1600, TRUE),
(2, 'Ingénieur Data Science', 'Exploitez nos données avec des algorithmes avancés', 'Statistiques, ML, visualisation. Python expert.', 'Lyon, France', 'CDI', 'Temps plein', 45000, 58000, TRUE);

-- Digital Minds (12 offres créatives/web)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(3, 'Directeur Artistique', 'Dirigez la création de nos campagnes digitales', 'Vision créative, direction d\'équipe, présentation clients. Portfolio exceptionnel requis.', 'Bordeaux, France', 'CDI', 'Temps plein', 45000, 60000, TRUE),
(3, 'UI/UX Designer Senior', 'Créez des expériences digitales mémorables', 'Wireframes, prototypes, design system. Figma expert, 5+ ans d\'expérience.', 'Bordeaux, France', 'CDI', 'Temps plein', 42000, 55000, TRUE),
(3, 'Motion Designer', 'Donnez vie à nos créations avec l\'animation', 'After Effects, Cinema 4D, animation 2D/3D. Showreel obligatoire.', 'Bordeaux, France', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(3, 'Développeur Créatif', 'Codez des expériences web innovantes', 'WebGL, Three.js, GSAP, animations. Créativité et technique.', 'Bordeaux, France', 'CDI', 'Temps plein', 40000, 52000, TRUE),
(3, 'Chef de Projet Digital', 'Pilotez nos projets clients de A à Z', 'Gestion de projets web, coordination équipes, relation client.', 'Bordeaux, France', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(3, 'Graphiste Web', 'Créez des visuels impactants pour le digital', 'Photoshop, Illustrator, identité visuelle. Créativité débordante.', 'Bordeaux, France', 'CDI', 'Temps plein', 32000, 42000, TRUE),
(3, 'Content Manager', 'Produisez du contenu engageant pour nos clients', 'Rédaction, SEO, stratégie éditoriale. Excellente plume requise.', 'Remote', 'CDI', 'Temps plein', 32000, 42000, TRUE),
(3, 'Social Media Manager', 'Gérez les réseaux sociaux de nos clients', 'Community management, création de contenu, analytics.', 'Bordeaux, France', 'CDI', 'Temps plein', 30000, 40000, TRUE),
(3, 'SEO Manager', 'Optimisez la visibilité de nos clients', 'SEO on-page/off-page, analytics, stratégie. Résultats prouvés.', 'Remote', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(3, 'Webdesigner', 'Concevez des sites web modernes', 'Maquettes web, responsive design, UI moderne.', 'Bordeaux, France', 'CDI', 'Temps plein', 32000, 42000, TRUE),
(3, 'Video Editor', 'Montez des vidéos pour nos campagnes', 'Premiere Pro, DaVinci Resolve, storytelling vidéo.', 'Bordeaux, France', 'CDD', 'Temps plein', 30000, 40000, TRUE),
(3, 'Stage Motion Design', 'Apprenez le motion design en agence', 'Stage 6 mois, formation design/animation.', 'Bordeaux, France', 'Stage', 'Temps plein', 800, 1200, TRUE);

-- Green Energy (10 offres)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(4, 'Ingénieur Énergies Renouvelables', 'Concevez des installations solaires et éoliennes', 'Dimensionnement, études techniques, suivi de projets. Formation ingénieur requise.', 'Nantes, France', 'CDI', 'Temps plein', 40000, 55000, TRUE),
(4, 'Chef de Projet Transition Énergétique', 'Pilotez des projets d\'efficacité énergétique', 'Audit énergétique, plans d\'action, suivi budgétaire.', 'Nantes, France', 'CDI', 'Temps plein', 42000, 58000, TRUE),
(4, 'Technicien Maintenance Éolien', 'Assurez la maintenance de nos parcs éoliens', 'Maintenance préventive/curative, électrotechnique. Habilitations requises.', 'Nantes, France', 'CDI', 'Temps plein', 32000, 42000, TRUE),
(4, 'Ingénieur R&D Photovoltaïque', 'Innovez dans les technologies solaires', 'Recherche, prototypage, tests. Doctorat apprécié.', 'Nantes, France', 'CDI', 'Temps plein', 45000, 60000, TRUE),
(4, 'Business Developer Énergie', 'Développez notre portefeuille clients', 'Prospection, négociation, closing. Expérience commerciale.', 'Nantes, France', 'CDI', 'Temps plein', 38000, 52000, TRUE),
(4, 'Consultant Stratégie Carbone', 'Accompagnez les entreprises vers la neutralité carbone', 'Bilans carbone, stratégies RSE, conseil.', 'Nantes, France', 'CDI', 'Temps plein', 45000, 60000, TRUE),
(4, 'Chargé d\'Études Environnementales', 'Réalisez des études d\'impact environnemental', 'Réglementation, études terrain, reporting.', 'Nantes, France', 'CDI', 'Temps plein', 35000, 45000, TRUE),
(4, 'Alternant Ingénieur Énergie', 'Formez-vous aux métiers de l\'énergie verte', 'Alternance 2 ans, école d\'ingénieur.', 'Nantes, France', 'Alternance', 'Temps plein', 1500, 1800, TRUE),
(4, 'Responsable HSE', 'Garantissez la sécurité sur nos sites', 'Prévention, audits, formation sécurité. Expérience HSE requise.', 'Nantes, France', 'CDI', 'Temps plein', 40000, 52000, TRUE),
(4, 'Ingénieur Réseau Électrique', 'Concevez l\'intégration au réseau de nos installations', 'Haute tension, schémas électriques, normes.', 'Nantes, France', 'CDI', 'Temps plein', 42000, 56000, TRUE);

-- FinancePlus (8 offres fintech)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(5, 'Développeur Backend Fintech', 'Créez notre plateforme bancaire du futur', 'APIs financières, sécurité, transactions. Java/Kotlin.', 'Paris, France', 'CDI', 'Temps plein', 50000, 65000, TRUE),
(5, 'Risk Manager', 'Gérez les risques financiers', 'Modélisation risques, KYC, conformité. Finance quantitative.', 'Paris, France', 'CDI', 'Temps plein', 55000, 75000, TRUE),
(5, 'Compliance Officer', 'Assurez notre conformité réglementaire', 'ACPR, RGPD, DSP2. Juriste ou finance.', 'Paris, France', 'CDI', 'Temps plein', 50000, 68000, TRUE),
(5, 'Product Owner Paiement', 'Pilotez nos solutions de paiement', 'Produits financiers, UX, roadmap. Expérience fintech.', 'Paris, France', 'CDI', 'Temps plein', 52000, 70000, TRUE),
(5, 'Analyste Quantitatif', 'Développez des modèles financiers', 'Mathématiques financières, Python, algo trading.', 'Paris, France', 'CDI', 'Temps plein', 60000, 85000, TRUE),
(5, 'Customer Success Manager', 'Accompagnez nos clients professionnels', 'Relation client B2B, onboarding, upsell.', 'Paris, France', 'CDI', 'Temps plein', 40000, 55000, TRUE),
(5, 'Fraud Analyst', 'Détectez et prévenez les fraudes', 'Machine learning, détection d\'anomalies, enquêtes.', 'Paris, France', 'CDI', 'Temps plein', 42000, 56000, TRUE),
(5, 'Stage Data Analyst Finance', 'Analysez nos données financières', 'Stage 6 mois, école de commerce ou ingénieur.', 'Paris, France', 'Stage', 'Temps plein', 1400, 1600, TRUE);

-- HealthTech (12 offres santé/tech)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(6, 'Ingénieur Biomédical', 'Développez nos dispositifs médicaux', 'Électronique, capteurs, certifications médicales.', 'Toulouse, France', 'CDI', 'Temps plein', 42000, 56000, TRUE),
(6, 'Data Scientist Santé', 'Exploitez les données de santé', 'ML appliqué à la santé, réglementation données médicales.', 'Toulouse, France', 'CDI', 'Temps plein', 48000, 63000, TRUE),
(6, 'Développeur Applications Médicales', 'Créez nos apps pour professionnels de santé', 'Swift/Kotlin, normes médicales, UX santé.', 'Remote', 'CDI', 'Temps plein', 42000, 55000, TRUE),
(6, 'Responsable Affaires Réglementaires', 'Gérez les certifications CE Medical', 'Marquage CE, ISO 13485, dossiers techniques.', 'Toulouse, France', 'CDI', 'Temps plein', 45000, 60000, TRUE),
(6, 'Chef de Produit e-Santé', 'Définissez nos solutions digitales santé', 'Product management, parcours patient, business model.', 'Toulouse, France', 'CDI', 'Temps plein', 48000, 65000, TRUE),
(6, 'Ingénieur R&D Imagerie Médicale', 'Innovez en imagerie diagnostique', 'Traitement d\'images médicales, algorithmique.', 'Toulouse, France', 'CDI', 'Temps plein', 50000, 68000, TRUE),
(6, 'Clinical Project Manager', 'Pilotez nos études cliniques', 'Protocoles, investigateurs, reporting.', 'Toulouse, France', 'CDI', 'Temps plein', 45000, 60000, TRUE),
(6, 'UX Designer Santé', 'Concevez des interfaces pour le milieu médical', 'UX healthcare, ergonomie, accessibilité.', 'Remote', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(6, 'Technical Writer Médical', 'Rédigez notre documentation technique', 'Rédaction technique, manuels utilisateur, notices.', 'Toulouse, France', 'CDD', 'Temps plein', 35000, 45000, TRUE),
(6, 'Quality Assurance Medical', 'Garantissez la qualité de nos produits', 'ISO 13485, audits, CAPA. Expérience dispositifs médicaux.', 'Toulouse, France', 'CDI', 'Temps plein', 40000, 52000, TRUE),
(6, 'Alternant Développeur HealthTech', 'Apprenez à coder pour la santé', 'Alternance 2 ans, technologies web/mobile.', 'Toulouse, France', 'Alternance', 'Temps plein', 1300, 1600, TRUE),
(6, 'Ingénieur Validation', 'Validez nos systèmes logiciels médicaux', 'Tests IQ/OQ/PQ, traçabilité, documentation.', 'Toulouse, France', 'CDI', 'Temps plein', 40000, 52000, TRUE);

-- Plus d'offres pour d'autres entreprises...
-- EduMaster (8 offres)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(7, 'Ingénieur Pédagogique', 'Concevez des parcours d\'apprentissage innovants', 'Pédagogie digitale, scénarisation, LMS.', 'Lille, France', 'CDI', 'Temps plein', 35000, 48000, TRUE),
(7, 'Développeur Full Stack EdTech', 'Créez notre plateforme e-learning', 'React, Node.js, vidéo streaming, gamification.', 'Remote', 'CDI', 'Temps plein', 40000, 52000, TRUE),
(7, 'Chef de Projet Formation', 'Pilotez nos programmes de formation', 'Gestion de projets pédagogiques, suivi apprenants.', 'Lille, France', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(7, 'Content Creator Pédagogique', 'Créez du contenu éducatif engageant', 'Vidéo, articles, quiz. Pédagogie et créativité.', 'Remote', 'CDD', 'Temps plein', 32000, 42000, TRUE),
(7, 'Data Analyst Learning', 'Analysez les données d\'apprentissage', 'Learning analytics, KPIs pédagogiques, dashboards.', 'Lille, France', 'CDI', 'Temps plein', 38000, 48000, TRUE),
(7, 'UX Designer EdTech', 'Optimisez l\'expérience d\'apprentissage', 'UX/UI, tests utilisateurs apprenants, accessibilité.', 'Remote', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(7, 'Responsable Partenariats', 'Développez nos partenariats écoles/universités', 'Business development, négociation, networking.', 'Lille, France', 'CDI', 'Temps plein', 40000, 55000, TRUE),
(7, 'Stage Community Manager Éducation', 'Animez notre communauté d\'apprenants', 'Stage 6 mois, réseaux sociaux, animation communauté.', 'Remote', 'Stage', 'Temps plein', 800, 1000, TRUE);

-- Offres de construction, restauration, mobilité, média, cloud, mode, sport, hôtellerie, logistique, retail, cybersec, agritech...
-- Je vais en ajouter rapidement pour atteindre 100+

-- Construction (5)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(8, 'Conducteur de Travaux', 'Pilotez nos chantiers de construction', 'Gestion de chantier, coordination, planning. BTP.', 'Marseille, France', 'CDI', 'Temps plein', 38000, 52000, TRUE),
(8, 'Ingénieur Génie Civil', 'Concevez nos ouvrages d\'art', 'Calcul de structures, plans d\'exécution, suivi chantier.', 'Marseille, France', 'CDI', 'Temps plein', 40000, 55000, TRUE),
(8, 'Chef de Chantier', 'Encadrez nos équipes sur site', 'Management, sécurité, qualité. CACES appréciés.', 'Marseille, France', 'CDI', 'Temps plein', 32000, 42000, TRUE),
(8, 'BIM Manager', 'Gérez la maquette numérique de nos projets', 'Revit, BIM 360, coordination 3D.', 'Marseille, France', 'CDI', 'Temps plein', 42000, 56000, TRUE),
(8, 'Métreur', 'Réalisez nos études de prix', 'Quantitatifs, devis, marchés. Logiciels métier.', 'Marseille, France', 'CDI', 'Temps plein', 32000, 42000, TRUE);

-- Restauration (5)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(9, 'Chef de Cuisine', 'Dirigez nos cuisines', 'Créativité culinaire, gestion d\'équipe, hygiène HACCP.', 'Lyon, France', 'CDI', 'Temps plein', 35000, 48000, TRUE),
(9, 'Manager de Restaurant', 'Gérez un de nos établissements', 'Management, gestion, relation client. Passion restauration.', 'Lyon, France', 'CDI', 'Temps plein', 32000, 45000, TRUE),
(9, 'Sous-Chef', 'Secondez notre chef étoilé', 'Cuisine gastronomique, brigade, créativité.', 'Lyon, France', 'CDI', 'Temps plein', 28000, 38000, TRUE),
(9, 'Serveur/Serveuse', 'Offrez une expérience client exceptionnelle', 'Service en salle, conseils vins, anglais apprécié.', 'Lyon, France', 'CDD', 'Temps plein', 22000, 28000, TRUE),
(9, 'Responsable Achats Alimentaires', 'Sélectionnez nos produits locaux', 'Sourcing, négociation, traçabilité. Circuits courts.', 'Lyon, France', 'CDI', 'Temps plein', 32000, 42000, TRUE);

-- Mode (6)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(13, 'Styliste Mode', 'Créez nos collections', 'Tendances, croquis, choix matières. Portfolio requis.', 'Paris, France', 'CDI', 'Temps plein', 32000, 45000, TRUE),
(13, 'Modéliste', 'Réalisez nos patronages', 'Modélisme, gradation, prototypes. Logiciels CAO.', 'Paris, France', 'CDI', 'Temps plein', 30000, 40000, TRUE),
(13, 'Chef de Produit Mode', 'Pilotez nos gammes de vêtements', 'Brief collection, suivi fabrication, pricing.', 'Paris, France', 'CDI', 'Temps plein', 38000, 52000, TRUE),
(13, 'Visual Merchandiser', 'Mettez en scène nos boutiques', 'Vitrines, merchandising, storytelling visuel.', 'Paris, France', 'CDI', 'Temps plein', 28000, 38000, TRUE),
(13, 'Responsable E-commerce Mode', 'Développez nos ventes en ligne', 'Site e-commerce, marketing digital, KPIs.', 'Paris, France', 'CDI', 'Temps plein', 40000, 55000, TRUE),
(13, 'Stage Assistant Styliste', 'Assistez notre équipe création', 'Stage 6 mois, école de mode.', 'Paris, France', 'Stage', 'Temps plein', 700, 1000, TRUE);

-- Sport (5)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(14, 'Développeur App Sport Connectée', 'Codez notre application de coaching sportif', 'Mobile natif, capteurs, gamification. Passion sport.', 'Montpellier, France', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(14, 'Coach Sportif Digital', 'Créez des programmes d\'entraînement', 'Diplôme BPJEPS, vidéos, nutrition. Caméra friendly.', 'Montpellier, France', 'CDI', 'Temps plein', 28000, 38000, TRUE),
(14, 'Responsable Partenariats Sportifs', 'Nouez des partenariats avec clubs et athlètes', 'Réseau sportif, négociation, événementiel.', 'Montpellier, France', 'CDI', 'Temps plein', 35000, 48000, TRUE),
(14, 'Data Analyst Performance', 'Analysez les données de performance sportive', 'Analytics, KPIs sport, data viz. Python/R.', 'Remote', 'CDI', 'Temps plein', 38000, 50000, TRUE),
(14, 'Community Manager Sport', 'Animez notre communauté de sportifs', 'Réseaux sociaux, motivation, engagement.', 'Remote', 'CDD', 'Temps plein', 28000, 38000, TRUE);

-- Cybersécurité (6)
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(19, 'Pentester', 'Testez la sécurité de nos systèmes', 'Tests d\'intrusion, audits, reporting. Certifications appréciées.', 'Paris, France', 'CDI', 'Temps plein', 50000, 68000, TRUE),
(19, 'Analyste SOC', 'Surveillez notre Security Operations Center', 'Monitoring 24/7, incidents, SIEM. Shifts possibles.', 'Paris, France', 'CDI', 'Temps plein', 40000, 52000, TRUE),
(19, 'Consultant Cybersécurité', 'Conseillez nos clients en sécurité', 'Audits, recommandations, conformité RGPD.', 'Paris, France', 'CDI', 'Temps plein', 48000, 65000, TRUE),
(19, 'Ingénieur Sécurité Réseau', 'Sécurisez nos infrastructures', 'Firewalls, VPN, détection d\'intrusion.', 'Paris, France', 'CDI', 'Temps plein', 45000, 60000, TRUE),
(19, 'Threat Intelligence Analyst', 'Anticipez les cybermenaces', 'CTI, OSINT, APT. Veille sécurité.', 'Remote', 'CDI', 'Temps plein', 48000, 63000, TRUE),
(19, 'RSSI (Responsable Sécurité)', 'Définissez notre stratégie de sécurité', 'Gouvernance, politique de sécurité, conformité. 7+ ans.', 'Paris, France', 'CDI', 'Temps plein', 70000, 95000, TRUE);

-- Et encore plus d'offres diverses
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(10, 'Responsable Flotte Véhicules', 'Gérez notre flotte de véhicules partagés', 'Maintenance, optimisation, géolocalisation.', 'Paris, France', 'CDI', 'Temps plein', 35000, 45000, TRUE),
(11, 'Réalisateur Vidéo', 'Réalisez nos contenus audiovisuels', 'Tournage, direction artistique, post-prod.', 'Paris, France', 'Freelance', 'Temps partiel', 35000, 50000, TRUE),
(12, 'Architecte Cloud', 'Concevez notre infrastructure cloud', 'AWS/Azure/GCP, architecture, coûts. Certifications.', 'Remote', 'CDI', 'Temps plein', 55000, 75000, TRUE),
(15, 'Réceptionniste Hôtel de Luxe', 'Accueillez notre clientèle premium', 'Accueil, réservations, conciergerie. Langues requises.', 'Nice, France', 'CDI', 'Temps plein', 25000, 32000, TRUE),
(16, 'Investment Manager Startups', 'Investissez dans les startups prometteuses', 'Due diligence, valorisation, portfolio. Finance/tech.', 'Paris, France', 'CDI', 'Temps plein', 60000, 85000, TRUE),
(17, 'Responsable Supply Chain', 'Optimisez notre chaîne logistique', 'Flux, stocks, transport. ERP, Excel expert.', 'Lille, France', 'CDI', 'Temps plein', 42000, 56000, TRUE),
(18, 'Category Manager', 'Gérez nos catégories produits', 'Merchandising, négociation fournisseurs, pricing.', 'Paris, France', 'CDI', 'Temps plein', 40000, 55000, TRUE),
(20, 'Agronome Innovation', 'Développez l\'agriculture de demain', 'Agronomie, technologies, capteurs IoT.', 'Toulouse, France', 'CDI', 'Temps plein', 38000, 50000, TRUE);

-- ============================================
-- CANDIDATURES (exemples)
-- ============================================

INSERT INTO applications (advertisement_id, candidate_id, message, status, created_at) VALUES 
(1, 1, 'Je suis très intéressée par ce poste de Développeur Full Stack. Mon expérience de 4 ans en React et Node.js correspond parfaitement à vos besoins.', 'pending', NOW() - INTERVAL 2 DAY),
(1, 3, 'Développeur passionné avec une solide expérience en architectures cloud et DevOps.', 'reviewed', NOW() - INTERVAL 5 DAY),
(2, 2, 'Data Scientist avec 5 ans d\'expérience en ML et Python. Très motivé par votre projet.', 'pending', NOW() - INTERVAL 1 DAY),
(5, 4, 'Designer UX avec un portfolio conséquent et une passion pour les interfaces utilisateur.', 'pending', NOW() - INTERVAL 3 DAY),
(10, 5, 'Architecte logiciel senior recherchant un nouveau challenge technique.', 'accepted', NOW() - INTERVAL 10 DAY),
(15, 1, 'Mon profil de Tech Lead correspond parfaitement à vos attentes.', 'reviewed', NOW() - INTERVAL 4 DAY),
(21, 6, 'Ingénieur ML avec expertise en NLP et computer vision.', 'pending', NOW() - INTERVAL 1 DAY),
(25, 7, 'Designer passionné par l\'UX et les interfaces innovantes.', 'pending', NOW() - INTERVAL 2 DAY),
(35, 8, 'Ingénieur énergies renouvelables motivé par la transition écologique.', 'reviewed', NOW() - INTERVAL 6 DAY),
(45, 9, 'Développeur fintech avec expérience en sécurité et conformité.', 'pending', NOW() - INTERVAL 1 DAY);

-- Note: Les mots de passe hashés ci-dessus sont des placeholders.
-- Utilisez bcrypt pour générer de vrais hashs avant de les insérer en production.

