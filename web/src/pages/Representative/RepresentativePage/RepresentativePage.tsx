import RepresentativeCell from "src/components/Representative/RepresentativeCell";

type RepresentativePageProps = {
  id: string;
};

const RepresentativePage = ({ id }: RepresentativePageProps) => {
  return <RepresentativeCell id={id} />;
};

export default RepresentativePage;
