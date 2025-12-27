//* Understanding RESTful APIs
/**
 * REST(Representational State Transfer) is an architecture style for designing networked applications that has become the standard for web services
 * 
 * RESTful APIs provide a flexible, lightweight way to integrate applications and enables communication between differrent systems
 * 
 * Core Concepets:
 * ~ Resources: Everything is a resource(user, product,order)
 * ~ Representations: Resource can have multiple representations (JSON, XML, etc.)
 * ~ Stateless: Each request contains all necessary information
 * ~ Uniform Interface: Consistent way to access and manipulate resources 
 *
 * RESTful APIs use HTTP requests to perform CRUD operations (Create, Read, Update, Delete) on resources, which are represented as URLs
 * 
 * REST is stateless, meaning each request from a client to a server must contain all the information needed to understand and process the request
 */

//* Core REST Principles
//Key Principal in Practice:
/**
 * Resource-Bases:: Focus on resources rather than actions
 * Stateless: Each request is independent and self-contained
 * Cacheable: Responses define their cachebility
 * Uniform-Interface: Consistent Resources identification and manipulation
 * Layered System: Client doesn't need to know about the underlying architecture
 */

//* HTTP Methods and Their Usage
//Restful APIs use standard HTTP methods to perform operations on resources
//Each method has specific semantics and should be used appropriately

//* Idempotency and Safety:
/**
 * ~ Safe Methods: GET,HEAD,OPTIONS (should not modify resources)
 * ~ Idempotent Methods: GET,PUT,DELETE (multiple identical request = same effect as one)
 * ~ Non-Idempotent: POST,PATCH (may have different effects with multiple calls)
 */

//TODO: Using Different HTTP Methods
const express = require('express');
const app = express();

//Middleware fir parsing JSON
app.use(express.json());

let users = [
    { id: 1, name: 'John Doe', email:'john@example.com'},
    { id: 2, name:'Jane Smith', email: 'jane@example.com'}
];

// GET - Retrieve all users
app.get('/api/users', (req, res) => {
  res.send(users);
})

// GET - Retrieve a specific user
app.get('/api/users/:id', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
})

// POST - Create a new user
app.post('/api/users', (req,res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
})

// PUT - Update a user completely
app.put('/api/users/:id', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({ message: 'User not found' })

        user.name = req.body.name;
        user.email = req.body.email;

        res.json(user);
})

// DELETE - Remove a user
app.delete('/api/users/:id', (req,res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if(userIndex === -1) return res.status(404).json({ message: 'User not found' });

    const deleteUser = users.splice(userIndex, 1);
    res.json(deleteUser[0]);
});

app.listen(8080, () => {
    console.log('REST API server runnig on port http://localhost:8080');
})

//* RESTful API Structure and Design
//A well-designed API follows consistent patterns that make it intuitive and easy to use. Good API design is crucial for developer experiece and long term maintainability
/**
 * * Design Considerations:
 * ~ Resource Naming: Use nouns, not verbs(e.g /users not /getUsers)
 * ~ Pluralization : Use Plural for collections (/users/123 not /user/123)
 * ~ Hierarchy: Nest resources to show relationship(/users/123/orders)
 * ~ Filtering/Sorting: Use query parameters for optional operations
 * ~ Versioning Strategy: Plan for API Versioning from the start (e.g /v1/users vs /v2/users)
 * 
 * * A Well-stuctured API follows these convetions:
 * ~ Use nouns for resources: /users,/products./orders (not /getUsers)
 * ~ Use plurals for collections: /users instead of /user
 * ~ Nest resources for relationship: /users/123/orders
 * ~ Ue query parameters for filtering: /products?category=electronics&min_price=100
 * ~ Keep URls consistent: Choose a convention(kebab-case, camelCase) and stick to it
 */

//* Example: Well-structured API Routes
app.get('/api/products', getProducts);
app.get('/api.products/:id', getProductsById);
app.get('/api/products/:id/reviews', getProductReviews);
app.get('/api/users/:userId/orders', getUserOrders);
app.post('/api/orders',createOrder);

//Filtering and paginations
app.get('/api/products?category=electronics&sort=price&limit=10&page=2');
