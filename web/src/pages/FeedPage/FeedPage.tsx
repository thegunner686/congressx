import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useUserContext } from "src/contexts/UserContext";

const FeedPage = () => {
  const user = useUserContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <MetaTags title="Feed" description="Feed page" />
    </>
  );
};

export default FeedPage;
