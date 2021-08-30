import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { useUserContext } from "../../contexts/UserProvider";
import ProfileInfo from "../../components/ProfileInfo";
import SoundCloudWidget from "../../components/SoundCloudWidget";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { BAND, GIGS } from "../../graphql/queries";
import {
  constructGigCards,
  constructPerformerCards,
} from "../../utils/constructCards";
import "./BandProfile.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const BandProfile = (props) => {
  // get user your logged in as from userContext
  // check if user is member of band bandData.bands.musicians -> is an array loop through and check

  const { id } = useParams();

  const { data: bandData, loading, error } = useQuery(BAND, {
    variables: {
      bandId: id,
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { state } = useUserContext();

  let myBandProfile;

  if (bandData) {
    myBandProfile = bandData.band.musicians.filter((musician) => {
      return musician.id === state.user.id;
    });
  }

  const { data: gigsData, loading: gigsLoading } = useQuery(GIGS, {
    variables: {
      gigsFilters: {
        band: id,
      },
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

    const redirectToPage = (event) => {
      const page = event.currentTarget.id;

      window.location.replace(`/${page}`);
    };

    return (
      <div className="profile-container">
        <div className="p-2"></div>
        <div className="see-through-background-90 text-align-center profile-title-div">
          <Title type="profile" text={name} />
          <p className="mb-3">{openTo()}</p>

          {lookingFor.length !== 0 && (
            <p className="p-yellow mt-2 text-limit-one-line">
              LOOKING FOR:{" "}
              <span className="looking-for">{lookingFor.join(" | ")}</span>
            </p>
          )}
        </div>
        <ProfileInfo
          imageUrl={band.imageUrl}
          name={name}
          instruments={instruments}
          genre={genres}
          description={band.description}
          experienceLevel={band.experienceLevel}
          lookingFor={lookingFor}
          soundCloudUrl={band.soundCloudUrl}
        />

        {bandData && band.soundCloudUrl && (
          <SoundCloudWidget soundCloudUrl={band.soundCloudUrl} />
        )}

        <div className="see-through-background-90 text-align-center">
          <p className="title mb-2 pt-2 fs-1">{name}'s GIGS</p>

          {gigsLoading && <LoadingSpinner />}
          {gigsData && gigsData.gigs.length ? (
            <div className="cards-container">
              {constructGigCards(gigsData.gigs)}
            </div>
          ) : myBandProfile.length ? (
            <div className="no-gigs-bands-container">
              <div>
                <p className="mb-2 fs-3">Your band has no gigs</p>
              </div>
              <div>
                <Button
                  label="FIND A GIG"
                  mode="primary"
                  size="medium"
                  onClick={redirectToPage}
                  buttonId="gig"
                />
              </div>
            </div>
          ) : (
            <div className="no-gigs-bands-container">
              <p className="mb-3 fs-3">
                {`${bandData.band.name}`} have no gigs
              </p>
            </div>
          )}
        </div>

        <div className="see-through-background-90 text-align-center">
          <p className="title mb-2 pt-2 fs-1">{band.name}'s BAND MEMBERS</p>

          <div className="cards-container">
            {bandData && (
              <div className="cards-container">
                {constructPerformerCards(band.musicians, "shortest")}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default BandProfile;
