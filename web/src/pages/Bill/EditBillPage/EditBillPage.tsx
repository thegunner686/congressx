import EditBillCell from "src/components/Bill/EditBillCell";

type BillPageProps = {
  id: string;
};

const EditBillPage = ({ id }: BillPageProps) => {
  return <EditBillCell id={id} />;
};

export default EditBillPage;
