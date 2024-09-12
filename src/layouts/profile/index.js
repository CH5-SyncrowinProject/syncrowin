// @mui material components
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ProfileActions } from "./reducer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Datepicker, Tabs } from "flowbite-react";
import {
  HiAdjustments,
  HiClipboardList,
  HiUserCircle,
  HiCurrencyDollar,
  HiHand,
} from "react-icons/hi";
import { Table } from "flowbite-react";
import { MdDashboard } from "react-icons/md";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Divider, Icon } from "@mui/material";
import {
  FaArrowLeft,
  FaCreditCard,
  FaEllipsisH,
  FaEye,
  FaFileInvoice,
  FaPen,
  FaPlus,
  FaQuestionCircle,
  FaTrashAlt,
} from "react-icons/fa";
import Dropdown from "components/Dropdown";
import Modal from "components/Modal";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import ProjectDetail from "layouts/ProjectDetails";
import PropTypes from "prop-types";
import ThemeToggle from "examples/ThemeToggle";
import { NotificationManager } from 'react-notifications';

function Overview() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');




  const { user, loading, error } = useSelector(state => state.profile);
  useEffect(() => {
    if (userId) {
      dispatch(ProfileActions.getUserDetailsRequest({ userId }));
    }
    else {
      NotificationManager.error('UserId not found');

    }

  }, [dispatch, userId]);
  
  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible);
  };
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  const toggleProjectDetails = () => {
    setShowProjectDetail(!showProjectDetail);
  };

  const goBackToProjects = () => {
    setShowProjectDetail(false);
  };
  const handleEditClick = () => {
    setShowTable(false);
  };

  const handleBackClick = () => {
    setShowTable(true);
  };
  const options = [
    {
      value: "1",
      label: (
        <span onClick={handleEditClick} className="flex items-center">
          <FaPen className="mr-2 text-sky-500" />
          Edit
        </span>
      ),
    },
    {
      value: "2",
      label: (
        <span onClick={() => setShowModal(true)} className="flex items-center">
          <FaFileInvoice className="mr-2 text-sky-500" />
          View Invoice
        </span>
      ),
    },
  ];
  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>

        <div className="overflow-x-auto">
          <div className="flex justify-center md:justify-start">
            <Tabs
              aria-label="Full width tabs"
              variant="fullWidth"
              className="customeTab w-full flex-col md:flex-row h-fit rounded-xl my-3"
            >
              <Tabs.Item active title="Profile" icon={HiUserCircle}>
                <SoftBox
                  bgColor="white"
                  className="rounded-xl shadow-lg w-full p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <ProfileInfoCard
                    title="profile information"
                    action={{ route: "/editprofile", tooltip: "Edit Profile" }}
                  />
                    <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          // placeholder={user?.firstName || "Loading..."}
                          value={user.data.firstName}
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
                          id="email"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={user.data.email}
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
                          id="phone"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={user.data.phone}
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
                          id=""
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={"admin"}
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Company Name
                        </label>
                        <input
                          id="company"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={user.data.company}
                          required
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Address
                        </label>
                        <input
                         placeholder={user.data.companyAddress}
                          type="number"
                          id="companyAddress"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          disabled
                        />
                      </div>
                    </div>
                </SoftBox>
              </Tabs.Item>
              <Tabs.Item title="Subscription" icon={HiCurrencyDollar}>
                <SoftBox
                  bgColor="white"
                  className="rounded-xl shadow-lg w-full p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  {showTable ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <SoftTypography
                          variant="h5"
                          fontWeight="semibold"
                          color="dark"
                        >
                          Subscriptions{" "}

                        </SoftTypography>
                        <SoftBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="2rem"
                          height="2rem"
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
                      </div>

                      <div className="overflow-y-auto md:overflow-visible w-full">
                        <Table hoverable>
                          <Table.Head>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                              Products
                            </Table.HeadCell>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                              Plan
                            </Table.HeadCell>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                              Price
                            </Table.HeadCell>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                              Billing cycle
                            </Table.HeadCell>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                              Payment Date
                            </Table.HeadCell>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                              Payment Mathod
                            </Table.HeadCell>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                              Status
                            </Table.HeadCell>
                            <Table.HeadCell className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800"></Table.HeadCell>
                          </Table.Head>
                          <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div className="flex items-center gap-4">
                                  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">
                                      JL
                                    </span>
                                  </div>
                                  <div className="font-medium dark:text-white">
                                    <div>Syncrowin</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      jeet.syncrowin.com
                                    </div>
                                  </div>
                                </div>
                              </Table.Cell>
                              <Table.Cell>Basic</Table.Cell>
                              <Table.Cell>$2999</Table.Cell>
                              <Table.Cell>Monthly</Table.Cell>
                              <Table.Cell>12 May 2024</Table.Cell>
                              <Table.Cell>
                                <div className="flex items-center gap-3">
                                  <FaCreditCard className="text-blue-500" />
                                  <span className="">*****12457</span>
                                </div>
                              </Table.Cell>
                              <Table.Cell>
                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                  Paid
                                </span>
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
                        <Modal
                          showModal={showModal}
                          setShowModal={setShowModal}
                          size="max-w-lg"
                          title="Invoice"
                          showFooter={false}
                        >
                          <ol className="relative border-s border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                            <li className="mb-2 ms-4">
                              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-3 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                February 2022
                              </time>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Subscription Renewal
                              </h3>
                              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                $99.00
                              </p>
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                                Pending
                              </span>
                            </li>
                            <li className="mb-2 ms-4">
                              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-3 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                March 2022
                              </time>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                E-commerce Purchase
                              </h3>
                              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                $45.00
                              </p>
                              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                Paid
                              </span>
                            </li>
                            <li className="ms-4">
                              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-3 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                April 2022
                              </time>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Service Fee
                              </h3>
                              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                $10.0
                              </p>
                              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                Paid
                              </span>
                            </li>
                          </ol>
                          <Divider />
                          <SoftBox mb={1}>
                            <SoftBox
                              mb={1}
                              ml={0.5}
                              className="flex items-center justify-end gap-3"
                            >
                              <SoftButton
                                variant="gradient"
                                color="info"
                                className="center"
                                fullWidth
                              >
                                DownLoad
                              </SoftButton>
                              <SoftButton
                                variant="gradient"
                                color="info"
                                className="center"
                                fullWidth
                              >
                                DownLoad as CSV
                              </SoftButton>
                            </SoftBox>
                          </SoftBox>
                        </Modal>
                      </div>
                    </>
                  ) : (
                    <SoftBox>
                      <SoftTypography
                        onClick={handleBackClick}
                        variant="h6"
                        fontWeight="semibold"
                        color="dark"
                        mb={2}
                        className="flex gap-3 items-center cursor-pointer"
                      >
                        {" "}
                        <FaArrowLeft /> Update payment details{" "}
                      </SoftTypography>
                      <div className="grid md:grid-cols-2 gap-3">
                        <SoftBox className="p-4 border border-gray-100 rounded-xl ">
                          <div className="flex flex-col md:flex-row gap-2">
                            <SoftBox mb={1} className="basis-full md:basis-2/4">
                              <SoftBox mb={1} ml={0.5}>
                                <SoftTypography
                                  component="label"
                                  variant="caption"
                                  fontWeight="bold"
                                >
                                  Full name
                                </SoftTypography>
                              </SoftBox>
                              <SoftInput type="text" placeholder="Full name" required />
                            </SoftBox>
                            <SoftBox mb={1} className="basis-full md:basis-2/4">
                              <SoftBox mb={1} ml={0.5}>
                                <SoftTypography
                                  component="label"
                                  variant="caption"
                                  fontWeight="bold"
                                >
                                  Card number
                                </SoftTypography>
                              </SoftBox>
                              <SoftInput type="text" placeholder="xxxx-xxxx-xxxx-xxxx" required />
                            </SoftBox>
                          </div>

                          <SoftBox className="flex flex-col md:flex-row gap-2 w-full">
                            <SoftBox mb={1} className="basis-full md:basis-2/4">
                              <SoftBox mb={1} ml={0.5}>
                                <SoftTypography
                                  component="label"
                                  variant="caption"
                                  fontWeight="bold"
                                >
                                  Card expiration
                                </SoftTypography>
                              </SoftBox>
                              <Datepicker className="CustomDatePicker w-full" />
                            </SoftBox>
                            <SoftBox mb={1} className="basis-full md:basis-2/4">
                              <SoftBox mb={1} ml={0.5}>
                                <SoftTypography
                                  component="label"
                                  variant="caption"
                                  fontWeight="bold"
                                >
                                  CVV
                                </SoftTypography>
                              </SoftBox>
                              <SoftInput type="password" placeholder="111" required />
                            </SoftBox>
                          </SoftBox>
                          <SoftButton variant="gradient" color="info" className="center" fullWidth>
                            Edit payment details
                          </SoftButton>
                        </SoftBox>
                        <SoftBox className="p-4 border border-gray-100 rounded-xl ">
                          <SoftTypography variant="h6" mb={2} fontWeight="regular" color="text">
                            Billing Address
                          </SoftTypography>
                          <textarea
                            id="message"
                            rows="6"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your Address here..."
                          ></textarea>
                        </SoftBox>
                      </div>
                    </SoftBox>
                  )}
                </SoftBox>
              </Tabs.Item>
              <Tabs.Item title="Settings" icon={HiAdjustments}>
                <SoftBox
                  bgColor="white"
                  className="rounded-xl shadow-lg w-full p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <SoftTypography variant="h6" fontWeight="semibold" color="dark" mb={2}>
                    {" "}
                    Settings{" "}
                  </SoftTypography>
                  <SoftTypography variant="h6" fontWeight="regular" color="dark" my={2}>
                    {" "}
                    Notifications{" "}
                  </SoftTypography>

                  <SoftBox>
                    <Grid className="text-base" container>
                      <Grid item xs={12} md={6} xl={3}>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <span className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></span>
                          <span className="ms-3 text-base font-medium text-gray-900 dark:text-gray-300">
                            Email Notifications
                          </span>
                        </label>
                      </Grid>
                      <Grid item xs={12} md={6} xl={3}>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <span className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></span>
                          <span className="ms-3 text-base font-medium text-gray-900 dark:text-gray-300">
                            SMS Notifications
                          </span>
                        </label>
                      </Grid>
                      <Grid item xs={12} md={6} xl={3}>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <span className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></span>
                          <span className="ms-3 text-base font-medium text-gray-900 dark:text-gray-300">
                            Push Notifications
                          </span>
                        </label>
                      </Grid>
                    </Grid>
                  </SoftBox>
                  <Divider />
                  <SoftTypography variant="h6" fontWeight="regular" color="dark" mb={2}>
                    {" "}
                    Security Settings{" "}
                  </SoftTypography>
                  <SoftBox>
                    <Grid className="text-base" container spacing={1}>
                      <Grid item xs={12} md={6} xl={3}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Old password
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput type="Password" placeholder="" required />
                      </Grid>
                      <Grid item xs={12} md={6} xl={3}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            New password
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput type="Password" placeholder="" required />
                      </Grid>
                      <Grid item xs={12} md={6} xl={3}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Confirm password
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput type="Password" placeholder="" required />
                      </Grid>
                    </Grid>
                  </SoftBox>
                  <Divider />
                  <SoftTypography variant="h6" fontWeight="regular" color="dark" mb={2}>
                    {" "}
                    General Settings{" "}
                  </SoftTypography>
                  <SoftBox>
                    <Grid className="text-base" container spacing={1}>
                      <Grid item xs={12} md={6} xl={3}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Language Preferences
                          </SoftTypography>
                        </SoftBox>
                        <select
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Choose a Language</option>
                          <option>English</option>
                          {/* <option>Hindi</option>
                          <option>Portuguese</option>
                          <option>Japanese</option> */}
                        </select>
                      </Grid>
                    </Grid>
                  </SoftBox>
                  <Divider />
                  <SoftTypography variant="h6" fontWeight="regular" color="dark" mb={2}>
                    {" "}
                    Theme Settings{" "}
                  </SoftTypography>
                  <SoftBox>
                    <Grid className="text-base" container spacing={1}>
                      <Grid item xs={12} md={6} xl={3}>
                        {/* <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <span className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></span>
                          <span className="ms-3 text-base font-medium text-gray-900 dark:text-gray-300">
                            Dark
                          </span>
                        </label> */}
                        <ThemeToggle />
                      </Grid>
                    </Grid>

                  </SoftBox>
                  <Divider />
                  <SoftBox className="flex justify-end gap-3">
                    <SoftButton variant="gradient" color="info" className="w-fit">
                      Save
                    </SoftButton>
                    <SoftButton variant="outlined" color="info" className="w-fit">
                      Cancel
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </Tabs.Item>
              <Tabs.Item title="Support" icon={HiHand}>
                <SoftBox
                  bgColor="white"
                  className="rounded-xl shadow-lg w-full p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <SoftTypography variant="h6" fontWeight="semibold" color="dark" mb={2}>
                    {" "}
                    Contact Support{" "}
                  </SoftTypography>
                  <SoftTypography variant="h6" fontWeight="regular" color="dark" mb={2}>
                    {" "}
                    you can use this form to report bugs, suggest improvements, request features or
                    contact our team for support{" "}
                  </SoftTypography>
                  <Grid className="text-base" container spacing={1}>
                    <Grid item xs={12}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Subject
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput type="text" placeholder="Subject" required />
                    </Grid>
                    <Grid item xs={12}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Description
                        </SoftTypography>
                      </SoftBox>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                      ></textarea>
                    </Grid>
                    <Grid item xs={12}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Attachment
                        </SoftTypography>
                      </SoftBox>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                      />
                    </Grid>
                  </Grid>
                  <Divider />

                  <SoftTypography
                    variant="h4"
                    fontWeight="semibold"
                    color="dark"
                    mb={2}
                    className="tracking-tight"
                  >
                    {" "}
                    Frequently asked questions{" "}
                  </SoftTypography>
                  <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                    <div>
                      <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                          <FaQuestionCircle className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                          What do you mean by &quot;Figma assets&quot;?
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          You will have access to download the full Figma project including all of
                          the pages, the components, responsive pages, and also the icons,
                          illustrations, and images included in the screens.
                        </p>
                      </div>
                      <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                          <FaQuestionCircle className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                          What does &quot;lifetime access&quot; exactly mean?
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          Once you have purchased either the design, code, or both packages, you
                          will have access to all of the future updates based on the roadmap, free
                          of charge.
                        </p>
                      </div>
                      <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                          <FaQuestionCircle className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                          How does support work?
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          We&#39;re aware of the importance of well qualified support, that is why
                          we decided that support will only be provided by the authors that actually
                          worked on this project.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          Feel free to{" "}
                          <a
                            href="#"
                            className="font-medium underline text-blue-600 dark:text-blue-500 hover:no-underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            contact us
                          </a>{" "}
                          and we&#39;ll help you out as soon as we can.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-10">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                          <FaQuestionCircle className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                          What does &quot;free updates&quot; include?
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          The free updates that will be provided is based on the{" "}
                          <a
                            href="#"
                            className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                          >
                            roadmap
                          </a>{" "}
                          that we have laid out for this project. It is also possible that we will
                          provide extra updates outside of the roadmap as well.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  {isChatVisible && (
                    <SoftBox mb={3}>
                      <SoftTypography variant="h4"
                        fontWeight="semibold"
                        color="dark"
                        mb={2}
                        className="tracking-tight">
                        {" "}
                        Live Chat Support{" "}
                      </SoftTypography>
                      <div style={{ position: "relative", height: "300px" }}>
                        <MainContainer>
                          <ChatContainer>
                            <MessageList>
                              <Message
                                model={{
                                  message: "Hello my friend",
                                  sentTime: "just now",
                                  sender: "Joe",
                                }}
                              />
                            </MessageList>
                            <MessageInput placeholder="Type message here" />
                          </ChatContainer>
                        </MainContainer>
                      </div>
                    </SoftBox>
                  )}
                  <SoftBox className="flex justify-between gap-3">
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
                      onClick={toggleChatVisibility}
                    >
                      <Icon fontSize="default" color="inherit">
                        chat
                      </Icon>
                    </SoftBox>

                    <SoftBox className="flex gap-3">
                      <SoftButton variant="gradient" color="info" className="w-fit">
                        Send
                      </SoftButton>
                      <SoftButton variant="outlined" color="info" className="w-fit">
                        Cancel
                      </SoftButton>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </Tabs.Item>
              <Tabs.Item title="My Projects" icon={HiClipboardList}>
                <SoftBox
                  bgColor="white"
                  className="rounded-xl shadow-lg w-full p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  {showProjectDetail ? (
                    <SoftBox>
                      <ProjectDetail onClick={goBackToProjects} />
                    </SoftBox>
                  ) : (
                    <SoftBox p={2}>
                      <SoftTypography variant="h6" fontWeight="semibold" color="dark" mb={2}>
                        {" "}
                        Shared Projects{" "}
                      </SoftTypography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6} xl={3}>
                          <DefaultProjectCard
                            image={homeDecor1}
                            label="project #2"
                            title="modern"
                            description="As Uber works through a huge amount of internal management turmoil."
                            action={{
                              type: "internal",
                              color: "info",
                              label: "view project",
                            }}
                            authors={[
                              { image: team1, name: "Elena Morison" },
                              { image: team2, name: "Ryan Milly" },
                              { image: team3, name: "Nick Daniel" },
                              { image: team4, name: "Peterson" },
                            ]}
                            onClick={toggleProjectDetails}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                          <DefaultProjectCard
                            image={homeDecor2}
                            label="project #1"
                            title="scandinavian"
                            description="Music is something that every person has his or her own specific opinion about."
                            action={{
                              type: "internal",

                              color: "info",
                              label: "view project",
                            }}
                            authors={[
                              { image: team3, name: "Nick Daniel" },
                              { image: team4, name: "Peterson" },
                              { image: team1, name: "Elena Morison" },
                              { image: team2, name: "Ryan Milly" },
                            ]}
                            onClick={toggleProjectDetails}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                          <DefaultProjectCard
                            image={homeDecor3}
                            label="project #3"
                            title="minimalist"
                            description="Different people have different taste, and various types of music."
                            action={{
                              type: "internal",

                              color: "info",
                              label: "view project",
                            }}
                            authors={[
                              { image: team4, name: "Peterson" },
                              { image: team3, name: "Nick Daniel" },
                              { image: team2, name: "Ryan Milly" },
                              { image: team1, name: "Elena Morison" },
                            ]}
                            onClick={toggleProjectDetails}
                          />
                        </Grid>
                        {/* Other DefaultProjectCard components */}
                      </Grid>
                    </SoftBox>
                  )}
                </SoftBox>
              </Tabs.Item>
              <Tabs.Item title="Shared with me" icon={HiClipboardList}>
                <SoftBox
                  bgColor="white"
                  className="rounded-xl shadow-lg w-full p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  {showProjectDetail ? (
                    <SoftBox>
                      <ProjectDetail onClick={goBackToProjects} />
                    </SoftBox>
                  ) : (
                    <SoftBox p={2}>
                      <SoftTypography variant="h6" fontWeight="semibold" color="dark" mb={2}>
                        {" "}
                        My Projects{" "}
                      </SoftTypography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6} xl={3}>
                          <DefaultProjectCard
                            image={homeDecor1}
                            label="project #2"
                            title="modern"
                            description="As Uber works through a huge amount of internal management turmoil."
                            action={{
                              type: "internal",
                              color: "info",
                              label: "view project",
                            }}
                            authors={[
                              { image: team1, name: "Elena Morison" },
                              { image: team2, name: "Ryan Milly" },
                              { image: team3, name: "Nick Daniel" },
                              { image: team4, name: "Peterson" },
                            ]}
                            onClick={toggleProjectDetails}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                          <DefaultProjectCard
                            image={homeDecor2}
                            label="project #1"
                            title="scandinavian"
                            description="Music is something that every person has his or her own specific opinion about."
                            action={{
                              type: "internal",

                              color: "info",
                              label: "view project",
                            }}
                            authors={[
                              { image: team3, name: "Nick Daniel" },
                              { image: team4, name: "Peterson" },
                              { image: team1, name: "Elena Morison" },
                              { image: team2, name: "Ryan Milly" },
                            ]}
                            onClick={toggleProjectDetails}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                          <DefaultProjectCard
                            image={homeDecor3}
                            label="project #3"
                            title="minimalist"
                            description="Different people have different taste, and various types of music."
                            action={{
                              type: "internal",

                              color: "info",
                              label: "view project",
                            }}
                            authors={[
                              { image: team4, name: "Peterson" },
                              { image: team3, name: "Nick Daniel" },
                              { image: team2, name: "Ryan Milly" },
                              { image: team1, name: "Elena Morison" },
                            ]}
                            onClick={toggleProjectDetails}
                          />
                        </Grid>
                        {/* Other DefaultProjectCard components */}
                      </Grid>
                    </SoftBox>
                  )}
                </SoftBox>
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </SoftBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
