import { gql } from "@apollo/client";

export const ASSEMBLE = gql`
  query ExampleQuery($assembleFilters: Filter) {
    assemble(filters: $assembleFilters) {
      musicians {
        id
        firstName
        lastName
        genre {
          id
          name
        }
        experienceLevel
        instruments {
          id
          name
          role
        }
        imageUrl
        lookingFor {
          name
          id
          role
        }
        postcode
      }
      bands {
        id
        name
        location
        genre {
          id
          name
        }
        experienceLevel
        instruments {
          id
          name
          role
        }
        imageUrl
        lookingFor {
          role
          name
          id
        }
        openToMembers
        members {
          id
        }
      }
    }
  }
`;

export const GENRESINSTRUMENTS = gql`
  query Genres {
    genres {
      id
      name
    }
    instruments {
      id
      name
      role
    }
  }
`;
