import { useQuery } from "@redwoodjs/web";
import React, { useEffect, useState } from "react";
import { useAuth } from "src/auth";
import { User } from "types/graphql";

const UserContext = React.createContext(undefined);

export const GET_USER = gql`
  query FindUserById($id: String!) {
    user: user(id: $id) {
      id
      email
      name
      stateId
      state {
        name
        imageUrl
      }
      district {
        number
      }
    }
  }
`;

const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { data } = useQuery(GET_USER, {
    variables: {
      id: currentUser?.sub as string,
    },
  });
  const [user, setUser] = useState<User>(data?.user);

  useEffect(() => {
    console.log({ user });
    setUser(data?.user);
  }, [data]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUserContext = () => React.useContext<User>(UserContext);

export { UserProvider, UserContext, useUserContext };
