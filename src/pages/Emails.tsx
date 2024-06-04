import React from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import TableTwo from '../components/Tables/TableTwo';

const Emails = () => {
    return (
        <DefaultLayout>
          <Breadcrumb pageName="Emails" />
    
          <div className="flex flex-col gap-10">
            <TableTwo />
          </div>
        </DefaultLayout>
      );
}

export default Emails