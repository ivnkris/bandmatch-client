import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import { BAND } from "../../graphql/queries";
import { constructGigCards } from "../../utils/constructCards";
import "./BandProfile.css";

const BandProfile = (props) => {
  const { id } = useParams();

  const { data: bandData, loading, error } = useQuery(BAND, {
    variables: {
      bandId: id,
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (bandData) {
    const band = bandData.band;
    const name = band.name;
    const openTo = () => {
      if (band.openToCollaboration && band.openToMembers) {
        return "OPEN TO COLLABORATION | OPEN TO NEW MEMBERS";
      } else if (band.openToCollaboration && !band.openToMembers) {
        return "OPEN TO COLLABORATION";
      } else if (!band.openToCollaboration && band.openToMembers) {
        return "OPEN TO NEW MEMBERS";
      } else {
        return "";
      }
    };
    let genres = [];
    let instruments = [];
    let lookingFor = [];
    band.genre.forEach((genre) => {
      genres.push(genre.name);
    });
    band.instruments.forEach((instrument) => {
      instruments.push(instrument.name);
    });
    band.lookingFor.forEach((looking) => {
      lookingFor.push(looking.role);
    });
    return (
      <div className="profile-container">
        <div className="p-2"></div>

        <ProfileInfo
          imageUrl={band.imageUrl}
          name={name}
          instruments={instruments}
          genre={genres}
          openTo={openTo()}
          description={band.description}
          lookingFor={lookingFor}
          soundCloudUrl={band.soundCloudUrl}
        />
        <SoundCloudWidget soundCloudUrl={band.soundCloudUrl} />

        <div className="see-through-background-90 text-align-center">
          <p className="title mb-2 pt-2 fs-1">{name}'s GIGS</p>

          <div className="cards-container">{constructGigCards(band.gigs)}</div>
        </div>
      </div>
    );
  }
};

export default BandProfile;
