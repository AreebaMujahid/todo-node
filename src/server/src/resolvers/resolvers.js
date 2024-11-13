const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const signupFilePath = path.join(__dirname, '../../../files/signup.json');   //__dirname means current folder

const readUsers = () => {
  try {
    const data = fs.readFileSync(signupFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(signupFilePath, JSON.stringify(users, null, 2));
};

const resolvers = {
  Mutation: {
    signup: (_, { firstName, lastName, email, phoneno, role }) => {
      const users = readUsers();
      if (users.some(user => user.email === email)) {
        throw new Error('Email already exists');
      }

      const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        phoneno,
        role,
      };

      users.push(newUser);
      writeUsers(users);
      return newUser;
    },
  },
};


module.exports = resolvers;
