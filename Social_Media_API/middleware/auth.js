const jwt = require('jsonwebtoken');
const user = require('../models/users');
const User = require('../models/users');
require('dotenv').config();

module.exports = async function (req,res,next) {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = req.headers.authorization.split(' ')[1];

    //check if the token exists
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Add the decoded user information to the request object
        const user = await User.findById(decoded.userId);
        if(!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        req.user = user;

        //Call the middleware function
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};