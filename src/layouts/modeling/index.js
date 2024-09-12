import React from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import HeadlessAPI from 'examples/CustomTree';


 // Adjust the import path according to your file structure

const Modeling = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="basis-full md:basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-4">
      <HeadlessAPI />
        </div>
        <div className="basis-full md:basis-3/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-4">
          {/* Additional content or components */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Modeling;
