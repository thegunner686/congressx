import { useUserContext } from "src/contexts/UserContext";
import { Link, routes } from "@redwoodjs/router";
import MiniStateCell from "src/components/State/MiniStateCell";
import { useAuth } from "src/auth";
import Title from "src/components/Title/Title";
import { useEffect, useRef, useState } from "react";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const DEFAULT_BG_URL = "/CongressX_Logo_large.png";

const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useUserContext();
  const { logOut } = useAuth();
  const ref = useRef(null);

  useEffect(() => {
    if (user?.stateId && user?.state) {
      ref.current.style.background = `url('${user.state.imageUrl}')`;
    } else {
      ref.current.style.background = `url('${DEFAULT_BG_URL}')`;
    }
    ref.current.style.backgroundRepeat = "no-repeat";
    ref.current.style.backgroundSize = "cover";
    ref.current.style.backgroundPosition = "center";
  }, [user?.stateId, user?.state]);

  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen">
      <nav className="w-full h-24 flex items-center justify-between">
        <Link
          className="flex-shrink flex items-center justify-center h-full p-2"
          to={routes.home()}
        >
          <Title size="sm" />
        </Link>
        <div className="flex flex-grow items-center justify-between bg-night p-2">
          <div className="flex-grow flex flex-row items-center justify-start">
            <Link
              to={routes.stateSelection()}
              className="w-auto px-4 h-10 flex items-center justify-center text-white font-archivo text-sm cursor-pointer hover:bg-zinc-900 rounded transition-all mr-4"
            >
              Vote
            </Link>
            <Link
              to={routes.stateSelection()}
              className="w-auto px-4 h-10 flex items-center justify-center text-white font-archivo text-sm cursor-pointer hover:bg-zinc-900 rounded transition-all mr-4"
            >
              Petitions
            </Link>
            <Link
              to={routes.stateSelection()}
              className="w-auto px-4 h-10 flex items-center justify-center text-white font-archivo text-sm cursor-pointer hover:bg-zinc-900 rounded transition-all mr-4"
            >
              Your Representatives
            </Link>
          </div>
          <div className="flex-shrink flex items-center justify-center">
            <Link
              to={routes.stateSelection()}
              className="w-auto px-4 h-10 flex items-center justify-center text-zinc-500 font-archivo text-sm cursor-pointer hover:bg-zinc-900 rounded transition-all mr-4"
            >
              Change State
            </Link>
            <Link
              to={routes.stateSelection()}
              className="w-auto px-4 h-10 flex items-center justify-center text-zinc-500 font-archivo text-sm cursor-pointer hover:bg-zinc-900 rounded transition-all mr-4"
            >
              Contact
            </Link>
            <div
              onClick={logOut}
              className="w-auto px-4 h-10 flex items-center justify-center text-zinc-500 font-archivo text-sm cursor-pointer hover:bg-zinc-900 rounded transition-all mr-4"
            >
              Log Out
            </div>
            <div className="text-white rounded-full w-8 h-8 bg-majorelle-blue bg-opacity-50 font-archivo text-xs flex items-center justify-center">
              {getInitials(user?.name ?? "")}
            </div>
          </div>
        </div>
      </nav>
      <main
        className={`bg-cover bg-no-repeat w-screen max-h-screen animate-fade-in transition-all flex-grow overflow-y-scroll`}
        ref={ref}
      >
        <div className="w-full flex items-center h-full flex-col backdrop-blur-sm bg-opacity-40 bg-night overflow-y-scroll">
          {children}
        </div>
      </main>
    </div>
  );
};

function getInitials(name) {
  const parts = name.toUpperCase().split(" ");
  if (parts.length == 0) {
    return "";
  }
  if (parts.length < 2) {
    return `${parts[0].charAt(0)}`;
  }
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`;
}

export default AppLayout;
