const mysql = require('mysql2/promise');
require('dotenv').config();

async function clearData() {
    console.log('⚠️  ATTENTION : Cette opération va supprimer TOUTES les données !\n');
    
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
    
    console.log('✅ Connecté à la base de données\n');
    console.log('🗑️  Suppression des données...\n');
    
    try {
        // Supprimer dans l'ordre inverse des dépendances
        await connection.query('DELETE FROM applications');
        console.log('   ✓ Applications supprimées');
        
        await connection.query('DELETE FROM advertisements');
        console.log('   ✓ Advertisements supprimées');
        
        await connection.query('DELETE FROM companies');
        console.log('   ✓ Companies supprimées');
        
        await connection.query('DELETE FROM candidates');
        console.log('   ✓ Candidates supprimés');
        
        await connection.query('DELETE FROM users');
        console.log('   ✓ Users supprimés\n');
        
        console.log('✅ Toutes les données ont été supprimées !');
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        throw error;
    } finally {
        await connection.end();
    }
}

clearData()
    .then(() => {
        console.log('✨ Terminé !');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Erreur fatale:', error);
        process.exit(1);
    });

