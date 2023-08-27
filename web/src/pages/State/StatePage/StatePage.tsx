import StateCell from "src/components/State/StateCell";

type StatePageProps = {
  id: string;
};

const StatePage = ({ id }: StatePageProps) => {
  return <StateCell id={id} />;
};

export default StatePage;
