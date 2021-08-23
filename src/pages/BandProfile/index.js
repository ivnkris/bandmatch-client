import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import Title from "../../components/Title";
import { BAND, GIGS } from "../../graphql/queries";
import {
  constructGigCards,
  constructPerformerCards,
} from "../../utils/constructCards";
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

  const { data: gigsData, loading: gigsLoading, error: gigsError } = useQuery(
    GIGS,
    {
      variables: {
        gigsFilters: {
          band: id,
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

  if (bandData) {
    const band = bandData.band;
    console.log(band);
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
        <div className="see-through-background-90 text-align-center profile-title-div">
          <Title type="profile" text={name} />
          <p className="mb-3">{openTo()}</p>

          <p className="p-yellow mt-2 text-limit-one-line">
            LOOKING FOR:{" "}
            <span className="looking-for">{lookingFor.join(" | ")}</span>
          </p>
        </div>
        <ProfileInfo
          imageUrl={band.imageUrl}
          // name={name}
          instruments={instruments}
          genre={genres}
          description={band.description}
          lookingFor={lookingFor}
          soundCloudUrl={band.soundCloudUrl}
        />
        <SoundCloudWidget soundCloudUrl={band.soundCloudUrl} />

        <div className="see-through-background-90 text-align-center">
          <p className="title mb-2 pt-2 fs-1">{name}'s GIGS</p>

          {gigsData && (
            <div className="cards-container">
              {constructGigCards(gigsData.gigs)}
            </div>
          )}
        </div>

        <div className="see-through-background-90 text-align-center">
          <p className="title mb-2 pt-2 fs-1">{band.name}'s BANDS</p>

          <div className="cards-container">
            {bandData && (
              <div className="cards-container">
                {constructPerformerCards(band.musicians, "shortened")}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default BandProfile;
