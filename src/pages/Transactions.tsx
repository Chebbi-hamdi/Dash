import React from 'react'
import TableTwo from '../components/Tables/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Transactions = () => {
    return (
        <DefaultLayout>
          <Breadcrumb pageName="Transactions" />
    
          <div className="flex flex-col gap-10">
            <TableTwo />
          </div>
        </DefaultLayout>
      );
}

export default Transactions