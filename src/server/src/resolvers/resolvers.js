//usually all the database logic is written in service instead of resolvers


const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const User = require('../../models/signup');
const LoginUser = require('../../models/login');
const { generateToken } = require('../../../services/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');







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
    signup: async (_, { firstName, lastName, email, phoneno, role, password }) => {
      try {
        const user = new User({ firstName, lastName, email, phoneno, role , password });
        await user.save(); // Save user to MongoDB
        console.log("user successfully stored in mongodb");
        // Generate JWT token
        const token = generateToken(user);

        // Return the user and token
        return {
          user,
          token,
        };
        //return user;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
    },
    login: async (_, { email, password }) => {
      try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          console.error('User not found:', email);
          throw new Error('Email does not exist');
        }
    
        // Compare the entered password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          console.error('Invalid password for user:', email);
          throw new Error('Invalid password');
        }
    
        // Generate a JWT token
        const token = jwt.sign(
          {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          process.env.JWT_SECRET, // Use a secure secret from environment variables
          { expiresIn: '1h' } // Token expiry time
        );
    
        console.log('User successfully logged in:', user.email);
    
        return {
          user,
          token,
        };
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Failed to log in');
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
