type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-red-100">
      <nav className="w-full h-32 bg-red-200"></nav>
      <div className="flex-grow flex flex-row items-center justify-center w-full">
        <section className="flex-1 bg-blue-100 h-full"></section>
        <div className="flex-[2] bg-orange-200 h-full">{children}</div>
        <section className="flex-1 bg-blue-100 h-full"></section>
      </div>
    </div>
  );
};

export default AppLayout;
