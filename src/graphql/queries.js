import { gql } from "@apollo/client";

export const ASSEMBLE = gql`
  query ExampleQuery(
    $assembleFilters: Filter
    $musiciansOffset: Int
    $bandsOffset: Int
  ) {
    assemble(
      filters: $assembleFilters
      musiciansOffset: $musiciansOffset
      bandsOffset: $bandsOffset
    ) {
      musicians {
        id
        firstName
        lastName
        description
        location
        genre {
          name
          id
        }
        experienceLevel
        instruments {
          name
          id
          role
        }
        imageUrl
        websiteUrl
        soundCloudUrl
        lookingFor {
          role
          id
        }
        openToCollaboration
        openToJoiningBand
      }
      bands {
        name
        id
        description
        location
        genre {
          name
          id
        }
        experienceLevel
        numberOfMembers
        instruments {
          name
          id
          role
        }
        imageUrl
        websiteUrl
        soundCloudUrl
        lookingFor {
          role
          id
        }
        openToCollaboration
        openToMembers
      }
    }
  }
`;

export const ASSEMBLE_CAROUSEL = gql`
  query Query {
    assembleCarousel {
      musicians {
        id
        firstName
        lastName
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
          id
          name
          role
        }
        openToJoiningBand
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
          id
          name
          role
        }
        openToMembers
      }
    }
  }
`;

export const COLLABORATE = gql`
  query Query(
    $collaborateFilters: Filter
    $musiciansOffset: Int
    $bandsOffset: Int
  ) {
    collaborate(
      filters: $collaborateFilters
      musiciansOffset: $musiciansOffset
      bandsOffset: $bandsOffset
    ) {
      bands {
        name
        id
        openToCollaboration
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
          id
          name
          role
        }
      }
      musicians {
        id
        firstName
        lastName
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
          id
          name
          role
        }
        openToCollaboration
      }
    }
  }
`;

export const COLLABORATE_CAROUSEL = gql`
  query Query {
    collaborateCarousel {
      musicians {
        id
        firstName
        lastName
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
          id
          name
          role
        }
        openToCollaboration
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
          id
          name
          role
        }
        openToCollaboration
      }
    }
  }
`;

export const GIGS = gql`
  query Query($gigsFilters: Filter, $gigsOffset: Int) {
    gigs(filters: $gigsFilters, gigsOffset: $gigsOffset) {
      id
      title
      description
      genre {
        name
        id
      }
      imageUrl
      fee
      websiteUrl
      dateTime
      venue {
        id
        name
        postcode
      }
      accepting
      performers {
        musician
        band
        confirmed
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

export const MUSICIAN_USER = gql`
  query Query($musicianUserId: ID!) {
    musicianUser(id: $musicianUserId) {
      id
      firstName
      lastName
      description
      location
      genre {
        name
        id
      }
      experienceLevel
      instruments {
        name
        id
      }
      imageUrl
      websiteUrl
      soundCloudUrl
      lookingFor {
        role
        id
      }
      openToCollaboration
      openToJoiningBand
      email
    }
  }
`;

export const BAND = gql`
  query Query($bandId: ID!) {
    band(id: $bandId) {
      id
      name
      description
      location
      genre {
        name
        id
      }
      experienceLevel
      numberOfMembers
      instruments {
        name
        id
      }
      imageUrl
      websiteUrl
      soundCloudUrl
      lookingFor {
        role
        id
      }
      openToCollaboration
      openToMembers
      musicians {
        id
        email
        firstName
        lastName
        description
        location

        experienceLevel

        imageUrl
        websiteUrl
        soundCloudUrl

        openToJoiningBand
        openToCollaboration
      }
    }
  }
`;

export const BAND_PREVIEW = gql`
  query Query($bandId: ID!) {
    band(id: $bandId) {
      id
      name
      description
      location
      genre {
        name
      }
      experienceLevel
      numberOfMembers
      instruments {
        name
        role
      }
      imageUrl
      soundCloudUrl
    }
  }
`;

export const MUSICIAN_PREVIEW = gql`
  query Query($musicianUserId: ID!) {
    musicianUser(id: $musicianUserId) {
      id
      firstName
      lastName
      description
      location
      genre {
        name
      }
      experienceLevel
      instruments {
        name
        role
      }
      imageUrl
      soundCloudUrl
    }
  }
`;

export const GIG_PREVIEW = gql`
  query Query($gigId: ID!) {
    gig(id: $gigId) {
      id
      title
      description
      genre {
        name
      }
      fee
      websiteUrl
      dateTime
      venue {
        id
        name
        postcode
      }
      imageUrl
    }
  }
`;

export const CONVERSATIONS = gql`
  query Query($bandConversationsBandId: ID!, $conversationsId: ID!) {
    bandConversations(bandId: $bandConversationsBandId) {
      id
      participants {
        id
        name
        firstName
        lastName
        imageUrl
      }
      messages {
        id
        senderId
        text
      }
    }
    conversations(id: $conversationsId) {
      id
      participants {
        id
        name
        firstName
        lastName
        imageUrl
      }
      messages {
        id
        senderId
        text
      }
    }
  }
`;

export const VALIDATE_BAND_MEMBERS = gql`
  query Query($checkIfMusicianExistsInput: checkMusicianInput!) {
    checkIfMusicianExists(input: $checkIfMusicianExistsInput) {
      email
      exists
      id
    }
  }
`;

export const CONVERSATION = gql`
  query Query($conversationId: ID!) {
    conversation(id: $conversationId) {
      id
      participants {
        id
        email
        firstName
        lastName
        imageUrl
      }
      messages {
        text
        senderId
        id
      }
    }
  }
`;

export const BANDS = gql`
  query Query($bandsFilters: Filter) {
    bands(filters: $bandsFilters) {
      id
      name
      musicians {
        lastName
        firstName
        id
      }
      genre {
        id
        name
      }
      description
      location
      experienceLevel
      numberOfMembers
      instruments {
        id
        name
      }
      imageUrl
      websiteUrl
      soundCloudUrl
      lookingFor {
        id
        role
      }
      openToCollaboration
      openToMembers
    }
  }
`;

export const GIG_REQUESTS = gql`
  query Query($gigRequestsId: ID!) {
    gigRequests(id: $gigRequestsId) {
      id
      title
      dateTime
      performers {
        _id
        musician
        band
        confirmed
        musicianDetails {
          firstName
          lastName
          imageUrl
          description
        }
        bandDetails {
          name
          imageUrl
          description
        }
      }
      accepting
    }
  }
`;

export const VENUE = gql`
  query Query($venueId: ID!) {
    venue(id: $venueId) {
      id
      email
      firstName
      lastName
      name
      postcode
      photoUrl
      description
      websiteUrl
    }
  }
`;

export const MUSICIANS = gql`
  query Query {
    musicians {
      id
      email
      firstName
      lastName
      description
      location
      genre {
        name
        id
      }
      experienceLevel
      instruments {
        id
        name
      }
      imageUrl
      websiteUrl
      soundCloudUrl
      lookingFor {
        role
        id
      }
      openToCollaboration
      openToJoiningBand
    }
  }
`;
