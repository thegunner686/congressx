import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const card_info = [
  {
    title: "Oversee Your Government",
    description: `Stay informed about what's happening on Capitol Hill. CongressX provides you with up-to date information about what bills are being voted on and let's express your voice on the matter through community voting and polls. `,
    icon: "account_balance",
  },
];

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="home-background flex flex-grow h-screen w-screen items-center flex-col">
        <div className="flex-1">
          <div className="font-extrabold text-5xl uppercase text-dark shadow-dark text-shadow mt-16">
            CongressX
          </div>
          <div className=" text-2xl text-center text-dark text-shadow-sm shadow-dark">
            The voice of the people.
          </div>
        </div>
        <div className="flex-1 flex">
          {card_info.map((info) => (
            <div
              key={info.title}
              className="bg-va-green bg-opacity-80 m-4 rounded shadow-md flex flex-col items-center p-4"
            >
              <span className="material-icons text-6xl font-extrabold text-va-dark-green">
                {info.icon}
              </span>
              <h1 className="text-2xl font-bold text-center text-va-dark-green">
                {info.title}
              </h1>
              <p className="text-lg text-center mt-4 mb-4 text-va-dark-green">
                {info.description}
              </p>
            </div>
          ))}
        </div>
        <div className=" flex-1 w-full flex items-center justify-center flex-col">
          <button className="bg-virginia-orange p-4 rounded-lg w-9/12 flex items-center justify-center shadow-lg shadow-virginia-brown max-w-xl hover:bg-opacity-90">
            <p className="text-white font-bold text-xl">Get Started</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
