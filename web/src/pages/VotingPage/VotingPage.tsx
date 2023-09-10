import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const VotingPage = () => {
  return (
    <>
      <MetaTags title="Voting" description="Voting page" />
      <main className="flex flex-col items-center justify-center w-full p-4 animate-fade-in transition-all"></main>
    </>
  );
};

export default VotingPage;
