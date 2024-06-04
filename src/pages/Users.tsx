import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import TableFour from '../components/Tables/TableFour';
import TableContent from '../components/Tables/TableContent';



const User = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      

      <div className="flex flex-col gap-10">
        <TableContent />
      </div>
    </DefaultLayout>
  );
};

export default User;
