import { MetaTags, useMutation, useQuery } from "@redwoodjs/web";
import { useEffect } from "react";
import { useUserContext } from "src/contexts/UserContext";

// const QUERY = gql`
//   query PopulateRepresentatives {
//     representatives: populateRepresentatives {
//       id
//       partyName
//       invertedOrderName
//       currentChamber
//       startYear
//       state
//       imageUrl
//       district
//     }
//   }
// `

// export const CREATE_REPRESENTATIVE_MUTATION = gql`
//   mutation CreateRepresentativeMutation($input: CreateRepresentativeInput!) {
//     createRepresentative(input: $input) {
//       id
//     }
//   }
// `;

const FeedPage = () => {
  return (
    <>
      <MetaTags title="Feed" description="Feed page" />
    </>
  );
};

export default FeedPage;
