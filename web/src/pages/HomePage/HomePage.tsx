import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import Title from "src/components/Title/Title";

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <main className="home-background flex flex-grow h-screen w-screen items-center flex-col bg-night animate-fade-in">
        <div className="flex-1 flex items-center justify-center flex-col">
          <Title size="lg" />
          <div className="text-lg md:text-2xl text-center text-white font-archivo shadow-silver text-shadow-sm">
            The voice of the people.
          </div>
        </div>
        <div className=" flex-1 w-full flex items-center justify-center flex-col">
          <Link to={routes.login()}>
            <button className="bg-gradient-to-br from-crayola-red to-majorelle-blue p-4 rounded w-9/12 flex items-center justify-center shadow max-w-xl hover:bg-opacity-90 md:w-96 shadow-night">
              <p className="text-white text-lg md:text-xl font-archivo">
                Get Started
              </p>
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
