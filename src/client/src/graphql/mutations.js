import { gql } from '@apollo/client';


//Signup we created own , but signup comes from apollo server side

export const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!, $lastName: String!, $email: String!, $phoneno: String, $role: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, phoneno: $phoneno, role: $role, password: $password) {
      user {
        id
        email
        phoneno
        firstName
        lastName
        role
      }
      token
    }
  }
`;


export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
      }
      token
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


