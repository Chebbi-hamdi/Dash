import React from 'react'
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableTasks from '../components/Tables/TableTasks';

const Tasks = () => {
    return (
        <DefaultLayout>
          <Breadcrumb pageName="Tasks" />
    
          <div className="flex flex-col gap-10">
            <TableTasks />
          </div>
        </DefaultLayout>
      );
}

export default Tasks