import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import Title from "../../components/Title";
import Button from "../../components/Button";

import { useUserContext } from "../../contexts/UserProvider";
import { GIGS, MUSICIAN_USER } from "../../graphql/queries";
import {
  constructGigCards,
  constructPerformerCards,
} from "../../utils/constructCards";
import "./MusicianProfile.css";

const MusicianProfile = (props) => {
  const { state } = useUserContext();
  const { id: musicianId } = useParams();

  const myProfile = musicianId === state.user.id;

  const { data: musicianData, loading, error } = useQuery(MUSICIAN_USER, {
    variables: {
      musicianUserId: musicianId,
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const { data: gigsData, loading: gigsLoading, error: gigsError } = useQuery(
    GIGS,
    {
      variables: {
        gigsFilters: {
          musician: musicianId,
        },
      },

      onError: (error) => {
        console.log(error);
      },
    }
  );

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (musicianData) {
    const musician = musicianData.musicianUser;

    const name = musician.firstName + " " + musician.lastName;
    const openTo = () => {
      if (musician.openToCollaboration && musician.openToJoiningBand) {
        return "OPEN TO COLLABORATION | OPEN TO JOINING A BAND";
      } else if (musician.openToCollaboration && !musician.openToJoiningBand) {
        return "OPEN TO COLLABORATION";
      } else if (!musician.openToCollaboration && musician.openToJoiningBand) {
        return "OPEN TO JOINING A BAND";
      } else {
        return "";
      }
    };
    let genres = [];
    let instruments = [];
    let lookingFor = [];
    musician.genre.forEach((genre) => {
      genres.push(genre.name);
    });
    musician.instruments.forEach((instrument) => {
      instruments.push(instrument.name);
    });
    musician.lookingFor.forEach((looking) => {
      lookingFor.push(looking.role);
    });
    return (
      <div className="profile-container">
        <div className="p-2"></div>
        {myProfile ? (
          <div className="see-through-background-90 text-align-center profile-title-div">
            <Title type="profile" text="MY PROFILE" />
            <div className="create-band-button ">
              <Button label="CREATE A BAND" mode="primary" size="medium" />
            </div>
          </div>
        ) : (
          <div className="see-through-background-90 text-align-center profile-title-div">
            <p className="title mb-2 pt-2 fs-1">{name}</p>
            <p className="mb-3">{openTo()}</p>

            <p className="p-yellow mt-2 text-limit-one-line">
              LOOKING FOR:{" "}
              <span className="looking-for">{lookingFor.join(" | ")}</span>
            </p>
          </div>
        )}
        <ProfileInfo
          imageUrl={musician.imageUrl}
          name={name}
          instruments={instruments}
          genre={genres}
          openTo={openTo()}
          description={musician.description}
          lookingFor={lookingFor}
          soundCloudUrl={musician.soundCloudUrl}
          myProfile={myProfile}
        />
        <SoundCloudWidget soundCloudUrl={musician.soundCloudUrl} />

        <div className="see-through-background-90 text-align-center">
          {myProfile ? (
            <Title type="section" text="MY GIGS" />
          ) : (
            <p className="title mb-2 pt-2 fs-1">{musician.firstName}'s GIGS</p>
          )}

          {gigsData && (
            <div className="cards-container">
              {constructGigCards(gigsData.gigs)}
            </div>
          )}
        </div>

        <div className="see-through-background-90 text-align-center">
          {myProfile ? (
            <Title type="section" text="MY BANDS" />
          ) : (
            <p className="title mb-2 pt-2 fs-1">{musician.firstName}'s BANDS</p>
          )}

          <div className="cards-container">
            {/* {constructPerformerCards(musician.bands, "shortened")} */}
          </div>
        </div>
      </div>
    );
  }
};

export default MusicianProfile;
