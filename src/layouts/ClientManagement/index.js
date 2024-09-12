import { Divider, Icon } from "@mui/material";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from 'react';
import Logo from "../../assets/logo.svg";
import { FaArrowCircleLeft, FaBuilding, FaEye, FaMapMarkerAlt, FaPen, FaTrashAlt } from "react-icons/fa";
import Modal from "components/Modal";
import SoftTypography from "components/SoftTypography";
import CommonSelect from "components/CommonSelect";
import Capricorn from "../../assets/images/Capricorn-Power.png";
import Accenture from "../../assets/images/Accenture-logo.jpg";
import SoftButton from "components/SoftButton";
import CompanyDetails from "layouts/companyDetails";
import { useDispatch, useSelector } from 'react-redux';
import { ClientManagementActions } from './reducer';
import SoftBox from "components/SoftBox";
import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const ClientManagement = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [selectedOptionRole, setSelectedOptionRole] = useState("");
  const [selectedOptionPermission, setSelectedOptionPermission] = useState("");
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [agreement, setAgremment] = useState(true);
  const { users, loading, error } = useSelector(state => state.clientManagement);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetAgremment = () => setAgremment(!agreement);
  useEffect(() => { }, [navigate]);

  useEffect(() => {
    dispatch(ClientManagementActions.fetchUsersRequest());
  }, [dispatch]);

  // Handle toggle change
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };
  const toggleView = () => {
    setShowDetails((prev) => !prev);
  };

  const handleCloseModal = () => {
    formik.resetForm();  // Resets the form values
    setShowAddCompany(false);  // Close the modal explicitly
  };

  const passwordValidationSchema = Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character");

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: passwordValidationSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Please confirm your password"),
    firstName: Yup.string().min(3).max(15).required("First name is required"),
    lastName: Yup.string().min(3).max(15).required("Last name is required"),
    company: Yup.string().max(30).required("Company is required"),
    companyAddress: Yup.string().max(30).required("Company Address is required"),
    designationId: Yup.string().required("Please select role/position")
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      company: "",
      companyAddress: "",
      designationId: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (agreement) {
        dispatch(ClientManagementActions.addClientRequest(values));
        navigate("/clientmanagement");
        setShowAddCompany(false);
        formik.resetForm();  // Resets the form values
      }
    },
  });

  const options = [
    {
      value: "1",
      label: (
        <span onClick={() => setShowModalEdit(true)} className="flex items-center">
          <FaPen className="mr-2 text-sky-500" />
          Edit
        </span>
      ),
    },
    {
      value: "2",
      label: (
        <span onClick={toggleView} className="flex items-center">
          <FaEye className="mr-2 text-emerald-500" />
          View
        </span>
      ),
    },
    {
      value: "3",
      label: (
        <span className="flex items-center">
          <FaTrashAlt className="mr-2 text-rose-500" />
          Delete
        </span>
      ),
    },
  ];
  const optionsPopUp = [
    { value: "1", label: <span onClick={() => setShowModalAdd(true)}>Client Admin</span> },
    { value: "2", label: <span onClick={() => setShowModalAdd(true)}>Client</span> },
  ];
  const optionsRole = [
    { value: "option1", label: "System administrator" },
    { value: "option2", label: "Developer" },
    { value: "option3", label: "Support specialist" },
    { value: "option4", label: "Finance manager" },
  ];
  const optionsPermission = [
    { value: "option1", label: "Permission_1" },
    { value: "option2", label: "Permission_2" },
    { value: "option3", label: "Permission_3" },
    { value: "option4", label: "Permission_4" },
  ];
  const optionsStatus = [
    { value: "option1", label: "Active" },
    { value: "option2", label: "Inactive" },
  ];
  const handleChangeRole = (event) => {
    setSelectedOptionRole(event.target.value);
  };
  const handleChangePermission = (event) => {
    setSelectedOptionPermission(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setSelectedOptionStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />

        {!showDetails ? (
          <div>
            <SoftBox mb={3} mt={3}>
              <SoftBox mb={2} className="flex flex-col md:flex-row md:justify-between">
                <div className="h-10 w-full md:w-fit">
                  <SoftInput
                    className="w-full md:w-fit"
                    placeholder="Type here..."
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                  <SoftBox
                    onClick={() => setShowAddCompany(true)}
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
            </SoftBox>

            {isChecked ? (
              <SoftBox>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div
                    onClick={toggleView}
                    className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4"
                  >
                    <div className="flex justify-between items-center">
                      <img src={Logo} alt="" className="w-32" loading="lazy" />
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        Premium
                      </span>
                    </div>
                    <Divider />
                    <SoftTypography variant="h5" fontWeight="medium" mb={2}>
                      Syncrowin Private Limited
                    </SoftTypography>
                    <div className="flex gap-2">
                      <FaMapMarkerAlt />
                      <span className="text-center text-sm md:text-start">
                        NUNILE, Western Australia(WA), 6566 (08) 9078 8384
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={toggleView}
                    className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4"
                  >
                    <div className="flex justify-between items-center">
                      <img src={Capricorn} alt="" className="w-32" loading="lazy" />
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                        Basic
                      </span>
                    </div>
                    <Divider />
                    <SoftTypography variant="h5" fontWeight="medium" mb={2}>
                      Capricorn Power
                    </SoftTypography>
                    <div className="flex gap-2">
                      <FaMapMarkerAlt />
                      <span className="text-center text-sm md:text-start">
                        1 Hardware Drive, Geelong, VIC 3000
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={toggleView}
                    className="bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border p-4"
                  >
                    <div className="flex justify-between items-center">
                      <img src={Accenture} alt="" className="w-32" loading="lazy" />
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Medium
                      </span>
                    </div>
                    <Divider />
                    <SoftTypography variant="h5" fontWeight="medium" mb={2}>
                      Accenture IT Company
                    </SoftTypography>
                    <div className="flex gap-2">
                      <FaMapMarkerAlt />
                      <span className="text-center text-sm md:text-start">
                        Brilliant Sapphire, Scheme 78, Part 2, Vijay Nagar, Indore
                      </span>
                    </div>
                  </div>
                </div>
              </SoftBox>
            ) : (
              <SoftBox my={1}>
                <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border">
                  <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {users.map((user, index) => (
                      <SoftBox key={user.userId}>
                        <div
                          role="button"
                          className="flex flex-col md:flex-row items-center justify-between w-full p-3 border-gray-200 dark:border-slate-600 leading-tight"
                        >
                          <div className="flex items-center gap-2 w-full md:w-1/2">
                            <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                              <FaBuilding />
                            </span>
                            <span className="font-medium text-sm dark:text-white">C{index + 1}</span>
                            <SoftBox className="cursor-pointer text-gray-600 dark:text-gray-300 ps-2 truncate w-3/4 md:w-fit">
                              {user.company}
                            </SoftBox>
                          </div>
                          <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:w-1/2 w-full mt-2 md:mt-0">
                            <div className="flex gap-2">
                              <FaMapMarkerAlt />
                              <span className="text-center">
                                {user.companyAddress}
                              </span>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              Premium
                            </span>
                          </div>
                        </div>
                      </SoftBox>
                    ))}
                  </nav>
                </div>
              </SoftBox>
            )}
          </div>
        ) : (
          <div className="shadow-lg rounded-lg  bg-white dark:bg-gray-800 dark:text-white p-4 relative">
            <div className="flex items-center gap-2  mb-3 cursor-pointer">
              <FaArrowCircleLeft className="cursor-pointer" onClick={toggleView} />
            </div>
            <CompanyDetails />
          </div>
        )}

        <Modal
          showModal={showModalAdd}
          size="max-w-lg"
          title="Add User"
        >
          <SoftBox mb={1}>
            <div>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    User Name
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="text" placeholder="Name" required />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="email" placeholder="Email" required />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Password
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="password" placeholder="Password" required />
              </SoftBox>

              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Role
                  </SoftTypography>
                </SoftBox>
                <CommonSelect
                  options={optionsRole}
                  value={selectedOptionRole}
                  onChange={handleChangeRole}
                  placeholder="Select an option"
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Permission
                  </SoftTypography>
                </SoftBox>
                <CommonSelect
                  options={optionsPermission}
                  value={selectedOptionPermission}
                  onChange={handleChangePermission}
                  placeholder="Select an option"
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Status
                  </SoftTypography>
                </SoftBox>
                <CommonSelect
                  options={optionsStatus}
                  value={selectedOptionStatus}
                  onChange={handleChangeStatus}
                  placeholder="Select an option"
                />
              </SoftBox>
            </div>
          </SoftBox>
        </Modal>

        <Modal
          showModal={showModalEdit}
          setShowModal={setShowModalEdit}
          size="max-w-lg"
          title="Edit User"
        >
          <SoftBox mb={1}>
            <div>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    User Name
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="text" placeholder="Name" required />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="email" placeholder="Email" required />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Password
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="password" placeholder="Password" required />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Role
                  </SoftTypography>
                </SoftBox>
                <CommonSelect
                  options={optionsRole}
                  value={selectedOptionRole}
                  onChange={handleChangeRole}
                  placeholder="Select an option"
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Permission
                  </SoftTypography>
                </SoftBox>
                <CommonSelect
                  options={optionsPermission}
                  value={selectedOptionPermission}
                  onChange={handleChangePermission}
                  placeholder="Select an option"
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Status
                  </SoftTypography>
                </SoftBox>
                <CommonSelect
                  options={optionsStatus}
                  value={selectedOptionStatus}
                  onChange={handleChangeStatus}
                  placeholder="Select an option"
                />
              </SoftBox>
            </div>
          </SoftBox>
        </Modal>

        <Modal
          showFooter={false}
          showModal={showAddCompany}
          setShowModal={handleCloseModal}  // Use the new handleCloseModal function
          onClose={handleCloseModal}  // Ensure this triggers on closing
          size="max-w-lg"
          title="Add Company"
        >
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form" onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} >
                  <SoftBox mb={2}>
                    <SoftInput
                      type="text"
                      placeholder="First name*"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.firstName && formik.touched.firstName ?
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.firstName}</p> : null
                    }
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} >
                  <SoftBox mb={2}>
                    <SoftInput
                      type="text"
                      placeholder="Last name*"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.lastName && formik.touched.lastName ?
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.lastName}</p> : null
                    }
                  </SoftBox>
                </Grid>
              </Grid>
              <SoftBox mb={2}>
                <SoftInput placeholder="Company name"
                  name="company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.company && formik.touched.company ?
                  <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.company}</p> : null
                }
              </SoftBox>

              <SoftBox mb={2}>
                <SoftInput placeholder="Company Address"
                  name="companyAddress"
                  value={formik.values.companyAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.companyAddress && formik.touched.companyAddress ?
                  <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.companyAddress}</p> : null
                }
              </SoftBox>

              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Position /Role* "
                  name="designationId"
                  value={formik.values.designationId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.designationId && formik.touched.designationId ?
                  <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.designationId}</p> : null
                }
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  placeholder="Email*"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ?
                  <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.email}</p> : null
                }
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  placeholder="Password*"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ?
                  <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.password}</p> : null
                }
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  placeholder="Confirm Password*"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ?
                  <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.confirmPassword}</p> : null
                }
              </SoftBox>
              <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </div>
            </SoftBox>
          </SoftBox>
        </Modal>

      </DashboardLayout>
    </>
  );
};

export default ClientManagement;
