let users = [
  { id: 1, name: 'Indranil Dahivele', email: 'indranildahivele@gmail.com' },
  { id: 2, name: 'Rohan Tarange', email: 'rohantarange@gmail.com' },
];

let nextId = 3;

function getAllUsers() {
  return users;
}

function findUserById(id) {
  return users.find((user) => user.id === id);
}

function createUserRecord(name, email) {
  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);
  return newUser;
}

function updateUserRecord(id, name, email) {
  const user = findUserById(id);
  if (!user) {
    return null;
  }

  user.name = name;
  user.email = email;
  return user;
}

function deleteUserRecord(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }

  const [deletedUser] = users.splice(index, 1);
  return deletedUser;
}

module.exports = {
  getAllUsers,
  findUserById,
  createUserRecord,
  updateUserRecord,
  deleteUserRecord,
};
