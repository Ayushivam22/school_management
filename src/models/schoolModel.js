const mysql = require('mysql');
const db = require('../db');

// Define the School model
const School = {
    create: (schoolData, callback) => {
        const { name, address, latitude, longitude } = schoolData;
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        db.query(query, [name, address, latitude, longitude], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results.insertId);
        });
    },

    findAll: (userLatitude, userLongitude, callback) => {
        const query = 'SELECT *, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance FROM schools HAVING distance < 10000 ORDER BY distance';
        db.query(query, [userLatitude, userLongitude, userLatitude], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
};

module.exports = School;