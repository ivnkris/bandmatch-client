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
      type
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
      type
    }
  }
`;

export const SIGNUP_VENUE_USER = gql`
  mutation Mutation($signUpVenueUserInput: SignupVenueInput!) {
    signUpVenueUser(input: $signUpVenueUserInput) {
      token
      user {
        id
        firstName
        email
        lastName
        imageUrl
      }
      type
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
