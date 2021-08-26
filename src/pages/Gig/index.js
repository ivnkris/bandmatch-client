import React from "react";
import { useQuery } from "@apollo/client";

import { GIGS } from "../../graphql/queries";
import { constructGigCards } from "../../utils/constructCards";
import Header from "../../components/Header";
import FilterStrip from "../../components/FilterStrip";
import Button from "../../components/Button";
import Title from "../../components/Title";

const Gig = (props) => {
  const { data, loading, error } = useQuery(GIGS);

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    const gigs = data.gigs;
    return (
      <div className="results-page-container">
        <Header className="pt-3" title="Unleash Your Music to the world" />
        {/* <FilterStrip title="FIND YOUR GIG" /> */}
        <Title text="FIND YOUR GIG" type="section" />
        <div className="see-through-background-90 text-align-center">
          <div className="cards-container">{constructGigCards(gigs)}</div>
          {/* <Button label="LOAD MORE" size="medium" mode="primary" /> */}
        </div>
      </div>
    );
  }
};

export default Gig;
