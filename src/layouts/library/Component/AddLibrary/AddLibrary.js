import { Divider, Grid } from "@mui/material";
import MyCalendar from "components/Calendar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Datepicker, Tabs } from "flowbite-react";
import { FaArrowLeft, FaCheck, FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DummyBg from "../../../../assets/images/Dummy_Bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { AddAssetActions, AddOperationalInfoActions, AddSupportContactActions, addEventActions, addMaintenanceActions } from "./reducer";
import { fetchParentAssets, fetchAssetTypes } from "../../../../services/apiService";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// Validation Schema
const validationSchema = Yup.object({
  assetName: Yup.string().required("Asset name is required"),
  assetTypeId: Yup.string().required("Asset type is required"),
  installationDate: Yup.date().required("Installation date is required"),
});

const addEventFormikSchema = Yup.object({
  incidentType: Yup.string().required("Incident Type is required"),
});

//calender
const addMaintenanceFormikSchema = Yup.object({
  startDateTime: Yup.string()
    .required("Start Date is required")
    .test(
      'startDateTime',
      'Start Date must be before End Date',
      function (value) {
        const { endDateTime } = this.parent;
        return !endDateTime || !value || new Date(value) < new Date(endDateTime);
      }
    ),
  endDateTime: Yup.string()
    .required("End Date is required")
    .test(
      'endDateTime',
      'End Date must be after Start Date',
      function (value) {
        const { startDateTime } = this.parent;
        return !startDateTime || !value || new Date(value) > new Date(startDateTime);
      }
    ),
  StartTime: Yup.string().required("StartTime is required"),
  maintenanceDetails: Yup.string().required("Description is required"),
  EndTime: Yup.string().required("EndTime is required"),
});

// Validation schema for operational information
const operationalInfoSchema = Yup.object({
  operational_status: Yup.string().required("Operational status is required"),
  operational_hours: Yup.number().required("Operational hours are required").positive("Operational hours must be positive"),
  production_capacity: Yup.number().required("Production capacity is required").positive("Production capacity must be positive"),
  energy_efficiency: Yup.number().required("Energy efficiency is required").positive("Energy efficiency must be positive"),
  energy_unit: Yup.string().required("Energy efficiency unit is required"),
  operating_conditions: Yup.string().required("Operating conditions are required"),
});

// Validation schema for signalSensors
const signalSensorSchema = Yup.object({
  signalName: Yup.string()
    .required("Signal name is required")
    .max(255, "Signal name must be at most 255 characters long"),
  unit: Yup.string()
    .required("Unit is required")
    .max(50, "Unit must be at most 50 characters long"),
  minRange: Yup.number()
    .required("Minimum range is required")
    .positive("Minimum range must be positive")
    .max(99999999.99, "Minimum range must be less than or equal to 99999999.99"),
  maxRange: Yup.number()
    .required("Maximum range is required")
    .positive("Maximum range must be positive")
    .max(99999999.99, "Maximum range must be less than or equal to 99999999.99"),
  threshold: Yup.number()
    .required("Threshold is required")
    .positive("Threshold must be positive")
    .max(99999999.99, "Threshold must be less than or equal to 99999999.99"),
  frequency: Yup.number()
    .required("Frequency is required")
    .positive("Frequency must be positive")
    .max(99999999.99, "Frequency must be less than or equal to 99999999.99"),
  frequencyUnit: Yup.string()
    .required("Frequency unit is required")
    .max(30, "Frequency unit must be at most 30 characters long"),
});

//validation schema for support_contactInfo
const supportContactInformationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(255, 'Name must be at most 255 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters long'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .max(20, 'Phone number must be at most 20 characters long'),
  company: Yup.string()
    .max(255, 'Company name must be at most 255 characters long'),
});

const AddLibrary = ({ initialTags = [] }) => {
  const [tagOptions, setTagOptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, addAssetResponse } = useSelector((state) => state.addAsset);
  const [parentAssets, setParentAssets] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [assetTags, setAssetTags] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Retrieve userId from local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID is not available in local storage');
          return;
        }

        const payload = { createdBy: userId }; // Wrap the createdBy value in an object

        // Fetch parent assets with the payload
        const parentAssetsResponse = await fetchParentAssets(payload);
        if (parentAssetsResponse.status && Array.isArray(parentAssetsResponse.data)) {
          setParentAssets(parentAssetsResponse.data);
        } else {
          setParentAssets([]);
        }

        const assetTypesResponse = await fetchAssetTypes();
        if (assetTypesResponse.status && Array.isArray(assetTypesResponse.data)) {
          setAssetTypes(assetTypesResponse.data);
        } else {
          setAssetTypes([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const formik = useFormik({
    initialValues: {
      createdBy: localStorage.getItem("userId"),
      isParentAsset: true,
      parentAssetId: "",
      assetName: "",
      assetTypeId: "",
      manufacturer: "",
      model: "",
      serialNum: "",
      assetTag: "",
      installationDate: new Date(),
      location: "",
      childCreated: "",
      assetPicture: null,
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(AddAssetActions.addAssetRequest(values));
    },
  });

  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    // Prepopulate the tag options with existing tags on edit
    if (initialTags && initialTags.length > 0) {
      const existingTags = initialTags.map(tag => ({ label: tag, value: tag }));
      setTagOptions(existingTags);
    }
  }, [initialTags]);

  const handleTagChange = (newValue) => {
    const newTag = newValue ? newValue.value : "";
    formik.setFieldValue("assetTag", newTag);

    if (newTag && (!tagOptions || !tagOptions.some(option => option.value === newTag))) {
      setTagOptions(prevOptions => [...prevOptions, { label: newTag, value: newTag }]);
    }
  };

  // Formik for operational information
  const operationalFormik = useFormik({
    initialValues: {
      createdBy: localStorage.getItem("userId"),
      assetId: localStorage.getItem("assetId"),
      operational_status: "",
      operational_hours: "",
      production_capacity: "",
      energy_efficiency: "",
      energy_unit: "",
      operating_conditions: "",
      additional_specific_fields: ""
    },
    validationSchema: operationalInfoSchema,
    onSubmit: (values) => {
      dispatch(AddOperationalInfoActions.addOperationalInfoRequest(values));
    },
  });

  // Formik for signalSenor
  const signalSensorFormik = useFormik({
    initialValues: {
      createdBy: localStorage.getItem("userId"),
      assetId: localStorage.getItem("assetId"),
      signalName: '',
      unit: '',
      minRange: '',
      maxRange: '',
      threshold: '',
      frequency: '',
      frequencyUnit: ''
    },
    validationSchema: signalSensorSchema,
    onSubmit: (values) => {
      console.log(values, "values")
    },
  });

  // Formik for support_Contact_Information
  const supportContactInformationFormik = useFormik({
    initialValues: {
      // createdBy: localStorage.getItem("userId"),
      assetId: localStorage.getItem("assetId"),
      name: '',
      email: '',
      phoneNumber: '',
      company: ''

    },
    validationSchema: supportContactInformationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      dispatch(AddSupportContactActions.addSupportContactRequest(values));

    },
  });

  const addEventFormik = useFormik({
    initialValues: {
      assetId: localStorage.getItem("assetId"),
      incidentDateTime: new Date(),
      incidentType: '',
      incidentDescription: ''
    },
    validationSchema: addEventFormikSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      dispatch(addEventActions.addEventRequest(values));
    },
  });

  const handleDate = (date) => {
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    addEventFormik.setFieldValue("incidentDateTime", formattedDate);
    formik.setFieldValue("installationDate", formattedDate);
  }

  const addMaintenanceFormik = useFormik({
    initialValues: {
      createdBy: localStorage.getItem("userId"),
      assetId: localStorage.getItem("assetId"),
      startDateTime: "2024-08-26",
      endDateTime: "2024-08-26",
      maintenanceDetails: "",
      StartTime: "",
      EndTime: ""
    },
    validationSchema: addMaintenanceFormikSchema,
    onSubmit: (values) => {
      console.log(values, "values1111");
      dispatch(addMaintenanceActions.addCalenderRequest(values));
    },
  });

  //maintenance
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');

  const onstartTimeChange = (event) => {
    const inputTime = event.target.value;
    setTime1(inputTime);

    const timeSplit = inputTime.split(':');
    let hours = parseInt(timeSplit[0], 10);
    const minutes = timeSplit[1];
    let meridian;

    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }

    const formattedTime = `${hours}:${minutes} ${meridian}`;
    //alert(formattedTime);
    console.log(formattedTime)
    let dbTime = `${('0' + hours).slice(-2)}:${minutes}`;
    if (meridian === 'PM' && hours < 12) {
      dbTime = `${hours + 12}:${minutes}`;
    } else if (meridian === 'AM' && hours === 12) {
      dbTime = `00:${minutes}`;
    }
    // Update the EndTime field in formik
    addMaintenanceFormik.setFieldValue('StartTime', dbTime);
  };

  const onendTimeChange = (event) => {
    const inputTime = event.target.value;
    setTime2(inputTime);

    const timeSplit = inputTime.split(':');
    let hours = parseInt(timeSplit[0], 10);
    const minutes = timeSplit[1];
    let meridian;

    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }

    const formattedTime = `${hours}:${minutes} ${meridian}`;

    //alert(formattedTime);
    console.log(formattedTime)
    let dbTime = `${('0' + hours).slice(-2)}:${minutes}`;
    if (meridian === 'PM' && hours < 12) {
      dbTime = `${hours + 12}:${minutes}`;
    } else if (meridian === 'AM' && hours === 12) {
      dbTime = `00:${minutes}`;
    }
    console.log(dbTime, "dbtime")
    // Update the EndTime field in formik
    addMaintenanceFormik.setFieldValue('EndTime', dbTime);
  };

  const handleMainDate = (date) => {
    console.log("Date selected:", date);
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    addMaintenanceFormik.setFieldValue("startDateTime", formattedDate);
  };
  const handleMainEndDate = (date) => {
    console.log("aaaaaaa", date)
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    addMaintenanceFormik.setFieldValue("endDateTime", formattedDate);
  }

  return (
    <>
      <DashboardLayout>
        <div className="bg-white shadow-md w-full rounded-xl bg-clip-border p-4 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <SoftBox>
            <SoftBox
              component={Link}
              to="/library"
              className="flex items-center gap-2  mb-3 cursor-pointer"
            >
              <FaArrowLeft />
              <SoftTypography variant="h6"> Add Asset </SoftTypography>
            </SoftBox>
            <Tabs aria-label="Default tabs" variant="default">
              <Tabs.Item active title="General Information">
                <form>
                  <div className="grid mb-2 md:grid-cols-2">
                    <div>
                      <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <input
                          type="checkbox"
                          name="isParentAsset"
                          checked={!formik.values.isParentAsset}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            formik.setFieldValue("isParentAsset", !isChecked);  // Reverse the logic
                            if (!isChecked) {
                              formik.setFieldValue("parentAssetId", "");  // Clear parentAssetId if unchecked
                            }
                          }}
                        // disabled={formik.values.parentAssetId}
                        />
                        Parent Assets
                      </label>
                      {!formik.values.isParentAsset && ( // Conditionally render the dropdown
                        <select
                          id="parentAssetId"
                          name="parentAssetId"
                          onChange={(e) => {
                            formik.handleChange(e);
                            const selectedAssetId = e.target.value;
                            if (selectedAssetId) {
                              formik.setFieldValue("parentAssetId", selectedAssetId);
                              formik.setFieldValue("isParentAsset", false);  // Set isParentAsset to false
                            }
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.parentAssetId}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="" disabled selected>Choose Parent Assets</option>
                          {parentAssets.map((asset) => (
                            <option key={asset.assetId} value={asset.assetId}>
                              {asset.assetName}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                      </label>
                      <input
                        name="assetName"
                        value={formik.values.assetName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name"
                        required
                      />
                      {formik.touched.assetName && formik.errors.assetName ? (
                        <p className="text-red-500 text-sm">{formik.errors.assetName}</p>
                      ) : null}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Type
                      </label>
                      <select
                        value={formik.values.assetTypeId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="assetTypeId"
                        name="assetTypeId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Choose Asset Type</option>
                        {assetTypes.map((type) => (
                          <option key={type.assetTypeId} value={type.assetTypeId}>
                            {type.assetTypeName}
                          </option>
                        ))}
                      </select>
                      {formik.touched.assetTypeId && formik.errors.assetTypeId ? (
                        <p className="text-red-500 text-sm">{formik.errors.assetTypeId}</p>
                      ) : null}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Manufacturer
                      </label>
                      <input
                        value={formik.values.manufacturer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="manufacturer"
                        type="text"
                        id="company"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Manufacturer"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Model
                      </label>
                      <input
                        value={formik.values.model}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="model"
                        type="text"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Model"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Serial Number
                      </label>
                      <input
                        value={formik.values.serialNum}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="serialNum"
                        type="url"
                        id="website"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Serial Number"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tags
                      </label>
                      <CreatableSelect
                        isClearable
                        value={
                          formik.values.assetTag
                            ? { label: formik.values.assetTag, value: formik.values.assetTag }
                            : null
                        }
                        onChange={handleTagChange}
                        options={tagOptions}
                        placeholder="Enter or select asset tag"
                        className="customTagSelect"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Installation Date
                      </label>
                      <DatePicker
                        selected={formik.values.installationDate ? moment(formik.values.installationDate).toDate() : null}
                        onChange={handleDate}
                        dateFormat="dd/MM/yyyy"
                        className="CustomDatePicker2"
                      />
                      {formik.touched.installationDate && formik.errors.installationDate ? (
                        <div className="text-red-500 text-sm">{formik.errors.installationDate}</div>
                      ) : null}
                    </div>

                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Location
                      </label>
                      <input
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="location"
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                      />
                    </div>

                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Photo
                      </label>
                      <input
                        name="assetPicture"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "assetPicture",
                            event.currentTarget.files[0]
                          );
                        }}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                      />
                    </div>

                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                      ></textarea>
                    </div>

                  </div>

                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={formik.handleSubmit}
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Tabs.Item>

              <Tabs.Item title="Operational Information">
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Operational Status
                      </label>
                      <select
                        name="operational_status"
                        value={operationalFormik.values.operational_status}
                        onChange={operationalFormik.handleChange}
                        onBlur={operationalFormik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Select Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Maintenance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Operational Hours
                      </label>
                      <input
                        name="operational_hours"
                        value={operationalFormik.values.operational_hours}
                        onChange={operationalFormik.handleChange}
                        onBlur={operationalFormik.handleBlur}
                        type="number"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Operational Hours"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Production Capacity
                      </label>
                      <input
                        name="production_capacity"
                        value={operationalFormik.values.production_capacity}
                        onChange={operationalFormik.handleChange}
                        onBlur={operationalFormik.handleBlur}
                        type="number"
                        id="company"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Production Capacity"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Energy Efficiency
                      </label>
                      <div className="relative">
                        <input
                          name="energy_efficiency"
                          value={operationalFormik.values.energy_efficiency}
                          onChange={operationalFormik.handleChange}
                          onBlur={operationalFormik.handleBlur}
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Power Consumption"
                          pattern=""
                        />
                        <select
                          name="energy_unit"
                          value={operationalFormik.values.energy_unit}
                          onChange={operationalFormik.handleChange}
                          onBlur={operationalFormik.handleBlur}
                          className="absolute right-8 top-1 text-xs text-gray-600 border border-gray-100 rounded-full shadow-sm">
                          <option>select unit</option>
                          <option>KWh</option>
                          <option>GWh</option>
                          <option>%</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Operating Conditions
                      </label>
                      <input
                        name="operating_conditions"
                        value={operationalFormik.values.operating_conditions}
                        onChange={operationalFormik.handleChange}
                        onBlur={operationalFormik.handleBlur}
                        type="url"
                        id="website"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Energy Efficiency"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Additional specific fields
                      </label>
                      <input
                        name="additional_specific_fields"
                        value={operationalFormik.values.additional_specific_fields}
                        onChange={operationalFormik.handleChange}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={operationalFormik.handleSubmit}

                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Tabs.Item>

              <Tabs.Item title="Maintenance">

                <form>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div >
                      <div className="mb-2 flex items-end gap-2">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Start Date
                          </label>
                          <DatePicker
                            selected={addMaintenanceFormik.values.startDateTime ? moment(addMaintenanceFormik.values.startDateTime).toDate() : null}
                            onChange={handleMainDate}
                            dateFormat="dd/MM/yyyy"
                            className="CustomDatePicker2"
                          />
                        </div>
                        <div>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="time"
                            value={time1}
                            onChange={onstartTimeChange}
                            id="timeInput1"
                          />
                        </div>
                      </div>
                      <div className="mb-2 flex items-end gap-2">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            End Date
                          </label>
                          <DatePicker
                            selected={addMaintenanceFormik.values.endDateTime ? moment(addMaintenanceFormik.values.endDateTime).toDate() : null}
                            onChange={handleMainEndDate}
                            dateFormat="dd/MM/yyyy"
                            className="CustomDatePicker2"
                          />
                        </div>
                        <div>
                          <input
                            type="time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={time2}
                            onChange={onendTimeChange}
                            id="timeInput2"
                          />
                        </div>
                      </div>

                      <div className="mb-2 flex items-end gap-2">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                          </label>
                          <textarea
                            value={addMaintenanceFormik.values.maintenanceDetails}
                            onChange={addMaintenanceFormik.handleChange}
                            name="maintenanceDetails"
                            rows="4"
                            className="CustomTextArea2 block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter description here..."
                          />
                        </div>

                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={addMaintenanceFormik.handleSubmit}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>


                </form>
              </Tabs.Item>

              <Tabs.Item title="Signal and Sensor Data">
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Signal
                      </label>
                      <input
                        type="text"
                        id="signalName"
                        name="signalName"
                        value={signalSensorFormik.values.signalName}
                        onChange={signalSensorFormik.handleChange}
                        onBlur={signalSensorFormik.handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Signal"
                        required
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Unit
                      </label>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Select unit</option>
                        <option>Electric current</option>
                        <option>Time </option>
                        <option>uminous intensity</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Range
                      </label>
                      <div className="flex w-full gap-4 items-center">
                        <input
                          type="number"
                          placeholder="min"
                          className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="max"
                          className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Thresholds
                      </label>
                      <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Frequency
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Power Consumption"
                          pattern=""
                          required
                        />
                        <select className="absolute right-8 top-1 text-xs text-gray-600 border border-gray-100 rounded-full shadow-sm">
                          <option>select unit</option>
                          <option>seconds</option>
                          <option>minutes</option>
                          <option>hertz</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="w-full mt-2">
                    <SoftTypography variant="h6">Signal</SoftTypography>

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
                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Tabs.Item>

              <Tabs.Item title="Support Contact Information">
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                      </label>
                      <input
                        name="name"
                        value={supportContactInformationFormik.values.name}
                        onChange={supportContactInformationFormik.handleChange}
                        onBlur={supportContactInformationFormik.handleBlur}
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Name"
                        required
                      />
                      {supportContactInformationFormik.touched.name && supportContactInformationFormik.errors.name ? (
                        <p className="text-red-500 text-sm">{supportContactInformationFormik.errors.name}</p>
                      ) : null}
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        name="email"
                        value={supportContactInformationFormik.values.email}
                        onChange={supportContactInformationFormik.handleChange}
                        onBlur={supportContactInformationFormik.handleBlur}
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Email"
                        required
                      />
                      {supportContactInformationFormik.touched.email && supportContactInformationFormik.errors.email ? (
                        <p className="text-red-500 text-sm">{supportContactInformationFormik.errors.email}</p>
                      ) : null}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        name="phoneNumber"
                        value={supportContactInformationFormik.values.phoneNumber}
                        onChange={supportContactInformationFormik.handleChange}
                        onBlur={supportContactInformationFormik.handleBlur}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Number"
                        required
                      />
                      {supportContactInformationFormik.touched.phoneNumber && supportContactInformationFormik.errors.phoneNumber ? (
                        <p className="text-red-500 text-sm">{supportContactInformationFormik.errors.phoneNumber}</p>
                      ) : null}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Company
                      </label>
                      <input
                        name="company"
                        value={supportContactInformationFormik.values.company}
                        onChange={supportContactInformationFormik.handleChange}
                        onBlur={supportContactInformationFormik.handleBlur}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Company"
                        required
                      />
                      {supportContactInformationFormik.touched.phoneNumber && supportContactInformationFormik.errors.phoneNumber ? (
                        <p className="text-red-500 text-sm">{supportContactInformationFormik.errors.phoneNumber}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={supportContactInformationFormik.handleSubmit}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Tabs.Item>

              <Tabs.Item title="Event Log">
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Date and Time of incident
                      </label>
                      <DatePicker
                        selected={addEventFormik.values.incidentDateTime ? moment(addEventFormik.values.incidentDateTime).toDate() : null}
                        onChange={handleDate}
                        dateFormat="dd/MM/yyyy"
                        className="CustomDatePicker2"
                      />
                    </div>

                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Type of Incident
                      </label>
                      <select name="incidentType" value={addEventFormik.values.incidentType} onChange={addEventFormik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Select Type</option>
                        <option>Faliure</option>
                        <option>Blockage</option>
                        <option>Fire</option>
                      </select>
                      {addEventFormik.touched.incidentType && addEventFormik.errors.incidentType ? (
                        <p className="text-red-500 text-sm">{addEventFormik.errors.incidentType}</p>
                      ) : null}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Incident Description
                      </label>
                      <textarea
                        name="incidentDescription"
                        value={addEventFormik.values.incidentDescription}
                        onChange={addEventFormik.handleChange}
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                      ></textarea>
                    </div>

                  </div>
                  <Divider />

                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={addEventFormik.handleSubmit}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* <div className="w-full mt-2">
                    <SoftTypography variant="h6">Event</SoftTypography>

                    <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-sm py-4">
                      <li className="flex flex-wrap items-center rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Event-1</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <div className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            <span className="font-semibold">5 July 2024</span>
                          </div>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                            Faliure
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Event-2</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <div className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            <span className="font-semibold">28 May 2024</span>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Fire
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                      <li className="flex flex-wrap items-center rtl:space-x-reverse">
                        <div className="flex items-center gap-2 w-full md:w-4/6  xxl:w-3/4">
                          <FaCheck className="text-green-500" />
                          <span className="Name_Wrap">Event-3</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:w-2/6  xxl:w-1/5 w-full mt-2 md:mt-0">
                          <div className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            <span className="font-semibold">15 June 2024</span>
                          </div>
                          <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                            Blockage
                          </span>
                          <FaPen className="cursor-pointer" />
                        </div>
                      </li>
                    </ul>
                  </div> */}

                </form>
              </Tabs.Item>

              <Tabs.Item title="Uploads">
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Document Upload
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Type
                      </label>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Select Type</option>
                        <option>option-1</option>
                        <option>option-2</option>
                        <option>option-3</option>
                      </select>
                    </div>
                  </div>
                  <Divider />
                  <div className="w-full mt-2">
                    <SoftTypography variant="h6">Uploaded Document</SoftTypography>

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
                </form>
                <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </Tabs.Item>

              <Tabs.Item title="Review All Information">
                <div className="max-h-96 overflow-y-auto">
                  <SoftTypography
                    variant="h5"
                    className="text-start py-2 border-t-2 border-gray-200"
                    mt={1}
                    fontWeight="medium"
                    color="dark"
                  >
                    General Information
                  </SoftTypography>
                  <SoftBox className="flex flex-col md:flex-row gap-2 text-base ">
                    <div className="basis-full md:basis-1/3 h-48 object-cover">
                      <img src={DummyBg} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div className="basis-full md:basis-8/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Name:</span>
                        <span className=" text-md text-gray-400">Dummy_Name</span>
                      </SoftBox>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Type:</span>
                        <span className=" text-md text-gray-400">Motor</span>
                      </SoftBox>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Manufacturer:</span>
                        <span className=" text-md text-gray-400">TaTa Motors</span>
                      </SoftBox>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Model:</span>
                        <span className=" text-md text-gray-400">Apple Pro 15</span>
                      </SoftBox>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Serial Number:
                        </span>
                        <span className=" text-md text-gray-400">1245369875</span>
                      </SoftBox>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Installation Date:
                        </span>
                        <span className=" text-md text-gray-400">22 DEC 7:20 PM</span>
                      </SoftBox>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Description:</span>
                        <span className=" text-md text-gray-400">Lorem ipsum dolor eget </span>
                      </SoftBox>
                    </div>
                  </SoftBox>

                  <SoftTypography
                    variant="h5"
                    className="text-start py-2 border-t-2 border-gray-200"
                    mt={1}
                    fontWeight="medium"
                    color="dark"
                  >
                    Operational Information
                  </SoftTypography>
                  <Grid className="text-base" container>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Operational Status:
                        </span>
                        <span className=" text-md text-gray-400">Active</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Operational Hours:
                        </span>
                        <span className=" text-md text-gray-400">24 Hours</span>
                      </SoftBox>
                    </Grid>

                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Production Capacity:
                        </span>
                        <span className=" text-md text-gray-400">--</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Power Consumption:
                        </span>
                        <span className=" text-md text-gray-400">--</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Energy Efficiency:
                        </span>
                        <span className=" text-md text-gray-400">--</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Operating Conditions:
                        </span>
                        <span className=" text-md text-gray-400">jdsjdhsidhi</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">File Name:</span>
                        <span className=" text-md text-gray-400">efefhefuhuh</span>
                      </SoftBox>
                    </Grid>
                  </Grid>
                  <SoftTypography
                    variant="h5"
                    className="text-start py-2 border-t-2 border-gray-200"
                    mt={1}
                    fontWeight="medium"
                    color="dark"
                  >
                    Maintenance
                  </SoftTypography>
                  <Grid className="text-base" container>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Maintenance Schedule:
                        </span>
                        <span className=" text-md text-gray-400">kssjwwi</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Documentation:
                        </span>
                        <span className=" text-md text-gray-400">diyywoa</span>
                      </SoftBox>
                    </Grid>

                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Records:</span>
                        <span className=" text-md text-gray-400">--</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Tags:</span>
                        <span className=" text-md text-gray-400">--</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Date Created:</span>
                        <span className=" text-md text-gray-400">01 july 2024</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">File Upload:</span>
                        <span className=" text-md text-gray-400">jdsjdhsidhi</span>
                      </SoftBox>
                    </Grid>
                  </Grid>
                  <SoftTypography
                    variant="h5"
                    className="text-start py-2 border-t-2 border-gray-200"
                    mt={1}
                    fontWeight="medium"
                    color="dark"
                  >
                    Signal and Sensor Data
                  </SoftTypography>
                  <Grid className="text-base" container>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Signal:</span>
                        <span className=" text-md text-gray-400">dummy</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Unit:</span>
                        <span className=" text-md text-gray-400">File name ifjidfjid</span>
                      </SoftBox>
                    </Grid>

                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Range:</span>
                        <span className=" text-md text-gray-400">400</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Thresholds:</span>
                        <span className=" text-md text-gray-400">--</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Frequency:</span>
                        <span className=" text-md text-gray-400">2dummy</span>
                      </SoftBox>
                    </Grid>
                  </Grid>
                  <SoftTypography
                    variant="h5"
                    className="text-start py-2 border-t-2 border-gray-200"
                    mt={1}
                    fontWeight="medium"
                    color="dark"
                  >
                    Administrative Information
                  </SoftTypography>
                  <Grid className="text-base" container>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Contact Information:
                        </span>
                        <span className=" text-md text-gray-400">--</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">
                          Key Personnel:
                        </span>
                        <span className=" text-md text-gray-400">eeee</span>
                      </SoftBox>
                    </Grid>

                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Tags:</span>
                        <span className=" text-md text-gray-400">tag-1</span>
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                      <SoftBox my={1} className="flex items-start gap-3">
                        <span className="font-semibold text-md text-gray-700">Date Created:</span>
                        <span className=" text-md text-gray-400">28 june 2024</span>
                      </SoftBox>
                    </Grid>
                  </Grid>
                </div>
              </Tabs.Item>

            </Tabs>

          </SoftBox>
        </div>
      </DashboardLayout>
    </>
  );
};

AddLibrary.propTypes = {
  initialTags: PropTypes.arrayOf(PropTypes.string),
};

export default AddLibrary;
