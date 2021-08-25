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
				name
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
	mutation Mutation($signupVenueUserInput: SignupVenueInput!) {
		signupVenueUser(input: $signupVenueUserInput) {
			token
			user {
				id
				firstName
				email
				lastName
				name
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

export const CREATE_BAND = gql`
	mutation CreateBandMutation($createBandInput: BandInput!) {
		createBand(input: $createBandInput) {
			id
		}
	}
`;

export const CREATE_GIG = gql`
	mutation CreateGigMutation($createGigInput: GigInput) {
		createGig(input: $createGigInput) {
			id
		}
	}
`;

export const UPDATE_MUSICIAN = gql`
	mutation UpdateMusicianUserMutation(
		$updateMusicianUserInput: updateMusicianUserInput
	) {
		updateMusicianUser(input: $updateMusicianUserInput) {
			id
		}
	}
`;

export const UPDATE_GIG_REQUEST = gql`
	mutation Mutation($updateGigRequestInput: updateGigRequestInput) {
		updateGigRequest(input: $updateGigRequestInput) {
			id
			title
		}
	}
`;
