import BillCell from "src/components/Bill/BillCell";

type BillPageProps = {
  id: string;
};

const BillPage = ({ id }: BillPageProps) => {
  return <BillCell id={id} />;
};

export default BillPage;
