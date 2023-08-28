import { MetaTags } from "@redwoodjs/web";
import StatesCell from "src/components/State/StatesCell";

const StateSelectionPage = () => {
  return (
    <>
      <MetaTags title="StateSelection" description="StateSelection page" />
      <main>
        <StatesCell />
      </main>
    </>
  );
};

export default StateSelectionPage;
