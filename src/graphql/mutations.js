import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($signupInput: SignupInput!) {
    signup(input: $signupInput) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation Mutation($createMessageInput: MessageInput!) {
    createMessage(input: $createMessageInput) {
      id
      senderId
      text
    }
  }
`;
