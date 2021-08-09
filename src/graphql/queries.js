import { gql } from "@apollo/client";

export const ASSEMBLE = gql`
  query ExampleQuery {
    assemble {
      musicians {
        id
        firstName
        lastName
        description
        genre {
          name
          id
        }
        experienceLevel
        instruments {
          id
          name
          role
        }
        imageUrl
        websiteUrl
        lookingFor {
          id
          name
          role
        }
        soundCloudUrl
        openToCollaboration
        openToJoiningBand
        band
        bandName
        bandImage
      }
      bands {
        id
        name
        description
        location
        genre {
          id
          name
        }
        experienceLevel
        numberOfMembers
        instruments {
          name
          role
          id
        }
        imageUrl
        websiteUrl
        soundCloudUrl
        lookingFor {
          id
          name
          role
        }
        openToCollaboration
        openToMembers
        members {
          id
        }
      }
    }
  }
`;
