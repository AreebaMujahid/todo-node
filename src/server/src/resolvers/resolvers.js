//usually all the database logic is written in service instead of resolvers


const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');





const signupFilePath = path.join(__dirname, '../../../files/signup.json');   //__dirname means current folder
const loginFilePath = path.join(__dirname, '../../../files/login.json')
const taskFilePath = path.join(__dirname, '../../../files/todo.json')

const readUsers = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = (users , file) => {
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
};

const resolvers = {
  Mutation: {
    signup: (_, { firstName, lastName, email, phoneno, role }) => {
      const users = readUsers(signupFilePath);
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
      writeUsers(users, signupFilePath);
      return newUser;
    },
    login: (_, { email, phoneno }) => {
      try {
        const users = readUsers(signupFilePath);
        const loginUsers = readUsers(loginFilePath);
        console.log('Loaded users:', users);
        const user = users.find(user => user.email === email && user.phoneno === phoneno);
    
        if (!user) {
          console.error('User not found for login attempt:', { email, phoneno });
          throw new Error('User not found');
        }
    
        const newLogin = { email: user.email, phoneno: user.phoneno };
        console.log('Successful login:', newLogin);
    
        loginUsers.push(newLogin);
        writeUsers(loginUsers, loginFilePath);
        return newLogin;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    addTask: (_, { id, description, email }) => {
      const tasks = readUsers(taskFilePath);
      const newTask = { id, description, email };

      // Add the new task to the array
      tasks.push(newTask);

      // Write the updated tasks array to the file
      writeUsers(tasks, taskFilePath);

      // Return the new task
      return newTask;
    },

    updateTodo: (_, { id, description }) => {
      const todos = readUsers(taskFilePath); // Function to read todos from a file or database
      const todoIndex = todos.findIndex(todo => todo.id === id);

      if (todoIndex === -1) {
        throw new Error('Todo not found');
      }

      todos[todoIndex].description = description;
      writeUsers(todos, taskFilePath); // Function to save the updated todos

      return todos[todoIndex];
    }
    
  },
};


module.exports = resolvers;
