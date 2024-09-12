import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dropdown from "components/Dropdown";
import { FaEllipsisH, FaEye, FaFilter, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import FilterDropdown from "components/FilterDropDown";
import SoftTypography from "components/SoftTypography";
import { Divider, Grid, Icon } from "@mui/material";
import DummyBg from "../../assets/images/Dummy_Bg.jpg";
import Modal from "components/Modal";
import { FaSitemap, FaCodeBranch } from 'react-icons/fa';
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AssetDetailActions } from "./reducer";

const localizer = momentLocalizer(moment);

const optionsFilter = [
  { value: "1", label: "Date" },
  { value: "2", label: "Type" },
  { value: "3", label: "Name" },
  { value: "4", label: "Parent" },
];

const Library = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { assets, loading, error } = useSelector(state => state.assetDetail);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredAssets = assets.filter(asset => {
    return (
      asset.serialNum.toLowerCase().includes(searchQuery) ||
      asset.assetName.toLowerCase().includes(searchQuery) ||
      (asset.childCreated === 1 && asset.parentAssetId === null && asset.assetName.toLowerCase().includes(searchQuery))
    );
  });

  const handleDelete = (assetId) => {
    setAssetToDelete(assetId); // Store the asset ID to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  useEffect(() => {
    const payload = {
      createdBy: localStorage.getItem('userId')
      // Add other fields to the payload if needed
    };
    dispatch(AssetDetailActions.assetDetailRequest(payload));
  }, [dispatch]);

  const confirmDelete = (deleteAll = false) => {
    const payload = {
      assetId: assetToDelete,
      deleteAll
    };
    dispatch(AssetDetailActions.deleteAssetRequest(payload));
    setAssetToDelete(null);
    setShowModal(false); // Close the modal after dispatching the action
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const getOptions = (assetId, childCreated) => [
    {
      value: "1",
      label: (
        <SoftBox component={Link} to={`/editlibrary/${assetId}`} className="flex items-center">
          <FaPen className="mr-2 text-sky-500" />
          Edit
        </SoftBox>
      ),
    },
    {
      value: "2",
      label: (
        <SoftBox
          onClick={(e) => {
            if (childCreated === 0) {
              e.preventDefault(); // Prevent navigation if childCreated is 0
              e.stopPropagation(); // Stop propagation to avoid triggering other handlers
            }
          }}
          component={Link}
          to={`/parentassete/${assetId}`}
          className={`flex items-center ${childCreated === 0 ? 'text-gray-500 cursor-not-allowed' : ''}`}
        >
          <FaEye className="mr-2 text-emerald-500" />
          View Child Assets
        </SoftBox>
      ),
      disabled: childCreated === 0,
    },

    {
      value: "3",
      label: (
        <span className="flex items-center" onClick={() => handleDelete(assetId)}>
          <FaTrashAlt className="mr-2 text-rose-500" />
          Delete
        </span>
      ),
    },

  ];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3} mt={3}>
        <SoftBox my={1} className="flex  items-center  md:justify-between">
          <div className="h-10 w-3/5 md:w-fit">
            <SoftInput
              className="w-full md:w-fit"
              placeholder="Type here..."
              value={searchQuery}
              onChange={handleSearchChange}
              icon={{ component: "search", direction: "left" }}
            />
          </div>
          <SoftBox className="w-2/5 md:w-fit flex items-center md:justify-end gap-1 md:gap-3 pl-2 md:pl-0">
            <FilterDropdown
              className="md:w-fit "
              options={optionsFilter}
              buttonComponent={
                <SoftButton
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  variant="gradient"
                  color="info"
                >
                  <FaFilter className="me-2" />
                  <span className="hidden md:block">Filter</span>
                </SoftButton>
              }
            />
            <SoftBox
              component={Link}
              to="/addlibrary"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="3rem"
              height="3rem"
              bgColor="white"
              shadow="sm"
              borderRadius="50%"
              color="dark"
              sx={{ cursor: "pointer" }}
            >
              <Icon fontSize="default" color="inherit">
                add
              </Icon>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <SoftBox my={1}>
          <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border">
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 divide-y divide-slate-200">
              {filteredAssets.length > 0 ? (
                filteredAssets.map(asset => (
                  <div
                    key={asset.assetId}
                    role="button"
                    className="flex flex-col md:flex-row items-center justify-between w-full p-3 border-gray-200 leading-tight"
                  >
                    <div className="flex items-center gap-2 w-full md:w-4/6 xxl:w-3/4">
                      <Link to={`/libraryDetails/${asset.assetId}`} className="font-medium text-sm dark:text-white">

                        {asset.childCreated === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold bg-pink-100 text-pink-800 rounded-full dark:bg-pink-900 dark:text-pink-300">
                            <FaSitemap />
                          </span>
                        ) : asset.parentAssetId !== null ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold bg-indigo-100 text-indigo-800 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                            <FaCodeBranch />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill="currentColor"
                                d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                              />
                              <path
                                fill="#fff"
                                d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                              />
                            </svg>
                          </span>
                        )}

                        {asset.childCreated === 1 ? (
                          <Link to={`/libraryDetails/${asset.assetId}`} className="font-medium text-sm dark:text-white">
                            <span className="text-gray-600 ps-2 truncate w-3/4 md:w-fit dark:text-gray-300">
                              {asset.assetName}
                            </span>
                          </Link>
                        ) : (
                          <span className="font-medium text-sm dark:text-white">
                            <span className="text-gray-600 ps-2 truncate w-3/4 md:w-fit dark:text-gray-300">
                              {asset.assetName}
                            </span>
                          </span>
                        )}

                      </Link> </div>

                    <div className="flex items-center justify-between gap-2 md:w-1/4 md:w-2/6 xxl:w-1/5 w-full mt-2 md:mt-0">
                      <span className="bg-gray-100 text-gray-500 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-300 ">
                        <svg
                          className="w-2.5 h-2.5 me-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                        </svg>
                        {moment(asset.installationDate).format('DD/MM/YY')}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {asset.assetTypeName}
                      </span>
                      <Dropdown
                        options={getOptions(asset.assetId, asset.childCreated)}
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
                ))
              ) : (
                <SoftTypography variant="h6" align="center" color="textSecondary">
                  No assets found.
                </SoftTypography>
              )}

            </nav>
          </div>
        </SoftBox>
      </SoftBox>

      <Modal
        showModal={showEditModal}
        setEditModal={setEditModal}
        size="max-w-lg"
        title="Edit Assets"
        onClose={closeEditModal}
      >
        <SoftBox>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Name
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="Enter Name" />
        </SoftBox>
        <SoftBox mt={3}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Type
            </SoftTypography>
          </SoftBox>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue=""
          >
            <option value="" disabled>Choose an Asset Type</option>
            <option value="factory">Factory</option>
            <option value="production-site">Production Site</option>
            <option value="components">Components</option>
            <option value="robotic-arm">Robotic Arm</option>
            <option value="motors">Motors</option>
            <option value="actuators">Actuators</option>
            <option value="vision-systems">Vision Systems</option>
            <option value="conveyors">Conveyors</option>
            <option value="sensors">Sensors</option>
            <option value="other">Other</option>
          </select>
        </SoftBox>
      </Modal>

      <Modal
        showFooter={false}
        showModal={showModal}
        setShowModal={setShowModal}
        size="max-w-lg"
        title="Confirm Deletion"
      >
        <SoftBox mb={1}>
          <SoftTypography component="label" variant="h6" fontWeight="bold">
            Are you sure you want to delete this asset?
          </SoftTypography>
          <SoftTypography variant="body2" color="textSecondary">
            You can choose to:
            <ul>
              <li>Delete the parent asset and preserve child assets.</li>
              <li>Delete all child assets in the hierarchy along with the parent asset.</li>
            </ul>
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" justifyContent="space-between" mt={2}>
          <SoftButton
            variant="gradient"
            color="info"
            onClick={() => confirmDelete(false)} // Option 1: Preserve child assets
            style={{ flex: 1, marginRight: '8px' }}
          >
            Delete Parent Only
          </SoftButton>
          <SoftButton
            variant="gradient"
            color="info"
            onClick={() => confirmDelete(true)} // Option 2: Delete all
            style={{ flex: 1, border: '2px solid red' }}
          >
            Delete All
          </SoftButton>
        </SoftBox>
      </Modal>

    </DashboardLayout>
  );
};

export default Library;
