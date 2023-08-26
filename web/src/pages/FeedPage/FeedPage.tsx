import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useAuth } from "src/auth";

const FeedPage = () => {
  const { logOut } = useAuth();

  const onLogoutClick = async () => {
    await logOut();
  };

  return (
    <>
      <MetaTags title="Feed" description="Feed page" />

      <h1>FeedPage</h1>
      <p>
        Find me in <code>./web/src/pages/FeedPage/FeedPage.tsx</code>
      </p>
      <p>
        My default route is named <code>feed</code>, link to me with `
        <Link to={routes.feed()}>Feed</Link>`
      </p>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};

export default FeedPage;