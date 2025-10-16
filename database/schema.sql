-- ============================================
-- Job Board Database Schema
-- ============================================

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS advertisements;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS users;

-- ============================================
-- Table: users (Authentication)
-- ============================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('candidate', 'company', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Table: candidates (Candidate profiles)
-- ============================================
CREATE TABLE candidates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    cv_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- Table: companies (Company profiles)
-- ============================================
CREATE TABLE companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- Table: advertisements (Job ads)
-- ============================================
CREATE TABLE advertisements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    full_description TEXT,
    location VARCHAR(255),
    contract_type VARCHAR(50),
    working_time VARCHAR(50),
    salary_min DECIMAL(10, 2),
    salary_max DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- ============================================
-- Table: applications (Job applications)
-- ============================================
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    advertisement_id INT NOT NULL,
    candidate_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    message TEXT,
    status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (advertisement_id) REFERENCES advertisements(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- ============================================
-- Indexes for better performance
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_advertisements_company ON advertisements(company_id);
CREATE INDEX idx_advertisements_active ON advertisements(is_active);
CREATE INDEX idx_applications_ad ON applications(advertisement_id);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_status ON applications(status);

-- ============================================
-- Sample data for testing
-- ============================================

-- Insert admin user
INSERT INTO users (email, password, role) VALUES 
('admin@jobboard.com', '$2b$10$YourHashedPasswordHere', 'admin');

-- Insert company users
INSERT INTO users (email, password, role) VALUES 
('contact@techcorp.com', '$2b$10$YourHashedPasswordHere', 'company'),
('hr@innovate.com', '$2b$10$YourHashedPasswordHere', 'company');

-- Insert company profiles
INSERT INTO companies (user_id, name, description, website) VALUES 
(2, 'TechCorp', 'Leading technology company specializing in software development', 'https://techcorp.com'),
(3, 'Innovate Solutions', 'Innovative solutions for modern businesses', 'https://innovate.com');

-- Insert candidate users
INSERT INTO users (email, password, role) VALUES 
('john.doe@example.com', '$2b$10$YourHashedPasswordHere', 'candidate'),
('jane.smith@example.com', '$2b$10$YourHashedPasswordHere', 'candidate');

-- Insert candidate profiles
INSERT INTO candidates (user_id, first_name, last_name, phone) VALUES 
(4, 'John', 'Doe', '+33612345678'),
(5, 'Jane', 'Smith', '+33687654321');

-- Insert advertisements
INSERT INTO advertisements (company_id, title, short_description, full_description, location, contract_type, working_time, salary_min, salary_max, is_active) VALUES 
(1, 'Développeur Full Stack', 'Rejoignez notre équipe pour créer des applications innovantes', 'Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets variés utilisant les dernières technologies.', 'Paris, France', 'CDI', 'Temps plein', 35000, 45000, TRUE),
(1, 'DevOps Engineer', 'Optimisez notre infrastructure cloud', 'En tant que DevOps Engineer, vous serez responsable de l''automatisation et de l''optimisation de notre infrastructure. Expérience avec Docker, Kubernetes et CI/CD requise.', 'Lyon, France', 'CDI', 'Temps plein', 40000, 55000, TRUE),
(2, 'Designer UX/UI', 'Créez des expériences utilisateur exceptionnelles', 'Nous cherchons un designer créatif pour concevoir des interfaces intuitives et élégantes. Maîtrise de Figma et sens du détail essentiels.', 'Remote', 'CDD', 'Temps plein', 30000, 40000, TRUE);

-- Insert applications
INSERT INTO applications (advertisement_id, candidate_id, message, status) VALUES 
(1, 1, 'Je suis très intéressé par ce poste et je pense que mon expérience correspond parfaitement.', 'pending'),
(2, 2, 'Avec 5 ans d''expérience en DevOps, je serais ravi de rejoindre votre équipe.', 'reviewed');

