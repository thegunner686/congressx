import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="home-background flex flex-grow h-screen w-screen items-center flex-col bg-gradient-to-br from-crayola-red to-majorelle-blue">
        <div className="flex-1 flex items-center justify-center flex-col">
          <div className="font-extrabold text-4xl uppercase text-white shadow-silver text-shadow-sm mt-16 lg:text-7xl flex items-center justify-center font-archivo text-center">
            <span className="material-icons font-extrabold lg:text-7xl text-5xl">
              account_balance
            </span>
            CongressX
          </div>
          <div className="text-lg lg:text-2xl text-center text-white font-archivo">
            The voice of the people.
          </div>
        </div>
        <div className=" flex-1 w-full flex items-center justify-center flex-col">
          <button className="bg-night p-4 rounded w-9/12 flex items-center justify-center shadow max-w-xl hover:bg-opacity-90 lg:w-96 shadow-night">
            <p className="text-white text-lg font-archivo">Get Started</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
