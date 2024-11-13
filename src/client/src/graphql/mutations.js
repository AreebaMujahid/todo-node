import { gql } from '@apollo/client';

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


// Define and export the mutation
export const ADD_TASK_MUTATION = gql`
  mutation AddTask($id: ID!, $email: String!,$description: String!) {
    addTask(id: $id, email: $email , description: $description,) {
      id
      email
      description
    }
  }
`;

