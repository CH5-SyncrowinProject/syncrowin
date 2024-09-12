import React from "react";
import PropTypes from "prop-types";
import { FaEllipsisH, FaPlus, FaRegCopy, FaTrashAlt } from "react-icons/fa";
import Dropdown from "components/Dropdown";


const options = [

   {
    value: "1",
    label: (
      <span className="flex items-center">
        <FaTrashAlt className="mr-2 text-rose-500" />
        Remove
      </span>
    ),
  },
];

const AccessListItem = ({ name, email, agoText }) => {
  return (
    <>
    
      <div className="flex flex-col md:flex-row items-center justify-between w-full p-3 border-gray-200 leading-tight">
        <div className="flex items-center gap-2 w-full md:w-4/6 xxl:w-3/4">
          <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
            A
          </span>
          <span className="font-medium text-sm">{name}</span>
          <span className="text-gray-600 ps-2 truncate w-3/4 md:w-fit">{email}</span>
        </div>
        <div className="flex items-center justify-between gap-2 md:w-1/4 xxl:w-1/5 w-full mt-2 md:mt-0">
          <span className="bg-gray-100 text-gray-500 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-300">
            <svg
              className="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
            </svg>
            {agoText}
          </span>
          <Dropdown
            options={options}
            buttonComponent={
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-blue-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <FaEllipsisH className="w-5 h-5 text-gray-600" />
              </button>
            }
          />
        </div>
      </div>
    </>
  );
};

AccessListItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  agoText: PropTypes.string.isRequired,
};

const AccessList = () => {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white w-full rounded-xl bg-clip-border">
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 divide-y divide-slate-200">
        <AccessListItem name="user1" email="user1@example.com" agoText="3 days ago" />
        <AccessListItem name="user2" email="user2@example.com" agoText="10 days ago" />
        <AccessListItem name="user3" email="user3@example.com" agoText="24 days ago" />
        <AccessListItem name="user4" email="user4@example.com" agoText="30 days ago" />
        <AccessListItem name="user5" email="user5@example.com" agoText="35 days ago" />
      </nav>
    </div>
  );
};

export default AccessList;
