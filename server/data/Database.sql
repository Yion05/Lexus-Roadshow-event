CREATE TABLE IF NOT exists submissions(
    id TEXT PRIMARY KEY UNIQUE,
    contact_number TEXT NOT NULL UNIQUE,
    full_name TEXT,
    email TEXT,
    form_title TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT exists answers(
    id TEXT PRIMARY KEY UNIQUE,
    submission_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    answer_value JSON,
    FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT exists form_submissions (
    id TEXT PRIMARY KEY UNIQUE,
    submission_id VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    gender VARCHAR(50),
    age_range VARCHAR(50),
    monthly_income VARCHAR(50),
    assigned_sales_consultant VARCHAR(255),
    interested_car_model JSON,
    test_drive_preference BOOLEAN,
    license_expiry_date DATE,
    driving_license VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT exists otp_verifications IF NOT exists(
    contact_number VARCHAR PRIMARY KEY,
    otp_hash VARCHAR NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_verified BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT exists admin_user(
    id TEXT PRIMARY KEY UNIQUE,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    isActive BOOLEAN
);
