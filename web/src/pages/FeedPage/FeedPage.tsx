import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useAuth } from "src/auth";
import { useUserContext } from "src/contexts/UserContext";

const FeedPage = () => {
  const { logOut } = useAuth();
  const user = useUserContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onLogoutClick = async () => {
    await logOut();
  };

  return (
    <>
      <MetaTags title="Feed" description="Feed page" />

      <h1 className="font-archivo text-2xl">
        Hey, <span className=" text-verdigris">{user?.name}</span>!
      </h1>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};

export default FeedPage;
