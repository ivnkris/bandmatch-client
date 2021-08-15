import React from "react";
import { useQuery } from "@apollo/client";

import { GIGS } from "../../graphql/queries";
import { constructGigCards } from "../../utils/constructCards";

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
    console.log(data.gigs);
    const gigCards = constructGigCards(data.gigs);
    return <>{gigCards}</>;
  }
};

export default Gig;
