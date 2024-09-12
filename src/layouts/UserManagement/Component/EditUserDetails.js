import { Divider } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Checkbox, Label } from "flowbite-react";
import React from "react";
import { FaArrowCircleLeft, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const EditUserDetails = () => {
  return (
    <>
      <DashboardLayout>
        <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-lg">
          <SoftBox
            className="flex items-center gap-2  mb-3 cursor-pointer"
            component={Link}
            to="/usermanagement"
          >
            <FaArrowCircleLeft className="cursor-pointer" />
            <SoftTypography variant="h6" fontWeight="medium">
              Edit Details
            </SoftTypography>
          </SoftBox>

          <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="first_name"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Neil Sims"
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                id="first_name"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                id="company"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Title
              </label>
              <input
                type="text"
                id="phone"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company Name
              </label>
              <input
                type="text"
                id="website"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                id="website"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company Address
              </label>
              <input
                type="text"
                id="website"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Position
              </label>
              <input
                type="text"
                id="website"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Industry
              </label>
              <input
                type="text"
                id="website"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Preferred Language
              </label>
              <input
                type="text"
                id="website"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="text"
                id="website"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                
              />
            </div>
          </div>
          <Divider />
          <SoftTypography variant="h6" fontWeight="medium" my={2}>
            Permissions
          </SoftTypography>

          <ul className="w-full text-gray-500 list-inside dark:text-gray-400 text-base">
            <li className="flex items-center gap-3 py-2 border-b">
              <Checkbox />
              <Label> Create user accounts</Label>
            </li>
            <li className="flex items-center gap-3 py-2 border-b border-gray-200">
              <Checkbox />
              <Label> Edit user accounts</Label>
            </li>
            <li className="flex items-center gap-3 py-2 border-b border-gray-200">
              <Checkbox />
              <Label> Delete user accounts</Label>
            </li>
            <li className="flex items-center gap-3 py-2 border-b border-gray-200">
              <Checkbox />
              <Label> Deactivate user accounts</Label>
            </li>
            <li className="flex items-center gap-3 py-2 border-b border-gray-200">
              <Checkbox />
              <Label> Reset user passwords</Label>
            </li>
            <li className="flex items-center gap-3 py-2 border-b border-gray-200">
              <Checkbox />
              <Label> View user account details</Label>
            </li>
          </ul>
        </div>
      </DashboardLayout>
    </>
  );
};
export default EditUserDetails;
