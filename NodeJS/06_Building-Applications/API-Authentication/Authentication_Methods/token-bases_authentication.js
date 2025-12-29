//* Token-Based Authentication (JWT)
/**
 * JSON Web Tokens(JWT) provides a stateless authentication mechanism that's compact and self-contained.
 * Unlike session-based authentication, token-based authentication (JWT) doesn't require a server to store session data
 * 
 * This makes it ideal for stateless API architecture and microservices.
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const JWT_SECRET = '79db02e9acf193414a504d9a08d6d53d7d25ad8054aea2822b5f1de002b33cd5';

//Sample user database
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user'},
    { id: 2, username: 'sahilb', password: 'sahilb007', role: 'admin'}
];

// Login Route - generate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(u => u.username === username && u.password === password)

  if(!user) {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }

  //Create payload for JWT
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  }

  //sign token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
    //Get auth header - The authorization header is commonly used to send authentication tokens
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    //Extract token from 'Bearer <token>"
    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'Token Missing' });
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        //Attach user to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

//Protected route
app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'Profile accessed', user: req.user});
});

//Role-based route
app.get('/admin', authenticateJWT, (req,res) => {
    //Check if user has admin role
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: admin role required' });
    }

    res.json({ message: 'Admin panel accessed' });
});

//Start server
app.listen(8080, () => {
    console.log('Server running on port 8080');
})