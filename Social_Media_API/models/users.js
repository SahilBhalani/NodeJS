const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

userSchema.pre('save', async function () {
   if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10)
   }
}); 

const User = mongoose.model('User', userSchema);

module.exports = User;
