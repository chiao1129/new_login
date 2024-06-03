const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hj',
    password: 'test1234',
    database: 'netflix_users'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Use cors middleware
app.use(cors());

// Parse middleware for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// 使用內置的中間件解析 JSON 格式的請求
app.use(express.json());

// 使用內置的中間件解析 URL 編碼的請求
app.use(express.urlencoded({ extended: true }));
// Route handler for POST requests
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Insert email and password into users table
    const sql = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).send('Error executing MySQL query');
            return;
        }
        console.log('User inserted into database with ID: ' + result.insertId);
        res.json({ message: 'User inserted into database' });
    });
});

// Listen on port
const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
