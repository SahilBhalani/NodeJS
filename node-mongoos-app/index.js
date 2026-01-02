const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB Connection Error: ', err);
})

// Define Mongoose Schema 
const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    age: Number
});

const User = mongoose.model('User', UserSchema);

// * Perform CRUD operations

//Create a new user
const newUser = new User(
{
    name: 'Sahil Bhalani',
    email: 'sb@example.com',
    age: 24
});

newUser.save()
.then(() => {
    console.log('User Created');

    //Find users with age >= 25
    return User.find({ age :{ $gte: 25}})
})
.then(users => {
    console.log('Users: ', users);
})