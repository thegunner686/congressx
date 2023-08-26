import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const DiscoverPage = () => {
  return (
    <>
      <MetaTags title="Discover" description="Discover page" />

      <h1>DiscoverPage</h1>
      <p>
        Find me in <code>./web/src/pages/DiscoverPage/DiscoverPage.tsx</code>
      </p>
      <p>
        My default route is named <code>discover</code>, link to me with `
        <Link to={routes.discover()}>Discover</Link>`
      </p>
    </>
  );
};

export default DiscoverPage;
