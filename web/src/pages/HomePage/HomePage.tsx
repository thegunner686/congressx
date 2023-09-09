import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import Title from "src/components/Title/Title";

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <main className="home-background h-screen w-screen animate-fade-in transition-all">
        <div className=" w-full h-full flex flex-grow items-center flex-row backdrop-blur-sm bg-opacity-40 bg-night">
          <div className="flex flex-grow flex-col items-start pl-8">
            <div className="flex-row font-extrabold uppercase text-white flex items-center justify-center font-archivo text-center lg:text-8xl text-5xl mb-4">
              CongressX
            </div>
            <Link
              to={routes.signup()}
              className=" cursor-pointer rounded w-72 h-14 bg-night flex items-center justify-center text-white font-archivo text-xl p-4 hover:bg-zinc-900 hover:scale-95 transition-all"
            >
              Get Started
            </Link>
          </div>
          <div className="flex lg:w-1/3 w-1/2 h-full bg-night flex-col items-center p-4 bg-opacity-90">
            <img
              src="/CongressX_Logo.png"
              className=" w-64 h-64 rounded shadow-lg bg-zinc-500 m-4"
            />
            <h3 className="font-archivo text-lg lg:text-3xl text-zinc-300">
              Restoring the Vision
            </h3>
            <p className="m-4 font-archivo text-zinc-500 text-left text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus
              magna fringilla urna porttitor rhoncus dolor. Amet mauris commodo
              quis imperdiet massa tincidunt nunc pulvinar. Metus dictum at
              tempor commodo ullamcorper. Lectus proin nibh nisl condimentum id
              venenatis. Id leo in vitae turpis. Augue mauris augue neque
              gravida in fermentum. Vehicula ipsum a arcu cursus vitae congue
              mauris rhoncus aenean. Odio ut sem nulla pharetra.
            </p>
            <Link
              to={routes.login()}
              className=" cursor-pointer rounded w-48 h-12 bg-blue-600 text-white p-1 font-archivo flex items-center justify-center hover:bg-blue-500 hover:scale-95 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
