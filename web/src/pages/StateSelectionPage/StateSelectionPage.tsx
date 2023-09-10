import { MetaTags } from "@redwoodjs/web";
import StateCell from "src/components/State/StateCell";
import StatesCell from "src/components/State/StatesCell";
import { useUserContext } from "src/contexts/UserContext";

const StateSelectionPage = () => {
  const user = useUserContext();

  return (
    <>
      <MetaTags title="StateSelection" description="StateSelection page" />
      <main className="flex flex-col items-center justify-center w-full p-4">
        {user?.state ? <StateCell id={user.stateId} /> : <StatesCell />}
      </main>
    </>
  );
};

export default StateSelectionPage;
