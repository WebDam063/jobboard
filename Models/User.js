const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async create(email, password, role) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, hashedPassword, role]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async getAll(limit, offset) {
        const [rows] = await db.query('SELECT id, email, role, created_at FROM users LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    }

    static async count() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM users');
        return rows[0].total;
    }

    static async update(id, data) {
        const fields = [];
        const values = [];

        if (data.email) {
            fields.push('email = ?');
            values.push(data.email);
        }
        if (data.password) {
            fields.push('password = ?');
            values.push(await bcrypt.hash(data.password, 10));
        }
        if (data.role) {
            fields.push('role = ?');
            values.push(data.role);
        }

        values.push(id);

        const [result] = await db.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows;
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;

