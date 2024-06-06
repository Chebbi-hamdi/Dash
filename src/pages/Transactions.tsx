import React from 'react'
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import TableTransaction from '../components/Tables/TableTransaction';

const Transactions = () => {
    return (
        <DefaultLayout>
          <Breadcrumb pageName="Transactions" />
    
          <div className="flex flex-col gap-10">
            <TableTransaction />
          </div>
        </DefaultLayout>
      );
}

export default Transactions