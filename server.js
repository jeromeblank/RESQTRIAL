const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', // or your database host
    user: 'root',      // your MySQL username
    password: '',      // your MySQL password
    database: 'react_native_signup',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { email, password, phone, user_type } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (email, password, phone, user_type) VALUES (?, ?, ?, ?)`;
    db.query(sql, [email, hashedPassword, phone, user_type], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'User registered successfully!' });
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
