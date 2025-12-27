// models/User.js

let users = [];
let idCounter = 1;

class User {
  static async findAll() {
    return users;
  }

  static async findById(id) {
    return users.find(user => user.id === Number(id));
  }

  static async create(data) {
    const newUser = {
      id: idCounter++,
      ...data,
    };
    users.push(newUser);
    return newUser;
  }

  static async update(id, data) {
    const index = users.findIndex(user => user.id === Number(id));
    if (index === -1) return null;

    users[index] = { ...users[index], ...data };
    return users[index];
  }

  static async delete(id) {
    const index = users.findIndex(user => user.id === Number(id));
    if (index === -1) return null;

    const deleted = users.splice(index, 1);
    return deleted[0];
  }
}

module.exports = User;
