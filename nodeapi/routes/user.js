const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 30,
    host: 'localhost',
    user: 'root',
    // password: '',
    database: 'test'
});

function getConnexion() {
    return pool;
}

router.get('/', function (req, res) {
    res.send('root');
});

router.get('/users', function (req, res) {
    queryString = 'SELECT * FROM users';
    getConnexion().query(queryString, (err, rows, fields) => {
        res.json(rows);
    });
});

router.get('/users/:id', function (req, res) {
    const userId = req.params.id;
    queryString = 'SELECT * FROM users WHERE id = ?';

    getConnexion().query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log('error in query ' + err);
            res.sendStatus(500);
            return
        }
        const users = rows.map((row) => {
            return { id: row.id, name: row.name }
        });
        res.json(users);
    });
});

router.post('/user_create', function (req, res) {
    // const id = req.body.create_id
    console.log(req.body);
    const name = req.body.name

    queryString = 'INSERT INTO users (id, name) VALUES (NULL, ?)';
    getConnexion().query(queryString, [name], (err, rows, fields) => { // queryString, [id, name]
        if (err) {
            console.log('error in query ' + err);
            res.sendStatus(500);
            return
        }
        res.json(rows);
    });
});


module.exports = router;