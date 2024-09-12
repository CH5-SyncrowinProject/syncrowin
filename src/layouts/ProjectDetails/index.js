import React, { useState } from "react";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import {
  FaAlignLeft,
  FaArrowCircleLeft,
  FaPlus,
  FaRegCopy,
  FaShareAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { Divider } from "@mui/material";
import AccessList from "examples/AccessList";
import Modal from "components/Modal";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import CommonSelect from "components/CommonSelect";
const ProjectDetail = ({ onClick }) => {
  const [isAccessList, setAccessList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const options = [
    { value: "option1", label: "Viewer" },
    { value: "option2", label: "Editor" },
  ];
  const toggleAccessList = () => {
    setAccessList(!isAccessList);
  };
  return (
    <div>
      <SoftBox mb={0.5} className="flex justify-between items-center">
        <SoftTypography variant="h6" fontWeight="medium" className="flex gap-2 items-center">
          <FaArrowCircleLeft className="cursor-pointer" onClick={onClick} />
          Project Details
        </SoftTypography>
        <div className="flex gap-3 items-center text-gray-500 text-base dark:text-white">
          <FaShareAlt className="cursor-pointer hover:text-gray-600 dark:text-white" />
          <FaRegCopy className="cursor-pointer hover:text-gray-600 dark:text-white" />
          <FaPlus
            onClick={() => setShowModal(true)}
            className="cursor-pointer hover:text-gray-600 dark:text-white"
          />
          <FaAlignLeft
            className="cursor-pointer hover:text-gray-600 dark:text-white "
            onClick={toggleAccessList}
          />
          <FaTrashAlt className="text-red-500 cursor-pointer" />
        </div>
      </SoftBox>
      <SoftBox>
        <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Project Name
            </label>
            <input
              type="text"
              id=" ProjectName"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Project_1"
              required
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date
            </label>
            <input
              type="text"
              id="first_name"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="16 May 2024"
              required
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Project Type
            </label>
            <input
              type="text"
              id="company"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type Of the Project"
              required
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Project Link
            </label>
            <input
              type="text"
              id="phone"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Link......"
              required
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Company Name
            </label>
            <input
              type="number"
              id="website"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Toy Animation India"
              required
              disabled
            />
          </div>

          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Access
            </label>
            <input
              type="text"
              id="website"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Viewer"
              required
              disabled
            />
          </div>
        </div>
      </SoftBox>
      {isAccessList && (
        <SoftBox className="">
          <Divider />
          <SoftTypography variant="h6" fontWeight="medium" mb={2}>
            Access List
          </SoftTypography>
          <AccessList />
        </SoftBox>
      )}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        size="max-w-lg"
        title=" Manage Access"
        showFooter={false}
      >
        <SoftTypography variant="h5" fontWeight="medium" mb={2}>
          Assign access rights to ensure appropriate permissions
        </SoftTypography>
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Name Or Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="" />
        </SoftBox>
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Access Type
            </SoftTypography>
          </SoftBox>
          <CommonSelect
            options={options}
            value={selectedValue}
            onChange={handleSelectChange}
            placeholder="Select an option"
          />
        </SoftBox>
        <Divider />
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5} className="flex items-center justify-end gap-3">
            <SoftButton variant="gradient" color="info" className="w-fit">
              Add
            </SoftButton>
            <SoftButton variant="outlined" color="info" className="w-fit">
              Cancel
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Modal>
    </div>
  );
};

// Typechecking props for the ProjectDetail component
ProjectDetail.propTypes = {
  onClick: PropTypes.func.isRequired, // onClick should be a required function prop
};

export default ProjectDetail;
