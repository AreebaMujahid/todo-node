import { gql } from '@apollo/client';


//Signup we created own , but signup comes from apollo server side

export const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!, $lastName: String!, $email: String!, $phoneno: String, $role: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, phoneno: $phoneno, role: $role) {
      id
      email
      phoneno
      firstName
      lastName
      role
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $phoneno: String) {
    login(email: $email, phoneno: $phoneno) {
      
      email
      phoneno
      
    }
  }
`;

export const ADD_TASK_MUTATION = gql`
  mutation AddTask($id: String!, $description: String!, $email: String!) {
    addTask(id: $id, description: $description, email: $email) {
      id
      description
      email
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTodo($id: ID!, $description: String!) {
    updateTodo(id: $id, description: $description) {
      id
      description
    }
  }


`;


