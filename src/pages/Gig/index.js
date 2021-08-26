import React from "react";
import { useQuery } from "@apollo/client";

import { GIGS } from "../../graphql/queries";
import { constructGigCards } from "../../utils/constructCards";
import Header from "../../components/Header";
import FilterStrip from "../../components/FilterStrip";
import Button from "../../components/Button";

const Gig = (props) => {
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
        console.log("prev", prev.gigs);
        console.log("fetchMoreResult", fetchMoreResult);

        const result = {
          gigs: [...prev.gigs, ...fetchMoreResult.gigs],
        };

        console.log("result", result);

        return result;
      },
    });
  };

  if (data) {
    const gigs = data.gigs;
    return (
      <div className="results-page-container">
        <Header className="pt-3" title="Unleash Your Music to the world" />
        <FilterStrip title="FIND YOUR GIG" />
        <div className="see-through-background-90 text-align-center">
          <div className="cards-container">{constructGigCards(gigs)}</div>
          <Button
            label="LOAD MORE"
            size="medium"
            mode="primary"
            onClick={onLoadMore}
          />
        </div>
      </div>
    );
  }
};

export default Gig;
