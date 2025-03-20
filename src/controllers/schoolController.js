const schoolService = require('../services/schoolService');

exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Log the input data
    console.log('Received data:', { name, address, latitude, longitude });

    // Validate input data
    if (!name || !address || !latitude || !longitude) {
        console.log('Validation failed: All fields are required.');
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newSchool = await schoolService.addSchool({ name, address, latitude, longitude });
        console.log('School added successfully:', newSchool);
        return res.status(201).json({ message: 'School added successfully.', school: newSchool });
    } catch (error) {
        console.error('Error adding school:', error);
        return res.status(500).json({ message: 'Error adding school.', error: error.message });
    }
};

exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.body;

    // Log the input data
    console.log('Received data:', { latitude, longitude });

    // Validate input data
    if (!latitude || !longitude) {
        console.log('Validation failed: Latitude and longitude are required.');
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    try {
        const schools = await schoolService.listSchools(latitude, longitude);
        console.log('Schools retrieved successfully:', schools);
        return res.status(200).json(schools);
    } catch (error) {
        console.error('Error retrieving schools:', error);
        return res.status(500).json({ message: 'Error retrieving schools.', error: error.message });
    }
};