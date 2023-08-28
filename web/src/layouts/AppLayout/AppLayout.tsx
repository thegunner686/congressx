import { useUserContext } from "src/contexts/UserContext";
import { Link, routes } from "@redwoodjs/router";
import MiniStateCell from "src/components/State/MiniStateCell";
import { useAuth } from "src/auth";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useUserContext();
  const { logOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen">
      <nav className="w-full h-32 flex items-center justify-center">
        <div className="w-9/12 h-16 rounded bg-white shadow-gray-200 shadow fixed z-50 flex flex-row items-center p-4">
          {user?.state ? (
            <MiniStateCell id={user.state} />
          ) : (
            <Link
              className="border border-crayola-red rounded shadow shadow-gray-200 p-1 pl-2 pr-2 flex flex-row items-center justify-center hover:bg-crayola-red hover:text-white text-crayola-red w-36 transition-all"
              to={routes.stateSelection()}
            >
              <span className={`material-icons font-extrabold`}>map</span>
              <p className="font-archivo text-sm font-light ml-1">
                Select State
              </p>
            </Link>
          )}
        </div>
      </nav>
      <div className="flex-grow flex flex-row items-start justify-center w-full min-h-full">
        <section className="flex-1 bg-blue-100 h-full"></section>
        <div className="flex-[2]">{children}</div>
        <section className="flex-1 bg-blue-100 h-full"></section>
      </div>
    </div>
  );
};

export default AppLayout;
