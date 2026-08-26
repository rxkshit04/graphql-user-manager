import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      role: $role
    ) {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String!
    $email: String!
    $role: String!
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      role: $role
    ) {
      id
      name
      email
      role
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;