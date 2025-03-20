const db = require('../db');

// Function to validate school data
const validateSchoolData = (data) => {
    const { name, address, latitude, longitude } = data;
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new Error('Invalid input data'); // Ensure required fields are valid
    }
};

// Function to add a new school to the database
const addSchool = async (schoolData) => {
    validateSchoolData(schoolData); // Validate incoming data
    const { name, address, latitude, longitude } = schoolData;

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const values = [name, address, latitude, longitude];

    const [result] = await db.execute(query, values); // Insert new school data

    // Fetch and return the full school data by ID
    const [newSchool] = await db.execute('SELECT * FROM schools WHERE id = ?', [result.insertId]);

    return newSchool[0]; // Return the newly added school object
};

// Function to calculate distance between two geographic coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Return calculated distance in kilometers
};

// Function to list schools sorted by proximity to user location
const listSchools = async (userLat, userLon) => {
    const query = 'SELECT * FROM schools';
    const [schools] = await db.execute(query); // Fetch all schools from database

    // Calculate distance for each school and sort them by proximity
    return schools.map(school => {
        const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
        return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance); // Sort by nearest schools first
};

module.exports = {
    addSchool,
    listSchools,
};
