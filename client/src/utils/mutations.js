import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login( $password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $firstName:String, $lastName: String ) {
    addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        username
      }
    }
  }
`;