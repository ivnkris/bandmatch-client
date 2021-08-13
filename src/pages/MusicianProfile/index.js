import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import { MUSICIAN_USER } from "../../graphql/queries";
import "./MusicianProfile.css";

const MusicianProfile = (props) => {
  const { id } = useParams();

  const { data: musicianData, loading, error } = useQuery(MUSICIAN_USER, {
    variables: {
      musicianUserId: id,
    },
  });

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
    console.log(musician.lookingFor);
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
        <div className="p-3"></div>
        <ProfileInfo
          imageUrl={musician.imageUrl}
          name={name}
          instruments={instruments}
          genre={genres}
          openTo={openTo()}
          description={musician.description}
          lookingFor={lookingFor}
          soundCloudUrl={musician.soundCloudUrl}
        />

        <SoundCloudWidget soundCloudUrl={musician.soundCloudUrl} />
      </div>
    );
  }
};

export default MusicianProfile;
