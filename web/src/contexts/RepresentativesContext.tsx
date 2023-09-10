import { useQuery } from "@redwoodjs/web";
import React, { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { Representative } from "types/graphql";

const RepresentativesContext = React.createContext(undefined);

export const GET_REPRESENTATIVES = gql`
  query GetMyRepresentatives($districtNumber: Int!, $stateId: String!) {
    senators(stateId: $stateId) {
      ...RepresentativeProperties
    }
    houseRep(districtNumber: $districtNumber, stateId: $stateId) {
      ...RepresentativeProperties
    }
  }

  fragment RepresentativeProperties on Representative {
    id
  }
`;

const RepresentativesProvider = ({ children }) => {
  const user = useUserContext();
  const { data } = useQuery(GET_REPRESENTATIVES, {
    variables: {
      districtNumber: user?.district?.number ?? 1,
      stateId: user?.stateId ?? "VA",
    },
  });
  const [representatives, setRepresentatives] = useState<Representative[]>([]);

  useEffect(() => {
    if (data) {
      let reps = [];
      if (data?.senators) reps = [...data.senators];
      if (data?.houseRep) reps = [...reps, data.houseRep];
      setRepresentatives(reps);
    }
  }, [data]);

  return (
    <RepresentativesContext.Provider value={representatives}>
      {children}
    </RepresentativesContext.Provider>
  );
};

const useRepresentativesContext = () =>
  React.useContext<Representative[]>(RepresentativesContext);

export {
  RepresentativesProvider,
  RepresentativesContext,
  useRepresentativesContext,
};
