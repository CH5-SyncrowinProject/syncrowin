import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dropdown from "components/Dropdown";
import {
  FaArrowDown,
  FaArrowUp,
  FaEllipsisH,
  FaEye,
  FaFilter,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";
import React, { useState } from "react";
import FilterDropdown from "components/FilterDropDown";
import Modal from "components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import SoftTypography from "components/SoftTypography";
import { Switch } from "@material-tailwind/react";
import { Icon } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const addDashboardFormikSchema = Yup.object({
  serverName: Yup.string().required("Server Name is required"),
  serverUrl: Yup.string().required("Server Url is required"),
});

const optionsFilter = [
  { value: "1", label: "Date" },
  { value: "2", label: "Type" },
  { value: "3", label: "Size" },
  { value: "3", label: "Name" },
];

const Dashboardhome = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setAddModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Handle toggle change
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };
  const options = [
    {
      value: "1",
      label: (
        <span onClick={() => setShowModal(true)} className="flex items-center">
          <FaPen className="mr-2 text-sky-500" />
          Edit
        </span>
      ),
    },

    {
      value: "2",
      label: (
        <span className="flex items-center">
          <FaEye className="mr-2 text-emerald-500" />
          View
        </span>
      ),
    },
    {
      value: "4",
      label: (
        <span className="flex items-center">
          <FaTrashAlt className="mr-2 text-rose-500" />
          Delete
        </span>
      ),
    },
  ];

  const handleCloseModal = () => {
    addDashboardFormik.resetForm();  // Resets the form values
    setAddModal(false);  // Close the modal explicitly
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  //add dashboard
  const addDashboardFormik = useFormik({
    initialValues: {
      clientId: localStorage.getItem("clientId"),
      serverName: '',
      serverUrl: '',
    },
    validationSchema: addDashboardFormikSchema,
    onSubmit: async (initialValues) => {
      try {
        dispatch(AssetDetailActions.editEventRequest(initialValues));  // Send form data in the request
        setAddModal(false);
        addDashboardFormik.resetForm();
      } catch (error) {
        console.error('Error adding server:', error);
      }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3} mt={3}>
        <SoftBox mb={2} className="flex flex-col md:flex-row md:justify-between">
          <div className="h-10 w-full md:w-fit">
            <SoftInput
              className="w-full md:w-fit"
              placeholder="Type here..."
              icon={{ component: "search", direction: "left" }}
            />
          </div>
          <SoftBox className="w-full  md:w-fit flex justify-center md:justify-end items-center gap-3 mt-2 md:mt-0">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked}
                onChange={handleToggleChange}
              />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Grid View
              </span>
            </label>
            <FilterDropdown
              className="w-full md:w-fit"
              options={optionsFilter}
              buttonComponent={
                <SoftButton
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  variant="gradient"
                  color="info"
                >
                  <FaFilter className="me-2" /> Filter
                </SoftButton>
              }
            />
            <SoftBox
              onClick={() => setAddModal(true)}
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
        {isChecked ? (
          <SoftBox>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <SoftBox
                className="w-full p-6 bg-white border border-gray-200 rounded-lg  shadow-lg"
                mb={2}
              >
                <h1 className="text-2xl font-semibold text-start px-2 py-3 text-sky-950">
                  Clayton Production Site
                </h1>
                <div className="overflow-auto w-full">
                  <table className="table-DesignOne w-full">
                    <tbody>
                      <tr>
                        <td>Oven A Temperature</td>
                        <td>302°C</td>
                        <td>15%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Compressor Pressure</td>
                        <td>10 bar</td>
                        <td>9%</td>
                        <td>
                          <span className="text-rose-500">
                            <FaArrowDown />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Water Tank A Level</td>
                        <td>2982L</td>
                        <td>12%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Compressor Pressure</td>
                        <td>10 bar</td>
                        <td>9%</td>
                        <td>
                          <span className="text-rose-500">
                            <FaArrowDown />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Water Tank A Level</td>
                        <td>2982L</td>
                        <td>12%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SoftBox>
              <SoftBox
                className="w-full p-6 bg-white border border-gray-200 rounded-lg  shadow-lg"
                mb={2}
              >
                <h1 className="text-2xl font-semibold text-start px-2 py-3 text-sky-950">
                  Geelong production Site
                </h1>
                <div className="overflow-auto w-full">
                  <table className="table-DesignOne w-full">
                    <tbody>
                      <tr>
                        <td>Oven A Temperature</td>
                        <td>302°C</td>
                        <td>15%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Compressor Pressure</td>
                        <td>10 bar</td>
                        <td>9%</td>
                        <td>
                          <span className="text-rose-500">
                            <FaArrowDown />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Water Tank A Level</td>
                        <td>2982L</td>
                        <td>12%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Compressor Pressure</td>
                        <td>10 bar</td>
                        <td>9%</td>
                        <td>
                          <span className="text-rose-500">
                            <FaArrowDown />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Water Tank A Level</td>
                        <td>2982L</td>
                        <td>12%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SoftBox>
              <SoftBox
                className="w-full p-6 bg-white border border-gray-200 rounded-lg  shadow-lg"
                mb={2}
              >
                <h1 className="text-2xl font-semibold text-start px-2 py-3 text-sky-950">
                  Another Site
                </h1>
                <div className="overflow-auto w-full">
                  <table className="table-DesignOne w-full">
                    <tbody>
                      <tr>
                        <td>Oven A Temperature</td>
                        <td>302°C</td>
                        <td>15%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Compressor Pressure</td>
                        <td>10 bar</td>
                        <td>9%</td>
                        <td>
                          <span className="text-rose-500">
                            <FaArrowDown />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Water Tank A Level</td>
                        <td>2982L</td>
                        <td>12%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Compressor Pressure</td>
                        <td>10 bar</td>
                        <td>9%</td>
                        <td>
                          <span className="text-rose-500">
                            <FaArrowDown />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Water Tank A Level</td>
                        <td>2982L</td>
                        <td>12%</td>
                        <td>
                          <span className="text-green-500">
                            <FaArrowUp />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SoftBox>
            </div>
          </SoftBox>
        ) : (
          <SoftBox my={1}>
            <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border">
              <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                <SoftBox>
                  <div
                    role="button"
                    className="flex flex-col md:flex-row items-center justify-between w-full p-3 border-gray-200 dark:border-slate-600 leading-tight"
                  >
                    <div className="flex items-center gap-2 w-full md:w-4/6 xxl:w-3/4">
                      <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                        <Dashboard />
                      </span>
                      <span className="font-medium text-sm dark:text-white">D1</span>
                      <SoftBox
                        component={Link}
                        to="/dashboard"
                        className="cursor-pointer text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit"
                      >
                        Dashboard Name 111111111
                      </SoftBox>
                    </div>
                    <div className="flex items-center justify-between gap-2 md:w-1/4 xxl:w-1/5 w-full mt-2 md:mt-0">
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
                        3 days ago
                      </span>
                      <Dropdown
                        options={options}
                        buttonComponent={
                          <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:ring-gray-600"
                            type="button"
                          >
                            <FaEllipsisH className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                          </button>
                        }
                      />
                    </div>
                  </div>
                </SoftBox>

                <div
                  role="button"
                  className="flex flex-col md:flex-row items-center justify-between w-full p-3 border-gray-200 dark:border-slate-600 leading-tight"
                >
                  <div className="flex items-center gap-2 w-full md:w-4/6 xxl:w-3/4">
                    <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                      <Dashboard />
                    </span>
                    <span className="font-medium text-sm dark:text-white">D2</span>
                    <SoftBox className="text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit">
                      Dashboard Name 2222222222
                    </SoftBox>
                  </div>
                  <div className="flex items-center justify-between gap-2 md:w-1/4 xxl:w-1/5 w-full mt-2 md:mt-0">
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
                      10 days ago
                    </span>
                    <Dropdown
                      options={options}
                      buttonComponent={
                        <button
                          id="dropdownDefaultButton"
                          data-dropdown-toggle="dropdown"
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <FaEllipsisH className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                      }
                    />
                  </div>
                </div>

                {/* Repeat for other dashboard items */}
              </nav>
            </div>
          </SoftBox>
        )}
      </SoftBox>

      <Modal
        showFooter={false}
        showModal={showAddModal}
        setAddModal={handleCloseModal}
        onClose={handleCloseModal}
        size="max-w-lg"
        title="Add Dashboard"
      >
        <SoftBox mb={1} component="form" role="form" onSubmit={addDashboardFormik.handleSubmit}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Server Name
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="serverName"
            placeholder="Enter Server Name"
            value={addDashboardFormik.values.serverName}
            onChange={addDashboardFormik.handleChange}
            onBlur={addDashboardFormik.handleBlur}  // Added onBlur for validation
          />
          {addDashboardFormik.errors.serverName && addDashboardFormik.touched.serverName && (
            <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">
              {addDashboardFormik.errors.serverName}
            </p>
          )}

          <SoftBox mb={1} ml={0.5} mt={2}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              OPC UA Server URL
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="serverUrl"
            placeholder="Enter Server URL"
            value={addDashboardFormik.values.serverUrl}
            onChange={addDashboardFormik.handleChange}
            onBlur={addDashboardFormik.handleBlur}  // Added onBlur for validation
          />
          {addDashboardFormik.errors.serverUrl && addDashboardFormik.touched.serverUrl && (
            <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">
              {addDashboardFormik.errors.serverUrl}
            </p>
          )}

          <SoftBox mb={1} className="flex justify-end" mt={2}>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </SoftBox>
        </SoftBox>
      </Modal>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        size="max-w-lg"
        title="Edit Dashboard"
      >
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Name
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="Enter Name" />
        </SoftBox>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboardhome;
