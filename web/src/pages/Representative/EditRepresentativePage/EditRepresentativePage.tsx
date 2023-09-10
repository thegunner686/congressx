import EditRepresentativeCell from "src/components/Representative/EditRepresentativeCell";

type RepresentativePageProps = {
  id: string;
};

const EditRepresentativePage = ({ id }: RepresentativePageProps) => {
  return <EditRepresentativeCell id={id} />;
};

export default EditRepresentativePage;
