import { Divider, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Avatar, Table } from "flowbite-react";
import React, { useState } from "react";
import user_1 from "../../assets/images/team-1.jpg";
import user_2 from "../../assets/images/team-2.jpg";
import user_3 from "../../assets/images/team-3.jpg";
import user_4 from "../../assets/images/team-4.jpg";
import user_5 from "../../assets/images/team-5.jpg";
import {
  FaArrowCircleLeft,
  FaCheckCircle,
  FaEllipsisH,
  FaEye,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPen,
  FaTrashAlt,
  FaTwitter,
} from "react-icons/fa";
import Dropdown from "components/Dropdown";
import Modal from "components/Modal";
import SoftTypography from "components/SoftTypography";
import CommonSelect from "components/CommonSelect";
import DummyBg from "../../assets/images/Dummy_Bg.jpg";
import { Link } from "react-router-dom";
const UserManagement = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedOptionRole, setSelectedOptionRole] = useState("");
  const [selectedOptionPermission, setSelectedOptionPermission] = useState("");
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const toggleView = () => {
    setShowDetails((prev) => !prev);
  };

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
        <SoftBox component={Link} to="/UserDetails" className="flex items-center">
          <FaEye className="mr-2 text-emerald-500" />
          View
        </SoftBox>
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

  return (
    <>
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
              <SoftBox
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
                onClick={() => setShowModalAdd(true)}
              >
                <Icon fontSize="default" color="inherit">
                  add
                </Icon>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <div className="overflow-x-auto md:overflow-visible bg-white p-4 dark:bg-gray-800 rounded-lg shadow-lg">
          <Table>
            <Table.Head>
              <Table.HeadCell>USER</Table.HeadCell>
              <Table.HeadCell>USER ROLE</Table.HeadCell>
              <Table.HeadCell>STATUS</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Action</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_1} alt="Neil image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@gmail.com
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Administrator
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2 items-center">
                    <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
                    <span>Active</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>

              {/* Dummy Row 1 */}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_2} alt="Bonnie image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Bonnie Green
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        bonnie@gmail.com
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Developer
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2 items-center">
                    <span className="flex w-3 h-3 me-3 bg-rose-500 rounded-full"></span>
                    <span>Inactive</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>

              {/* Dummy Row 2 */}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_3} alt="Michael image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Michael Roberts
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        michael@gmail.com
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Support Specialist
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2 items-center">
                    <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
                    <span>Active</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>

              {/* Dummy Row 3 */}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_4} alt="Emma image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Emma Johnson
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        emma@gmail.com
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                    Finance Manager
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2 items-center">
                    <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
                    <span>Active</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>

              {/* Dummy Row 4 */}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_5} alt="Emma image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Joseph McFall
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Joseph McFall@gmail.com
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    Viewer
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2 items-center">
                    <span className="flex w-3 h-3 me-3 bg-rose-500 rounded-full"></span>
                    <span>Inactive</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <Modal
          showModal={showModalAdd}
          setShowModal={setShowModalAdd}
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
      </DashboardLayout>
    </>
  );
};

export default UserManagement;
