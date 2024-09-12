import React from "react";
import user_1 from "../../assets/images/team-1.jpg";
import user_2 from "../../assets/images/team-2.jpg";
import user_3 from "../../assets/images/team-3.jpg";
import user_4 from "../../assets/images/team-4.jpg";
import user_5 from "../../assets/images/team-5.jpg";
import Company from "../../assets/images/CompanyDummy.png";
import Doc from "../../assets/images/Document.jpg";
import Doc_2 from "../../assets/images/Document_2.jpg";
import Logo from "../../assets/logo.svg";
import SoftTypography from "components/SoftTypography";
import {
  FaCog,
  FaEllipsisH,
  FaEnvelope,
  FaHubspot,
  FaPen,
  FaRocketchat,
  FaTrashAlt,
} from "react-icons/fa";
import { Divider } from "@mui/material";
import { Avatar, Table } from "flowbite-react";
import Dropdown from "components/Dropdown";
import SoftBox from "components/SoftBox";

const options = [
  {
    value: "1",
    label: (
      <span className="flex items-center">
        <FaCog className="mr-2 text-gray-800" />
        Settings
      </span>
    ),
  },
  {
    value: "2",
    label: (
      <span className="flex items-center">
        <FaTrashAlt className="mr-2 text-rose-500" />
        Delete
      </span>
    ),
  },
];
const paymentData = [
  {
    payment_mode: "Credit Card",
    payment_status: "Completed",
    bill_number: "INV-1001",
    bill_date: "2024-01-15",
    payment_id: "PAY-123456",
    amount: "1500.00",
  },
  {
    payment_mode: "PayPal",
    payment_status: "Pending",
    bill_number: "INV-1002",
    bill_date: "2024-02-20",
    payment_id: "PAY-654321",
    amount: "250.50",
  },
  {
    payment_mode: "Bank Transfer",
    payment_status: "Failed",
    bill_number: "INV-1003",
    bill_date: "2024-03-10",
    payment_id: "PAY-112233",
    amount: "5000.00",
  },
  {
    payment_mode: "Check",
    payment_status: "Completed",
    bill_number: "INV-1004",
    bill_date: "2024-04-05",
    payment_id: "PAY-998877",
    amount: "75.00",
  },
  {
    payment_mode: "Credit Card",
    payment_status: "Refunded",
    bill_number: "INV-1005",
    bill_date: "2024-05-18",
    payment_id: "PAY-445566",
    amount: "1200.00",
  },
];

const CompanyDetails = () => {
  return (
    <>
      <div className="">
        <div className="flex flex-col md:flex-row ">
          <div className="basis-full flex items-center justify-center md:basis-2/12">
            <div className="w-36 h-36 flex items-center justify-center rounded-full shadow-lg border-gray-200 border-2">
              <img src={Logo} className="rounded-full object-contain border-white" />
            </div>
          </div>
          <div className="basis-full md:basis-10/12 p-3">
            <SoftTypography variant="h4" fontWeight="bold" mb={1}>
              Syncrowin Private Limited
            </SoftTypography>
            <SoftTypography variant="h6" fontWeight="regular" mb={1}>
              Syncrowin.it.gmail.com
            </SoftTypography>
            <div className="flex justify-between items-center">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                Premium
              </span>
              <div className=" flex gap-3 items-center">
                <span className="w-8 h-8 rounded-full flex items-center p-2 cursor-pointer shadow-sm justify-center text-gray-700 bg-gray-200 dark:text-white dark:bg-sky-400">
                  <FaEnvelope />
                </span>
                <span className="w-8 h-8 rounded-full flex items-center p-2 cursor-pointer shadow-sm justify-center text-gray-700 bg-gray-200 dark:text-white dark:bg-sky-400">
                  <FaRocketchat />
                </span>
                <span className="w-8 h-8 rounded-full flex items-center p-2 cursor-pointer shadow-sm justify-center text-gray-700 bg-gray-200 dark:text-white dark:bg-sky-400">
                  <FaHubspot />
                </span>
                <span className="w-8 h-8 rounded-full flex items-center p-2 cursor-pointer shadow-sm justify-center text-gray-700 bg-gray-200 dark:text-white dark:bg-sky-400">
                  <FaPen />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <SoftTypography variant="h6" fontWeight="medium" mb={2} className="pl-3">
          Company Details
        </SoftTypography>
        <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Owner Name
            </label>
            <input
              type="text"
              id="first_name"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Jaideep Upadhyay"
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
              placeholder="8898562314"
              required
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="phone"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="JaiDeep@gmail.com"
              required
              disabled
            />
          </div>

          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address-1
            </label>
            <input
              type="number"
              id="website"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Electronic complex pardeshi pura Indore"
              required
              disabled
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address-2
            </label>
            <input
              type="number"
              id="website"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Electronic complex pardeshi pura Indore"
              required
              disabled
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
             Company Size
            </label>
            <input
              type="number"
              id="website"
              className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="100-200 Employees"
              required
              disabled
            />
          </div>
        </div>
        <Divider />
        <SoftTypography variant="h6" fontWeight="medium" mb={2} className="pl-3">
          Payment Details
        </SoftTypography>
        <div className="CustomTable overflow-x-auto md:overflow-visible bg-white dark:bg-gray-800 ">
          <Table>
            <Table.Head>
              <Table.HeadCell>Payment Mode</Table.HeadCell>
              <Table.HeadCell>Payment Status</Table.HeadCell>
              <Table.HeadCell>Bill Number</Table.HeadCell>
              <Table.HeadCell>Bill Date</Table.HeadCell>
              <Table.HeadCell>Payment ID</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paymentData.map((payment, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {payment.payment_mode}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className={`bg-${paymentStatusColor(
                        payment.payment_status
                      )}-100 text-${paymentStatusColor(
                        payment.payment_status
                      )}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${paymentStatusColor(
                        payment.payment_status
                      )}-900 dark:text-${paymentStatusColor(payment.payment_status)}-300`}
                    >
                      {payment.payment_status}
                    </span>
                  </Table.Cell>
                  <Table.Cell>{payment.bill_number}</Table.Cell>
                  <Table.Cell>{payment.bill_date}</Table.Cell>
                  <Table.Cell>{payment.payment_id}</Table.Cell>
                  <Table.Cell>${payment.amount}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <Divider />
        <SoftTypography variant="h6" fontWeight="medium" mb={2} className="pl-3">
          Admins
        </SoftTypography>
        <div className="CustomTable overflow-x-auto md:overflow-visible bg-white dark:bg-gray-800 ">
          <Table>
            <Table.Head>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Communication Channel</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Action</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_4} alt="Neil image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Jeet Thakur
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        ANIME CREATION PRIVATE LIMITED
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>JeetendraThakur@gmail.com</Table.Cell>
             
                <Table.Cell>Phone</Table.Cell>
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

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_2} alt="Neil image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Dhanwan Prajapat
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Dhanno Iron And Steel Industries
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>DhanwanPrajapat@gmail.com</Table.Cell>
               
                <Table.Cell>Email</Table.Cell>
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

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar img={user_3} alt="Neil image" rounded size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Jaideep Upadhyay
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Syncrowin PRIVATE LIMITED
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>JaideepUpadhyay@gmail.com</Table.Cell>
             
                <Table.Cell>hubspot</Table.Cell>
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
        <Divider />
        <SoftTypography variant="h6" fontWeight="medium" mb={2} className="pl-3">
          Registered Documents
        </SoftTypography>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
            <div>
              <img className="h-auto max-w-full rounded-lg" src={Doc_2} alt="" />
            </div>
            <div>
              <img className="h-auto max-w-full rounded-lg" src={Doc} alt="" />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img className="h-auto max-w-full rounded-lg" src={Doc_2} alt="" />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img className="h-auto max-w-full rounded-lg" src={Doc_2} alt="" />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img className="h-auto max-w-full rounded-lg" src={Doc} alt="" />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img className="h-auto max-w-full rounded-lg" src={Doc} alt="" />
            </div>
            <div>
              <img className="h-auto max-w-full rounded-lg" src={Doc_2} alt="" />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const paymentStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "blue";
    case "Pending":
      return "yellow";
    case "Failed":
      return "red";
    case "Refunded":
      return "green";
    default:
      return "gray";
  }
};
export default CompanyDetails;
