import EditStateCell from "src/components/State/EditStateCell";

type StatePageProps = {
  id: string;
};

const EditStatePage = ({ id }: StatePageProps) => {
  return <EditStateCell id={id} />;
};

export default EditStatePage;
