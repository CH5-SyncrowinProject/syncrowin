import { Divider } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React from "react";
import { FaArrowCircleLeft, FaCheckCircle, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDetails = () => {
  return (
    <>
      <DashboardLayout>
        <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
          <SoftBox
            className="flex items-center gap-2  mb-3 cursor-pointer"
            component={Link}
            to="/usermanagement"
          >
            <FaArrowCircleLeft className="cursor-pointer" />
            <SoftTypography variant="h6" fontWeight="medium">
              User Details
            </SoftTypography>
          </SoftBox>
          <SoftBox  component={Link} to="/edituserdetails">
          <FaPen className="cursor-pointer text-base" /></SoftBox>
          </div>


          <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="first_name"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Neil Sims"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                id="first_name"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Neil Sims@gmail.com"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                id="company"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="5874961230"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Job Title
              </label>
              <input
                type="text"
                id="phone"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Developer"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company Name
              </label>
              <input
                type="text"
                id="website"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mapa Animations"
                required
                disabled
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                id="website"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The Brain and Mind Centre, Level 4/94 Mallett St, Camperdown NSW 2050, Australia"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Company Address
              </label>
              <input
                type="text"
                id="website"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Suite 602/53 Walker St, North Sydney NSW 2060, Australia"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Position
              </label>
              <input
                type="text"
                id="website"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Administrator"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Industry
              </label>
              <input
                type="text"
                id="website"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ACS Consultancy Services"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Preferred Language
              </label>
              <input
                type="text"
                id="website"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="English"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="text"
                id="website"
                className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="***1452"
                required
                disabled
              />
            </div>
          </div>
          <Divider />
          <SoftTypography variant="h6" fontWeight="medium" my={2}>
            Permissions
          </SoftTypography>

          <ul className="w-full text-gray-500 list-inside dark:text-gray-400 text-base">
            <li className="flex items-center gap-3 py-2 border-b">
              <FaCheckCircle className="text-green-500" />
              Create user accounts
            </li>
            <li className="flex items-center gap-3 py-2 border-b">
              <FaCheckCircle className="text-green-500" />
              Edit user accounts
            </li>
            <li className="flex items-center gap-3 py-2 border-b">
              <FaCheckCircle className="text-green-500" />
              Delete user accounts
            </li>
            <li className="flex items-center gap-3 py-2 border-b">
              <FaCheckCircle className="text-green-500" />
              Deactivate user accounts
            </li>
            <li className="flex items-center gap-3 py-2 border-b">
              <FaCheckCircle className="text-green-500" />
              Reset user passwords
            </li>
            <li className="flex items-center gap-3 py-2 border-b">
              <FaCheckCircle className="text-green-500" />
              View user account details
            </li>
          </ul>
        </div>
      </DashboardLayout>
    </>
  );
};
export default UserDetails;
