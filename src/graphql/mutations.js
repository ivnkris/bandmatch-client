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
        description
        experienceLevel
        imageUrl
        websiteUrl
        soundCloudUrl
        openToCollaboration
        openToJoiningBand
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
        description
        genre {
          id
        }
        experienceLevel
        instruments {
          id
        }
        imageUrl
        websiteUrl
        soundCloudUrl
        lookingFor {
          id
        }
        openToCollaboration
        openToJoiningBand
      }
    }
  }
`;
