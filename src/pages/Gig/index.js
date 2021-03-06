import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GIGS } from "../../graphql/queries";
import { constructGigCards } from "../../utils/constructCards";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { useUserContext } from "../../contexts/UserProvider";

const Gig = (props) => {
  const { state } = useUserContext();
  const musicianId = state.user.id;
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const { data, loading, error, fetchMore } = useQuery(GIGS, {
    variables: {
      gigsOffset: 0,
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const onLoadMore = async () => {
    await fetchMore({
      variables: {
        gigsOffset: data.gigs.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (fetchMoreResult.gigs.length === 0) {
          setHasMoreItems(false);
        }

        const result = {
          gigs: [...prev.gigs, ...fetchMoreResult.gigs],
        };

        return result;
      },
    });
  };

  if (data) {
    const gigs = data.gigs;
    return (
      <div className="results-page-container">
        <Header className="pt-3" title="Unleash Your Music to the World" />
        <Title text="FIND YOUR GIG" type="section" />
        <div className="see-through-background-90 text-align-center">
          { state.user.type === "venue" ? <div className="cards-container">
            {constructGigCards(gigs, "x", "venue")}
          </div> : <div className="cards-container">
            {constructGigCards(gigs, null, musicianId)}
          </div>}
          {hasMoreItems && (
            <Button
              label="LOAD MORE"
              size="medium"
              mode="primary"
              onClick={onLoadMore}
            />
          )}
        </div>
      </div>
    );
  }
};

export default Gig;
