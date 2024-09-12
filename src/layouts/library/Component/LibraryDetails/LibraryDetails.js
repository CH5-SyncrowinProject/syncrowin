import { Divider, Grid, Icon } from "@mui/material";
import MyCalendar from "components/Calendar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Tabs } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheck, FaPen, FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import DummyBg from "../../../../assets/images/Dummy_Bg.jpg";
import { AssetDetailActions } from "../../reducer";
import { useDispatch, useSelector } from 'react-redux';
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useParams } from 'react-router-dom';
import Dropdown from "components/Dropdown";

const LibraryDetails = () => {
  const { assetId } = useParams();
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const asset = useSelector(state => state.assetDetail.asset);
  const events = useSelector(state => state.assetDetail.events);

  useEffect(() => {
    if (assetId) {
      dispatch(AssetDetailActions.fetchAssetByIdRequest(assetId));
    }
  }, [assetId, dispatch]);

  useEffect(() => {
    if (assetId) {
      dispatch(AssetDetailActions.detailEventRequest(assetId));
    }
  }, [assetId, dispatch])

  return (
    <>
      <DashboardLayout>
        <SoftBox>
          <div className="bg-white shadow-md w-full rounded-xl bg-clip-border p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <SoftBox>
              <SoftBox
                component={Link}
                to="/library"
                className="flex items-center gap-2  mb-3 cursor-pointer"
              >
                <FaArrowLeft />
                <SoftTypography variant="h6"> Asset Details </SoftTypography>
              </SoftBox>

              <Tabs aria-label="Default tabs" variant="default">
                <Tabs.Item active title="General Information">
                  <form>
                    <div className="w-full mb-2 flex justify-end">
                      {/* <Link to={`/editlibrary/${assetId}`} className="text-sm">
                        <FaPen className="cursor-pointer" />
                      </Link> */}
                    </div>
                    <div className="grid mb-2 md:grid-cols-2">

                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name
                        </label>
                        <input
                          value={asset?.assetName || ''}
                          type="text"
                          id="first_name"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="AssetsNamelsdksdaiuiausaskan"
                          required
                          disabled
                        />
                      </div>

                      {asset?.parentName && (
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Parent Name
                          </label>
                          <input
                            value={asset?.parentName || ''}
                            type="text"
                            id="first_name"
                            className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            disabled
                          />
                        </div>
                      )}

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Type
                        </label>
                        <input
                          value={asset?.assetTypeName || ''}
                          type="text"
                          id="first_name"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Vision Systems"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Manufacturer
                        </label>
                        <input
                          value={asset?.manufacturer || ''}
                          type="text"
                          id="company"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Syncrowin"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Model
                        </label>
                        <input
                          value={asset?.model || ''}
                          type="text"
                          id="phone"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Md-145nh"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Serial Number
                        </label>
                        <input
                          value={asset?.serialNum || ''}
                          type="number"
                          id="website"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="258741"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Tags
                        </label>
                        <input
                          value={asset?.assetTag || ''}
                          type="text"
                          id="website"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Tag-1"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Installation Date
                        </label>
                        <input
                          value={asset?.installationDate ? moment(asset.installationDate).format('DD/MM/YY') : 'N/A'}
                          type="text"
                          id=""
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="16 May 2024"
                          required
                          disabled
                        />
                      </div>
                      <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Location
                        </label>
                        <input
                          value={asset?.location || ''}

                          type="text"
                          id="email"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="WOONONA, New South Wales(NSW), 251702) 4299 1363"
                          required
                          disabled
                        />
                      </div>

                      <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Photo
                        </label>
                        {/* <div className="w-full h-48 object-cover">
                          <img src={DummyBg} className="w-full h-48 object-cover rounded-lg" />
                        </div> */}
                      </div>
                      <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Description
                        </label>
                        <textarea
                          value={asset?.description || ''}

                          id="message"
                          rows="4"
                          className="ShowValue block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
                        ></textarea>
                      </div>

                      {asset?.childAssets && asset.childAssets.length > 0 && (
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Child Names
                          </label>
                          <ul className="list-disc pl-5">
                            {asset.childAssets.map((child, index) => (
                              <li key={index} className="mb-1 text-sm text-gray-700 dark:text-gray-300">
                                {child.childAssetName}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </form>
                </Tabs.Item>

                <Tabs.Item title="Operational Information">
                  <form>
                    {/* <div className="w-full mb-2 flex justify-end">
                      <FaPen className="cursor-pointer text-sm" />
                    </div> */}
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Operational Status
                        </label>
                        <input
                          value={asset?.operational_status || ''}

                          type="text"
                          id="email"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Active"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Operational Hours
                        </label>
                        <input
                          value={asset?.operational_hours || ''}

                          type="number"
                          id="last_name"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="58 Hours"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Production Capacity
                        </label>
                        <input
                          value={asset?.production_capacity || ''}

                          type="number"
                          id="company"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="1169"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Energy Efficiency
                        </label>
                        <input
                          value={`${asset?.energy_efficiency || ''} ${asset?.energy_unit || ''}`}
                          type="number"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="210 KWh"
                          pattern=""
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Operating Conditions
                        </label>
                        <input
                          value={asset?.operating_conditions || ''}

                          type="text"
                          id="website"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="24 GWh"
                          required
                          disabled
                        />
                      </div>
                    </div>
                  </form>
                </Tabs.Item>

                <Tabs.Item title="Maintenance">
                  <div className="w-full mt-2">
                    <div className="flex justify-between items-center">
                      <SoftTypography variant="h6">Maintenance Schedule</SoftTypography>
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
                        </Icon>{" "}
                      </SoftBox>
                    </div>
                    <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-sm py-4">
                      <li className="flex flex-wrap items-center  rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Maintenance-Name-1</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-gray-100 text-gray-800 text-xs  me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 font-semibold">
                            5 July 2024
                          </span>

                          <span className="bg-blue-100 text-blue-800 text-xs me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 font-semibold">
                            12:53 PM
                          </span>

                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center 3 rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Maintenance-Name-2</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-gray-100 text-gray-800 text-xs  me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 font-semibold">
                            01 May 2024
                          </span>

                          <span className="bg-blue-100 text-blue-800 text-xs  me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 font-semibold">
                            9:00 AM
                          </span>

                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center 3 rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Maintenance-Name-3</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-gray-100 text-gray-800 text-xs  me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 font-semibold">
                            11 March 2024
                          </span>

                          <span className="bg-blue-100 text-blue-800 text-xs  me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 font-semibold">
                            02:02 AM
                          </span>

                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center 3 rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Maintenance-Name-4</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-gray-100 text-gray-800 text-xs me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 font-semibold">
                            25 April 2024
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs  me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 font-semibold">
                            04:58 PM
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </Tabs.Item>

                <Tabs.Item title="Signal and Sensor Data">
                  <div className="w-full mt-2">
                    <div className="flex justify-between items-center">
                      <SoftTypography variant="h6">Signal</SoftTypography>
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
                        </Icon>{" "}
                      </SoftBox>
                    </div>

                    <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-sm py-4">
                      <li className="flex flex-wrap items-center  rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Signal-1</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <div className="flex gap-2 items-center bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            <span className="font-semibold">Range:</span>
                            <span className="">58-97</span>
                          </div>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                            KWh
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Signal-2</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <div className="flex gap-2 items-center bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            <span className="font-semibold">Range:</span>
                            <span className="">10-20</span>
                          </div>

                          <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                            GWh
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center  rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Signal-3</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <div className="flex gap-2 items-center bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            <span className="font-semibold">Range:</span>
                            <span className="">40-80</span>
                          </div>

                          <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                            KWh
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center  rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Signal-4</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <div className="flex gap-2 items-center bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            <span className="font-semibold">Range:</span>
                            <span className="">28-50</span>
                          </div>

                          <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                            GWh
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </Tabs.Item>

                <Tabs.Item title="Support Contact Information">
                  <form>
                    {/* <div className="w-full mb-2 flex justify-end">
                      <FaPen className="cursor-pointer text-sm" />
                    </div> */}
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name
                        </label>
                        <input
                          value={asset?.supportName || ''}

                          type="text"
                          id="first_name"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Jeetendra Thakur"
                          required
                          disabled
                        />
                      </div>
                      <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Email
                        </label>
                        <input
                          value={asset?.supportEmail || ''}

                          type="email"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Jeetendrathakur321@gmail.com"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Phone Number
                        </label>
                        <input
                          value={asset?.supportPhoneNumber || ''}

                          type="text"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="9399721305"
                          required
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Company
                        </label>
                        <input
                          value={asset?.supportCompany || ''}
                          type="text"
                          className="ShowValue bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="One Piece consultancy Service"
                          required
                          disabled
                        />
                      </div>
                    </div>
                  </form>
                </Tabs.Item>

                <Tabs.Item title="Event Log">
                  <div>
                    <SoftTypography variant="h6">Event</SoftTypography>
                    <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-sm py-4">
                      {events.map(event => (
                        <li key={event.eventId} className="flex flex-wrap items-center rtl:space-x-reverse">
                          <div className="flex items-center gap-2 w-full md:w-4/6 xxl:w-3/4">
                            <FaCheck className="text-green-500" />
                            <span className="Name_Wrap">Event {event.eventId}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2 md:w-2/6 xxl:w-1/5 w-full mt-2 md:mt-0">
                            <div className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                              <span className="font-semibold">{new Date(event.incidentDateTime).toLocaleDateString()}</span>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                              {event.incidentType}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tabs.Item>

                <Tabs.Item title="Uploads">
                  <div className="w-full mt-2">
                    <div className="flex justify-between items-center">
                      <SoftTypography variant="h6">Uploads</SoftTypography>
                      {/* <SoftBox
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
                        </Icon>{" "}
                      </SoftBox> */}
                    </div>

                    <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-sm py-4">
                      <li className="flex flex-wrap items-center rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">File Name 123456</span>
                        </div>
                        <div className="flex items-center justify-start md:justify-end gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                            Jpg
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Docment Name 33333</span>
                        </div>
                        <div className="flex items-center justify-start md:justify-end gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                            Png
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center  rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Doc Name 7895</span>
                        </div>
                        <div className="flex items-center justify-start md:justify-end gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                            Jpg
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center  rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">My File Name 8888</span>
                        </div>
                        <div className="flex items-center justify-start md:justify-end gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                            Png
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </Tabs.Item>

              </Tabs>
            </SoftBox>
          </div>
        </SoftBox>
      </DashboardLayout>
    </>
  );
};
export default LibraryDetails;
