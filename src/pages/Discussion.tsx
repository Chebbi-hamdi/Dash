import React from 'react'
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableDiscussion from '../components/Tables/TableDiscussion';

const Discussion = () => {
    return (
        <DefaultLayout>
          <Breadcrumb pageName="Plans" />
    
          <div className="flex flex-col gap-10">
            <TableDiscussion />
          </div>
        </DefaultLayout>
      );
}

export default Discussion