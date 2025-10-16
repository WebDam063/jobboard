const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function importData() {
    console.log('🚀 Démarrage de l\'import des données...\n');
    
    // Connexion à la base de données
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
    
    console.log('✅ Connecté à la base de données Railway\n');
    
    // Générer les mots de passe hashés
    console.log('🔐 Génération des mots de passe hashés...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const companyPassword = await bcrypt.hash('company123', 10);
    const candidatePassword = await bcrypt.hash('candidate123', 10);
    console.log('✅ Mots de passe générés\n');
    
    // Lire le fichier SQL pour les autres tables (companies, candidates, ads, applications)
    console.log('📄 Lecture du fichier seed_data.sql...');
    const sqlContent = fs.readFileSync(
        path.join(__dirname, '../database/seed_data.sql'), 
        'utf8'
    );
    console.log('✅ Fichier chargé\n');
    
    // Séparer les requêtes SQL en sections
    console.log('⏳ Exécution des requêtes SQL par étapes...\n');
    
    try {
        // Étape 1: Nettoyer les données ET réinitialiser les auto-increments
        console.log('   1️⃣  Nettoyage des anciennes données...');
        await connection.query('SET FOREIGN_KEY_CHECKS=0');
        await connection.query('DELETE FROM applications');
        await connection.query('DELETE FROM advertisements');
        await connection.query('DELETE FROM companies');
        await connection.query('DELETE FROM candidates');
        await connection.query('DELETE FROM users');
        
        // Réinitialiser les auto-increments pour garantir des IDs prévisibles
        await connection.query('ALTER TABLE users AUTO_INCREMENT = 1');
        await connection.query('ALTER TABLE companies AUTO_INCREMENT = 1');
        await connection.query('ALTER TABLE candidates AUTO_INCREMENT = 1');
        await connection.query('ALTER TABLE advertisements AUTO_INCREMENT = 1');
        await connection.query('ALTER TABLE applications AUTO_INCREMENT = 1');
        
        await connection.query('SET FOREIGN_KEY_CHECKS=1');
        console.log('      ✓ Données nettoyées et IDs réinitialisés\n');
        
        // Étape 2: Insérer les users
        console.log('   2️⃣  Insertion des utilisateurs...');
        
        // Admin
        await connection.query(`
            INSERT INTO users (email, password, role) VALUES 
            ('admin@jobboard.com', '${adminPassword}', 'admin')
        `);
        
        // Companies users
        await connection.query(`
            INSERT INTO users (email, password, role) VALUES 
            ('contact@techcorp.com', '${companyPassword}', 'company'),
            ('rh@innovatelab.fr', '${companyPassword}', 'company'),
            ('jobs@digitalminds.io', '${companyPassword}', 'company'),
            ('recrutement@greenenergy.fr', '${companyPassword}', 'company'),
            ('careers@financeplus.com', '${companyPassword}', 'company'),
            ('hr@healthtech.fr', '${companyPassword}', 'company'),
            ('talent@edumaster.com', '${companyPassword}', 'company'),
            ('emploi@constructbtp.fr', '${companyPassword}', 'company'),
            ('recrutement@foodchain.fr', '${companyPassword}', 'company'),
            ('jobs@mobilitygo.com', '${companyPassword}', 'company'),
            ('rh@mediapro.fr', '${companyPassword}', 'company'),
            ('careers@cloudmaster.io', '${companyPassword}', 'company'),
            ('contact@fashionhouse.fr', '${companyPassword}', 'company'),
            ('jobs@sportify.com', '${companyPassword}', 'company'),
            ('rh@luxuryhotel.fr', '${companyPassword}', 'company'),
            ('talent@startuphub.io', '${companyPassword}', 'company'),
            ('emploi@logisticpro.fr', '${companyPassword}', 'company'),
            ('recrutement@retailmax.com', '${companyPassword}', 'company'),
            ('hr@cybersec.io', '${companyPassword}', 'company'),
            ('jobs@agritech.fr', '${companyPassword}', 'company')
        `);
        
        // Candidates users
        await connection.query(`
            INSERT INTO users (email, password, role) VALUES 
            ('marie.dupont@email.com', '${candidatePassword}', 'candidate'),
            ('jean.martin@email.com', '${candidatePassword}', 'candidate'),
            ('sophie.bernard@email.com', '${candidatePassword}', 'candidate'),
            ('thomas.petit@email.com', '${candidatePassword}', 'candidate'),
            ('julie.robert@email.com', '${candidatePassword}', 'candidate'),
            ('alexandre.durand@email.com', '${candidatePassword}', 'candidate'),
            ('camille.dubois@email.com', '${candidatePassword}', 'candidate'),
            ('nicolas.moreau@email.com', '${candidatePassword}', 'candidate'),
            ('emma.laurent@email.com', '${candidatePassword}', 'candidate'),
            ('lucas.simon@email.com', '${candidatePassword}', 'candidate')
        `);
        console.log('      ✓ 31 utilisateurs créés\n');
        
        // Étape 3: Extraire et exécuter les INSERTs de companies
        console.log('   3️⃣  Insertion des entreprises...');
        const companiesMatch = sqlContent.match(/-- Profils entreprises\s*\n(INSERT INTO companies[^;]+;)/s);
        if (companiesMatch) {
            await connection.query(companiesMatch[1]);
        }
        console.log('      ✓ 20 entreprises créées\n');
        
        // Étape 4: Extraire et exécuter les INSERTs de candidates
        console.log('   4️⃣  Insertion des candidats...');
        const candidatesMatch = sqlContent.match(/-- Profils candidats\s*\n(INSERT INTO candidates[^;]+;)/s);
        if (candidatesMatch) {
            await connection.query(candidatesMatch[1]);
        }
        console.log('      ✓ 10 candidats créés\n');
        
        // Étape 5: Extraire et exécuter tous les INSERTs d'advertisements
        console.log('   5️⃣  Insertion des offres d\'emploi...');
        const adsRegex = /INSERT INTO advertisements[^;]+;/gs;
        const adsMatches = sqlContent.match(adsRegex);
        if (adsMatches) {
            for (const adInsert of adsMatches) {
                await connection.query(adInsert);
            }
        }
        console.log('      ✓ Offres d\'emploi créées\n');
        
        // Étape 6: Extraire et exécuter les INSERTs d'applications
        console.log('   6️⃣  Insertion des candidatures...');
        const appsMatch = sqlContent.match(/INSERT INTO applications[^;]+;/s);
        if (appsMatch) {
            await connection.query(appsMatch[0]);
        }
        console.log('      ✓ Candidatures créées\n');
        
        console.log('✅ Données importées avec succès !\n');
        
        // Afficher un résumé
        const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
        const [companies] = await connection.query('SELECT COUNT(*) as count FROM companies');
        const [candidates] = await connection.query('SELECT COUNT(*) as count FROM candidates');
        const [ads] = await connection.query('SELECT COUNT(*) as count FROM advertisements');
        const [apps] = await connection.query('SELECT COUNT(*) as count FROM applications');
        
        console.log('📊 RÉSUMÉ :');
        console.log(`   👥 ${users[0].count} utilisateurs`);
        console.log(`   🏢 ${companies[0].count} entreprises`);
        console.log(`   🙋 ${candidates[0].count} candidats`);
        console.log(`   💼 ${ads[0].count} offres d'emploi`);
        console.log(`   📝 ${apps[0].count} candidatures\n`);
        
        console.log('🎉 Import terminé avec succès !');
        console.log('\n📌 COMPTES DE TEST :');
        console.log('   Admin :     admin@jobboard.com / admin123');
        console.log('   Entreprise: contact@techcorp.com / company123');
        console.log('   Candidat:   marie.dupont@email.com / candidate123\n');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'import:', error.message);
        throw error;
    } finally {
        await connection.end();
    }
}

// Exécuter l'import
importData()
    .then(() => {
        console.log('✨ Terminé !');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Erreur fatale:', error);
        process.exit(1);
    });

