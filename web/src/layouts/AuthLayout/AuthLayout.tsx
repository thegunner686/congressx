import { Link, routes } from "@redwoodjs/router";
import Title from "src/components/Title/Title";

type AuthLayoutProps = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="animate-fade-in h-screen w-screen flex flex-col">
      <nav className="w-screen h-16 bg-night shadow-sm shadow-night flex flex-row items-center p-4 justify-start">
        <Link to={routes.home()}>
          <Title size="small" />
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
