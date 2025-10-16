const db = require('../config/database');

class Application {
    static async create(advertisementId, data) {
        const [result] = await db.query(
            `INSERT INTO applications 
            (advertisement_id, candidate_id, first_name, last_name, email, phone, message, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                advertisementId,
                data.candidate_id || null,
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.message,
                data.status || 'pending'
            ]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.query(`
            SELECT app.*, 
                   ad.title as advertisement_title,
                   c.name as company_name,
                   cand.first_name as candidate_first_name,
                   cand.last_name as candidate_last_name
            FROM applications app
            JOIN advertisements ad ON app.advertisement_id = ad.id
            JOIN companies c ON ad.company_id = c.id
            LEFT JOIN candidates cand ON app.candidate_id = cand.id
            WHERE app.id = ?
        `, [id]);
        return rows[0];
    }

    static async getAll(limit, offset, filters = {}) {
        let query = `
            SELECT app.*, 
                   ad.title as advertisement_title,
                   c.name as company_name
            FROM applications app
            JOIN advertisements ad ON app.advertisement_id = ad.id
            JOIN companies c ON ad.company_id = c.id
        `;
        const conditions = [];
        const values = [];

        if (filters.advertisement_id) {
            conditions.push('app.advertisement_id = ?');
            values.push(filters.advertisement_id);
        }

        if (filters.candidate_id) {
            conditions.push('app.candidate_id = ?');
            values.push(filters.candidate_id);
        }

        if (filters.status) {
            conditions.push('app.status = ?');
            values.push(filters.status);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY app.created_at DESC LIMIT ? OFFSET ?';
        values.push(limit, offset);

        const [rows] = await db.query(query, values);
        return rows;
    }

    static async count(filters = {}) {
        let query = 'SELECT COUNT(*) as total FROM applications';
        const conditions = [];
        const values = [];

        if (filters.advertisement_id) {
            conditions.push('advertisement_id = ?');
            values.push(filters.advertisement_id);
        }

        if (filters.candidate_id) {
            conditions.push('candidate_id = ?');
            values.push(filters.candidate_id);
        }

        if (filters.status) {
            conditions.push('status = ?');
            values.push(filters.status);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await db.query(query, values);
        return rows[0].total;
    }

    static async update(id, data) {
        const fields = [];
        const values = [];

        if (data.status) {
            fields.push('status = ?');
            values.push(data.status);
        }

        if (data.message !== undefined) {
            fields.push('message = ?');
            values.push(data.message);
        }

        values.push(id);

        const [result] = await db.query(
            `UPDATE applications SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM applications WHERE id = ?', [id]);
        return result.affectedRows;
    }

    // Méthodes pour les entreprises
    static async getByCompany(companyId, limit, offset, status = '') {
        let query = `
            SELECT app.*, 
                   ad.title as advertisement_title,
                   ad.id as advertisement_id,
                   c.name as company_name
            FROM applications app
            JOIN advertisements ad ON app.advertisement_id = ad.id
            JOIN companies c ON ad.company_id = c.id
            WHERE c.id = ?
        `;
        const values = [companyId];

        if (status) {
            query += ' AND app.status = ?';
            values.push(status);
        }

        query += ' ORDER BY app.created_at DESC LIMIT ? OFFSET ?';
        values.push(limit, offset);

        const [rows] = await db.query(query, values);
        return rows;
    }

    static async countByCompany(companyId, status = '') {
        let query = `
            SELECT COUNT(*) as total 
            FROM applications app
            JOIN advertisements ad ON app.advertisement_id = ad.id
            WHERE ad.company_id = ?
        `;
        const values = [companyId];

        if (status) {
            query += ' AND app.status = ?';
            values.push(status);
        }

        const [rows] = await db.query(query, values);
        return rows[0].total;
    }

    static async findByIdWithDetails(id) {
        const [rows] = await db.query(`
            SELECT app.*, 
                   ad.title as advertisement_title,
                   ad.id as advertisement_id,
                   ad.company_id,
                   c.name as company_name,
                   cand.first_name as candidate_first_name,
                   cand.last_name as candidate_last_name
            FROM applications app
            JOIN advertisements ad ON app.advertisement_id = ad.id
            JOIN companies c ON ad.company_id = c.id
            LEFT JOIN candidates cand ON app.candidate_id = cand.id
            WHERE app.id = ?
        `, [id]);
        return rows[0];
    }

    static async updateStatus(id, status) {
        const [result] = await db.query(
            'UPDATE applications SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows;
    }
}

module.exports = Application;

