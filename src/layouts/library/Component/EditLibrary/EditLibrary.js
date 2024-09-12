import { Divider, Grid, Icon } from "@mui/material";
import MyCalendar from "components/Calendar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Datepicker, Tabs } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft, FaCheck, FaPen, FaEye, FaEllipsisH, FaTrashAlt } from "react-icons/fa";
import Dropdown from "components/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import DummyBg from "../../../../assets/images/Dummy_Bg.jpg";
import { AssetDetailActions } from "layouts/library/reducer";
import { fetchParentAssets, fetchAssetTypes } from "../../../../services/apiService";
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { momentLocalizer } from "react-big-calendar";
import Tooltip from '@mui/material/Tooltip'; // Ensure this import is correct
import Modal from "components/Modal"
import * as Yup from "yup";
import SoftButton from "components/SoftButton";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const addEventFormikSchema = Yup.object({
  incidentType: Yup.string().required("Incident Type is required"),
});

const editEventFormikSchema = Yup.object({
  incidentType: Yup.string().required("Incident Type is required"),
});

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

const EditMaintenanceFormikSchema = Yup.object({
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

const localizer = momentLocalizer(moment);

const EditLibrary = ({ initialTags = [], savedTagOptions = [] }) => {
  const [tagOptions, setTagOptions] = useState(savedTagOptions);
  const { assetId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [parentAssets, setParentAssets] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [childCreated, setChildCreated] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [myEventsList, setMyEventsList] = useState([]);
  const [showAddcalenderEvent, setShowAddenderEvent] = useState(false);
  const [showEditcalenderEvent, setShowEditenderEvent] = useState(false);

  const dispatch = useDispatch();

  const asset = useSelector(state => state.assetDetail.asset);
  const events = useSelector(state => state.assetDetail.events);
  const Maintenances = useSelector(state => state.assetDetail.Maintenances);

  useEffect(() => {
    if (assetId) {
      dispatch(AssetDetailActions.fetchEventsByAssetIdRequest(assetId));
    }
  }, [assetId, dispatch]);

  useEffect(() => {
    if (assetId) {
      dispatch(AssetDetailActions.fetchAssetByIdRequest(assetId));
    }
  }, [assetId, dispatch]);

  const handleCloseModal = () => {
    formik.resetForm();  // Resets the form values
    setShowAddCompany(false);  // Close the modal explicitly
    setShowDescription(false);
    setShowEdit(false);
    setShowDelete(false);
  };

  const handleCloseCalenderModal = () => {
    formik.resetForm();  // Resets the form values
    setShowAddenderEvent(false);  // Close the modal explicitly
  };

  //maintenance
  useEffect(() => {
    if (assetId) {
      dispatch(AssetDetailActions.fetchMaintenancesByAssetIdRequest(assetId));
    }
  }, [assetId, dispatch]);

  useEffect(() => {
    if (asset) {
      setChildCreated(asset.childCreated);
    }
  }, [asset]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID is not available in local storage');
          return;
        }

        const payload = { createdBy: userId };

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

  useEffect(() => {
    if (selectedEventId) {
      const eventToEdit = events.find(event => event.eventId === selectedEventId);
      if (eventToEdit) {
        editEventFormik.setValues({
          assetId: eventToEdit.assetId,
          eventId: eventToEdit.eventId,
          incidentDateTime: new Date(eventToEdit.incidentDateTime),
          incidentType: eventToEdit.incidentType,
          incidentDescription: eventToEdit.incidentDescription,
        });
      }
    }
  }, [events, selectedEventId]);

  useEffect(() => {
    if (asset) {
      formik.setValues({
        assetId: asset.assetId || '',
        createdBy: userId,
        assetName: asset.assetName || '',
        manufacturer: asset.manufacturer || '',
        model: asset.model || '',
        serialNum: asset.serialNum || '',
        installationDate: asset.installationDate ? moment(asset.installationDate).format('YYYY-MM-DD') : '',
        createdDate: asset.createdDate || '',
        createdBy: asset.createdBy || '',
        location: asset.location || '',
        assetPicture: asset.assetPicture || '',
        description: asset.description || '',
        isParentAsset: asset.isParentAsset || false,
        parentAssetId: asset.parentAssetId || '',
        assetTypeId: asset.assetTypeId || '',
        assetTag: asset.assetTag || '',
        childCreated: asset.childCreated || false,
        operationalId: asset.operationalId || '',
        operational_status: asset.operational_status || '',
        operational_hours: asset.operational_hours || '',
        production_capacity: asset.production_capacity || '',
        energy_efficiency: asset.energy_efficiency || '',
        energy_unit: asset.energy_unit || '',
        operating_conditions: asset.operating_conditions || '',
        additional_specific_fields: asset.additional_specific_fields || '',
        supportId: asset.supportId || '',
        supportName: asset.supportName || '',
        supportEmail: asset.supportEmail || '',
        supportPhoneNumber: asset.supportPhoneNumber || '',
        supportCompany: asset.supportCompany || ''
      });
    }
  }, [asset, assetId]);

  const formik = useFormik({
    initialValues: {
      assetId: '',
      createdBy: userId,
      assetName: '',
      manufacturer: '',
      model: '',
      serialNum: '',
      installationDate: '',
      createdDate: '',
      createdBy: '',
      location: '',
      assetPicture: '',
      description: '',
      isParentAsset: false,
      parentAssetId: '',
      assetTypeId: '',
      assetTag: '',
      childCreated: false,
      operationalId: '',
      operational_status: '',
      operational_hours: '',
      production_capacity: '',
      energy_efficiency: '',
      energy_unit: '',
      operating_conditions: '',
      additional_specific_fields: '',
      supportId: '',
      supportName: '',
      supportEmail: '',
      supportPhoneNumber: '',
      supportCompany: ''
    },
    onSubmit: async (values) => {
      try {
        const { assetId, ...newDetails } = values;
        await dispatch(AssetDetailActions.editAssetDetail(assetId, newDetails));
        setShowEdit(false);
        //  navigate("/library");
      } catch (error) {
        console.error('Error updating asset:', error);
      }
    },
  });

  const handleDate = (date) => {
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    formik.setFieldValue('installationDate', formattedDate);
    addEventFormik.setFieldValue("incidentDateTime", formattedDate);
    editEventFormik.setFieldValue('incidentDateTime', formattedDate);
  }

  useEffect(() => {
    // Prepopulate the tag options with existing tags on edit
    if (initialTags && initialTags.length > 0) {
      const existingTags = initialTags.map(tag => ({ label: tag, value: tag }));
      setTagOptions(prevOptions => [...prevOptions, ...existingTags]);
    }
  }, [initialTags]);

  const handleTagChange = (newValue) => {
    const newTag = newValue ? newValue.value : "";
    formik.setFieldValue("assetTag", newTag);

    if (newTag && (!tagOptions || !tagOptions.some(option => option.value === newTag))) {
      setTagOptions(prevOptions => [...prevOptions, { label: newTag, value: newTag }]);
    }
  };

  //event
  const addEventFormik = useFormik({
    initialValues: {
      assetId: assetId,  // Set initial value from the URL param
      incidentDateTime: new Date(),
      incidentType: '',
      incidentDescription: ''
    },
    validationSchema: addEventFormikSchema,
    onSubmit: async (initialValues) => {
      try {
        dispatch(AssetDetailActions.editEventRequest(initialValues));  // Send form data in the request
        setShowAddCompany(false);
        addEventFormik.resetForm();
      } catch (error) {
        console.error('Error adding asset:', error);
      }
    },
  });

  useEffect(() => {
    if (Maintenances && Maintenances.length > 0) {
      const events = Maintenances.map(maintenance => {
        const startDateTimeUTC = new Date(maintenance.startDateTime);
        const endDateTimeUTC = new Date(maintenance.endDateTime);

        // Convert to local time (Asia/Kolkata)
        const startDateTimeLocal = new Date(startDateTimeUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        let endDateTimeLocal = new Date(endDateTimeUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

        // Add one day to end date to make it inclusive
        endDateTimeLocal.setDate(endDateTimeLocal.getDate() + 1);

        return {
          title: 'Maintenance',
          start: startDateTimeLocal,
          end: endDateTimeLocal,
          maintenanceid: maintenance.maintenanceId,
          Discription: maintenance.maintenanceDetails,
          StartTime: maintenance.StartTime,
          EndTime: maintenance.EndTime,
          assetId: maintenance.assetId
        };
      });

      setMyEventsList(events);
    }
  }, [Maintenances]);

  const confirmDelete = () => {
    const payload = {
      eventId: selectedEventId,
      assetId: assetId
    };

    // Check if an event ID is selected before dispatching
    if (selectedEventId) {
      // Dispatch the delete action
      dispatch(AssetDetailActions.deleteEventRequest(payload));
    }

    // Close the modal after dispatching the action
    setShowDelete(null);
    setShowDelete(false);
  };

  // console.log(selectedEventId, "selectedEventId");
  const editEventFormik = useFormik({
    initialValues: {
      assetId: assetId,  // Set initial value from the URL param
      eventId: selectedEventId,
      incidentDateTime: new Date(),
      incidentType: '',
      incidentDescription: ''
    },
    validationSchema: editEventFormikSchema,
    onSubmit: async (initialValues) => {
      // console.log(initialValues, "initial multi");
      try {
        dispatch(AssetDetailActions.multiEventRequest(initialValues));  // Send form data in the request
        setShowEdit(false);
        editEventFormik.resetForm();
      } catch (error) {
        console.error('Error adding asset:', error);
      }
    },
  });

  const handleEditClick = (event) => {
    setSelectedEventId(event.eventId);
    setShowEdit(true);
  };

  const handleDelete = (event) => {
    setSelectedEventId(event.eventId);
    setShowDelete(true);
  };

  const getOptions = (event) => [
    {
      value: "1",
      label: (
        <SoftBox className="flex items-center" onClick={() => handleEditClick(event)}>
          <FaPen className="mr-2 text-sky-500" />
          Edit
        </SoftBox>
      ),
    },
    {
      value: "2",
      label: (
        <SoftBox className="flex items-center" onClick={() => {
          setSelectedDescription(event.incidentDescription);  // Store the event description
          setShowDescription(true);  // Show the modal
        }}>
          <FaEye className="mr-2 text-emerald-500" />
          View Description
        </SoftBox>
      ),
    },
    {
      value: "3",
      label: (
        <span className="flex items-center" onClick={() => handleDelete(event)}>
          <FaTrashAlt className="mr-2 text-rose-500" />
          Delete
        </span>
      ),
    },
  ];

  //maintenance
  useEffect(() => {
    if (Maintenances && Maintenances.length > 0) {
      const events = Maintenances.map(maintenance => {
        const startDateTimeUTC = new Date(maintenance.startDateTime);
        const endDateTimeUTC = new Date(maintenance.endDateTime);

        // Convert to local time (Asia/Kolkata)
        const startDateTimeLocal = new Date(startDateTimeUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        let endDateTimeLocal = new Date(endDateTimeUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

        // Add one day to end date to make it inclusive
        endDateTimeLocal.setDate(endDateTimeLocal.getDate() + 1);

        return {
          title: 'Maintenance',
          start: startDateTimeLocal,
          end: endDateTimeLocal,
          maintenanceid: maintenance.maintenanceId,
          Discription: maintenance.maintenanceDetails,
          StartTime: maintenance.StartTime,
          EndTime: maintenance.EndTime,
          assetId: maintenance.assetId
        };
      });

      setMyEventsList(events);
    }
  }, [Maintenances]);

  const EditMaintenanceFormik = useFormik({

    initialValues: {
      assetId: "",
      maintenanceId: "",
      createdBy: localStorage.getItem("userId"),
      startDateTime: "",
      endDateTime: "",
      maintenanceDetails: "",
      StartTime: "",
      EndTime: ""
    },

    validationSchema: EditMaintenanceFormikSchema,
    onSubmit: (initialValues) => {
      console.log(initialValues, "initialValues")
      setShowEditenderEvent(false);
      //return false;
      // console.log(values, "values1111");
      dispatch(AssetDetailActions.EditMaintenanceRequest(initialValues));
    },

  });
  const addMaintenanceFormik = useFormik({

    initialValues: {
      assetId: assetId,
      createdBy: localStorage.getItem("userId"),
      startDateTime: "",
      endDateTime: "",
      maintenanceDetails: "",
      StartTime: "",
      EndTime: ""
    },

    validationSchema: addMaintenanceFormikSchema,
    onSubmit: (initialValues) => {
      //  console.log(assetId,"asetid")
      // alert("111111")
      setShowAddenderEvent(false);
      addMaintenanceFormik.resetForm();
      // console.log(values, "values1111");
      dispatch(AssetDetailActions.AddMaintenanceRequest(initialValues));
    },

  });

  const handleMainDate = (date) => {
    //  console.log("Date selected:", date);
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    addMaintenanceFormik.setFieldValue("startDateTime", formattedDate);
  };
  const handleMainEndDate = (date) => {
    // console.log("aaaaaaa",date)
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    addMaintenanceFormik.setFieldValue("endDateTime", formattedDate);
  }
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
  const handleSelectEvent = (event) => {
    console.log('Event details:', event);
    const formattedStartTime = event.StartTime ? event.StartTime.substring(0, 5) : "";
    const formattedEndTime = event.EndTime ? event.EndTime.substring(0, 5) : "";

    const formattedEndDateTime = moment(event.end).subtract(1, 'days').format("YYYY-MM-DD");

    EditMaintenanceFormik.setValues({
      createdBy: localStorage.getItem("userId"),
      startDateTime: event.start ? moment(event.start).format("YYYY-MM-DD") : "",
      endDateTime: formattedEndDateTime,
      maintenanceDetails: event.Discription || "",  // Assuming event has a description field
      StartTime: formattedStartTime,
      EndTime: formattedEndTime,
      assetId: event.assetId,
      maintenanceId: event.maintenanceid,
    });
    // console.log(formattedStartTime,formattedEndTime)
    setTime1(formattedStartTime);
    setTime2(formattedEndTime);
    setShowEditenderEvent(true);
  };
  const handleMainEditDate = (date) => {
    //  console.log("Date selected:", date);
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    EditMaintenanceFormik.setFieldValue("startDateTime", formattedDate);
  };
  const handleMainEndEditDate = (date) => {
    // console.log("aaaaaaa",date)
    const formattedDate = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : '';
    EditMaintenanceFormik.setFieldValue("endDateTime", formattedDate);
  }
  const [time3, setTime3] = useState('');
  const [time4, setTime4] = useState('');

  const onstartTimeEditChange = (event) => {
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
    EditMaintenanceFormik.setFieldValue('StartTime', dbTime);
  };

  const onendTimeEditChange = (event) => {
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
    EditMaintenanceFormik.setFieldValue('EndTime', dbTime);
  };
  const handleCloseEditCalenderModal = () => {
    setShowEditenderEvent(false);
  };

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
              <SoftTypography variant="h6"> Edit Asset </SoftTypography>
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
                          disabled={childCreated}
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
                          {parentAssets
                            .filter(asset => asset.assetName !== formik.values.assetName) // Exclude the asset with the same name
                            .map((asset) => (
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
                        onChange={formik.handleChange}
                        name="assetName"
                        value={formik.values.assetName}
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name"
                        required
                      />
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
                        name="manufacturer"
                        onChange={formik.handleChange}
                        value={formik.values.manufacturer}
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
                        name="model"
                        onChange={formik.handleChange}
                        value={formik.values.model}
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
                        name="serialNum"
                        onChange={formik.handleChange}
                        value={formik.values.serialNum}
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
                        value={formik.values.assetTag ? { label: formik.values.assetTag, value: formik.values.assetTag } : null}
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
                      {/* {formik.touched.installationDate && formik.errors.installationDate ? (
                        <div className="text-red-500 text-sm">{formik.errors.installationDate}</div>
                      ) : null} */}
                    </div>

                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Location
                      </label>
                      <input
                        onChange={formik.handleChange}
                        name="location"
                        value={formik.values.location}
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

              <Tabs.Item title="Operational Information">
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Operational Status
                      </label>
                      <select
                        onChange={formik.handleChange}
                        name="operational_status"
                        value={formik.values.operational_status}
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
                        onChange={formik.handleChange}
                        name="operational_hours"
                        value={formik.values.operational_hours}
                        type="number"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Operational Hours"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Production Capacity
                      </label>
                      <input
                        onChange={formik.handleChange}
                        name="production_capacity"
                        value={formik.values.production_capacity}
                        type="number"
                        id="company"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Production Capacity"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Energy Efficiency
                      </label>
                      <div className="relative">
                        <input
                          onChange={formik.handleChange}
                          name="energy_efficiency"
                          value={formik.values.energy_efficiency}
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Power Consumption"
                          pattern=""
                          required
                        />
                        <select
                          onChange={formik.handleChange}
                          name="energy_unit"
                          value={formik.values.energy_unit}
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
                        onChange={formik.handleChange}
                        name="operating_conditions"
                        value={formik.values.operating_conditions}
                        type="url"
                        id="website"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Energy Efficiency"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Additional specific fields
                      </label>
                      <input
                        onChange={formik.handleChange}
                        name="additional_specific_fields"
                        value={formik.values.additional_specific_fields}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={formik.handleSubmit}
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

                <SoftBox
                  onClick={() => setShowAddenderEvent(true)}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="3rem"
                  height="3rem"
                  bgColor="white"
                  shadow="sm"
                  borderRadius="50%"
                  color="dark"
                  sx={{ cursor: "pointer", marginLeft: "auto" }}  // Aligns the icon to the right
                >
                  <Icon fontSize="default" color="inherit">
                    add
                  </Icon>
                </SoftBox>


                <MyCalendar events={myEventsList} onSelectEvent={handleSelectEvent} />
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
                        id="first_name"
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
                      onClick={formik.handleSubmit}
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
                        name="supportName"
                        value={formik.values.supportName}
                        onChange={formik.handleChange}
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Name"
                        required
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        name="supportEmail"
                        value={formik.values.supportEmail}
                        onChange={formik.handleChange}
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        name="supportPhoneNumber"
                        value={formik.values.supportPhoneNumber}
                        onChange={formik.handleChange}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Company
                      </label>
                      <input
                        name="supportCompany"
                        value={formik.values.supportCompany}
                        onChange={formik.handleChange}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Company"
                        required
                      />
                    </div>
                  </div>
                </form>
                <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={formik.handleSubmit}
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

              <Tabs.Item title="Event Log">
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
                  sx={{ cursor: "pointer", marginLeft: "auto" }}  // Aligns the icon to the right
                >
                  <Icon fontSize="default" color="inherit">
                    add
                  </Icon>
                </SoftBox>

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
                            <span className="font-semibold">{new Date(event.incidentDateTime).toLocaleDateString('en-GB')}</span>
                          </div>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                            {event.incidentType}
                          </span>

                          <Dropdown
                            options={getOptions(event)}
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
                      </li>
                    ))}
                  </ul>
                </div>

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
                      <select

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={formik.handleSubmit}
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
                        <span className="font-semibold text-md text-gray-700">Serial Number:</span>
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
                        <span className="font-semibold text-md text-gray-700">Documentation:</span>
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
                        <span className="font-semibold text-md text-gray-700">Key Personnel:</span>
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
                <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={formik.handleSubmit}
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

            </Tabs>
          </SoftBox>
        </div>

        <Modal
          showFooter={false}
          showModal={showAddCompany}
          setShowModal={handleCloseModal}  // Use the new handleCloseModal function
          onClose={handleCloseModal}  // Ensure this triggers on closing
          size="max-w-lg"
          title="Multiple Event"
        >
          <SoftBox>
            <SoftBox component="form" role="form" onSubmit={addEventFormik.handleSubmit}>
              <div className="grid gap-6 mb-2 md:grid-cols-2">

                <SoftBox>
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
                </SoftBox>

                <SoftBox>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Type of Incident
                  </label>
                  <select
                    name="incidentType"
                    value={addEventFormik.values.incidentType}
                    onChange={addEventFormik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Select Type</option>
                    <option>Failure</option>
                    <option>Blockage</option>
                    <option>Fire</option>
                    <option>Other</option>
                  </select>
                  {addEventFormik.errors.incidentType && addEventFormik.touched.incidentType ? (
                    <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{addEventFormik.errors.incidentType}</p>
                  ) : null}
                </SoftBox>
              </div>

              <SoftBox>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Incident Description
                </label>
                <textarea
                  name="incidentDescription"
                  value={addEventFormik.values.incidentDescription}
                  onChange={addEventFormik.handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </SoftBox>

              <Divider />

              <div className="flex justify-end items-center p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
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

        <Modal
          showFooter={false}
          showModal={showEdit}
          setShowModal={handleCloseModal}  // Use the new handleCloseModal function
          onClose={handleCloseModal}  // Ensure this triggers on closing
          size="max-w-lg"
          title="Edit Event"
        >
          <SoftBox>
            <SoftBox component="form" role="form" onSubmit={editEventFormik.handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <SoftBox>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Date and Time of incident
                    </label>
                    <DatePicker
                      selected={editEventFormik.values.incidentDateTime ? moment(editEventFormik.values.incidentDateTime).toDate() : null}
                      onChange={handleDate}
                      dateFormat="dd/MM/yyyy"
                      className="CustomDatePicker2"
                    />
                  </div>
                </SoftBox>

                <SoftBox>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Type of Incident
                  </label>
                  <select
                    name="incidentType"
                    value={editEventFormik.values.incidentType}
                    onChange={editEventFormik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Select Type</option>
                    <option>Failure</option>
                    <option>Blockage</option>
                    <option>Fire</option>
                  </select>
                  {editEventFormik.errors.incidentType && editEventFormik.touched.incidentType ? (
                    <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{editEventFormik.errors.incidentType}</p>
                  ) : null}
                </SoftBox>
              </div>

              <SoftBox>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Incident Description
                </label>
                <textarea
                  name="incidentDescription"
                  value={editEventFormik.values.incidentDescription}
                  onChange={editEventFormik.handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </SoftBox>
              <Divider />

              {/* <pre>{JSON.stringify(addEventFormik.values, null, 2)}</pre> */}

              <div className="flex justify-end items-center p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
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

        <Modal
          showFooter={false}
          showModal={showDescription}
          setShowModal={handleCloseModal}  // Use the new handleCloseModal function
          onClose={handleCloseModal}  // Ensure this triggers on closing
          size="max-w-lg"
          title="Event Description"
        >
          <SoftBox>
            <SoftBox>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
              </div>
              <SoftBox>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Incident Description
                </label>
                <textarea
                  name="incidentDescription"
                  value={selectedDescription}
                  rows="4" readOnly
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </SoftBox>
              <Divider />
            </SoftBox>
          </SoftBox>
        </Modal>

        <Modal
          showFooter={false}
          showModal={showDelete}
          setShowModal={handleCloseModal}  // Use the new handleCloseModal function
          onClose={handleCloseModal}  // Ensure this triggers on closing
          size="max-w-lg"
          title="Confirm Deletion"
        >
          <SoftBox mb={1}>
            <SoftTypography component="label" variant="h6" fontWeight="bold">
              Are you sure you want to delete this event ?
            </SoftTypography>
          </SoftBox>
          <SoftBox display="flex" justifyContent="space-between" mt={2}>
            <SoftButton
              variant="gradient"
              color="info"
              onClick={confirmDelete} // Call confirmDelete directly
              style={{ flex: 1, border: '2px solid red' }}
            >
              Delete
            </SoftButton>
          </SoftBox>
        </Modal>

        <Modal
          showFooter={false}
          showModal={showAddcalenderEvent}
          setShowModal={handleCloseCalenderModal}  // Use the new handleCloseModal function
          onClose={handleCloseCalenderModal}  // Ensure this triggers on closing
          size="max-w-lg"
          title="Maintenance"
        >
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form" onSubmit={addMaintenanceFormik.handleSubmit}>
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
                      {addMaintenanceFormik.touched.startDateTime && addMaintenanceFormik.errors.startDateTime ? (
                        <p className="text-red-500 text-sm">{addMaintenanceFormik.errors.startDateTime}</p>
                      ) : null}
                    </div>
                    <div>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="time"
                        value={time1}
                        onChange={onstartTimeChange}
                        id="timeInput1"
                      />
                      {addMaintenanceFormik.touched.StartTime && addMaintenanceFormik.errors.StartTime ? (
                        <p className="text-red-500 text-sm">{addMaintenanceFormik.errors.StartTime}</p>
                      ) : null}
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
                      {addMaintenanceFormik.touched.endDateTime && addMaintenanceFormik.errors.endDateTime ? (
                        <p className="text-red-500 text-sm">{addMaintenanceFormik.errors.endDateTime}</p>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="time"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={time2}
                        onChange={onendTimeChange}
                        id="timeInput2"
                      />
                      {addMaintenanceFormik.touched.EndTime && addMaintenanceFormik.errors.EndTime ? (
                        <p className="text-red-500 text-sm">{addMaintenanceFormik.errors.EndTime}</p>
                      ) : null}
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
                      {addMaintenanceFormik.touched.maintenanceDetails && addMaintenanceFormik.errors.maintenanceDetails ? (
                        <p className="text-red-500 text-sm">{addMaintenanceFormik.errors.maintenanceDetails}</p>
                      ) : null}
                    </div>

                  </div>
                </div>
              </div>
              <Divider />

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

        <Modal
          showFooter={false}
          showModal={showEditcalenderEvent}
          setShowModal={handleCloseEditCalenderModal}  // Use the new handleCloseModal function
          onClose={handleCloseEditCalenderModal}  // Ensure this triggers on closing
          size="max-w-lg"
          title="Maintenance"
        >
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form" onSubmit={EditMaintenanceFormik.handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div >
                  <div className="mb-2 flex items-end gap-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Start Date
                      </label>
                      <DatePicker
                        selected={EditMaintenanceFormik.values.startDateTime ? moment(EditMaintenanceFormik.values.startDateTime).toDate() : null}
                        onChange={handleMainEditDate}
                        dateFormat="dd/MM/yyyy"
                        className="CustomDatePicker2"
                      />
                      {EditMaintenanceFormik.touched.startDateTime && EditMaintenanceFormik.errors.startDateTime ? (
                        <p className="text-red-500 text-sm">{EditMaintenanceFormik.errors.startDateTime}</p>
                      ) : null}
                    </div>
                    <div>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="time"
                        value={time1}
                        onChange={onstartTimeEditChange}
                        id="timeInput1"
                      />
                      {EditMaintenanceFormik.touched.StartTime && EditMaintenanceFormik.errors.StartTime ? (
                        <p className="text-red-500 text-sm">{EditMaintenanceFormik.errors.StartTime}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-2 flex items-end gap-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        End Date
                      </label>
                      <DatePicker
                        selected={EditMaintenanceFormik.values.endDateTime ? moment(EditMaintenanceFormik.values.endDateTime).toDate() : null}
                        onChange={handleMainEndEditDate}
                        dateFormat="dd/MM/yyyy"
                        className="CustomDatePicker2"
                      />
                      {EditMaintenanceFormik.touched.endDateTime && EditMaintenanceFormik.errors.endDateTime ? (
                        <p className="text-red-500 text-sm">{EditMaintenanceFormik.errors.endDateTime}</p>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="time"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={time2}
                        onChange={onendTimeEditChange}
                        id="timeInput2"
                      />
                      {EditMaintenanceFormik.touched.EndTime && EditMaintenanceFormik.errors.EndTime ? (
                        <p className="text-red-500 text-sm">{EditMaintenanceFormik.errors.EndTime}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-2 flex items-end gap-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                      </label>
                      <textarea
                        value={EditMaintenanceFormik.values.maintenanceDetails}
                        onChange={EditMaintenanceFormik.handleChange}
                        name="maintenanceDetails"
                        rows="4"
                        className="CustomTextArea2 block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter description here..."
                      />
                      {EditMaintenanceFormik.touched.maintenanceDetails && EditMaintenanceFormik.errors.maintenanceDetails ? (
                        <p className="text-red-500 text-sm">{EditMaintenanceFormik.errors.maintenanceDetails}</p>
                      ) : null}
                    </div>

                  </div>
                </div>
              </div>
              <Divider />

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

EditLibrary.propTypes = {
  initialTags: PropTypes.arrayOf(PropTypes.string),
  savedTagOptions: PropTypes.arrayOf(PropTypes.object),
};

export default EditLibrary;
