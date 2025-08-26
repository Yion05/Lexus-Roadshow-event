export const FORM_DB = {
    insert_submission: {
        query: `
        INSERT INTO form_submissions (
        id,
        submission_id,
        full_name,
        contact_number,
        email_address,
        gender,
        age_range,
        monthly_income,
        assigned_sales_consultant,
        interested_car_model,
        test_drive_preference,
        license_expiry_date,
        driving_license
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13
    );`
    },
    get_submission: {
        query: `
            SELECT
                s.id AS submission_id,
                s.contact_number,
                s.full_name,
                s.email,
                s.form_title,
                s.submitted_at,
                f.gender,
                f.age_range,
                f.monthly_income,
                f.assigned_sales_consultant,
                f.interested_car_model,
                f.test_drive_preference,
                f.license_expiry_date,
                f.driving_license,
                f.created_at
            FROM submissions s
            JOIN form_submissions f ON s.id = f.submission_id;
        `
    },
    page_reading: {
        query: `
            SELECT
                s.id AS submission_id,
                s.contact_number,
                s.full_name,
                s.email,
                s.form_title,
                s.submitted_at,
                f.gender,
                f.age_range,
                f.monthly_income,
                f.assigned_sales_consultant,
                f.interested_car_model,
                f.test_drive_preference,
                f.license_expiry_date,
                f.driving_license,
                f.created_at
            FROM submissions s
            JOIN form_submissions f ON s.id = f.submission_id
            ORDER BY s.submitted_at DESC
            LIMIT $1 OFFSET $2;
        `
    },
}