import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dropdown from "components/Dropdown";
import { FaArrowDown, FaArrowUp, FaEllipsisH, FaPen, FaTrashAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Modal from "components/Modal";
import { Dashboard } from "@mui/icons-material";
import SoftTypography from "components/SoftTypography";
import { Icon } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddDataAction } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { Checkbox, Select, Spinner, Table } from "flowbite-react";

const addDashboardFormikSchema = Yup.object({
    serverName: Yup.string().required("Server Name is required"),
    serverUrl: Yup.string().required("Server Url is required"),
});

const editFormikSchema = Yup.object({
    serverName: Yup.string().required("Server Name is required"),
    serverUrl: Yup.string().required("Server Url is required"),
})

const Datasource = () => {
    const [showEditModal, setShowModal] = useState(false);
    const [showAddModal, setAddModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const { data: dashboards } = useSelector(state => state.addData);
    // const variables = useSelector((state) => state.addData.varData);
    const { data: res } = useSelector(state => state.addData);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [showVariable, setShowVariable] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVariables, setSelectedVariables] = useState({});
    const [allSelected, setAllSelected] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState({});

    // Initial state
    const [currentVariables, setCurrentVariables] = useState([]); // Store the variables
    const [hasMore, setHasMore] = useState(true); // To track if more data is available
    const itemsPerPage = 100; // Number of items to load at once
    const [totalCount, setTotalCount] = useState(0);
    const limit = 50; // Fetch 50 items at a time
    const [offset, setOffset] = useState(0);
    // const [variables, setVariables] = useState([]);

    const variablesFromRedux = useSelector((state) => state.addData.varData); // Redux variables
    const [variables, setVariables] = useState([]); // For paginated variables
    const [filteredVariables, setFilteredVariables] = useState([]); // For search results
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        if (variablesFromRedux.length > 0) {
            setVariables((prevVariables) => [...prevVariables, ...variablesFromRedux]); // Append to the local state
        }
    }, [variablesFromRedux]); // Re-run when variablesFromRedux changes

    // Fetch data for pagination and append to existing variables
    const fetchMoreData = async (selectedEventId) => {
        console.log('Fetch More Data:', { serverId: selectedEventId, limit, offset });
        try {
            const payload = { serverId: selectedEventId, limit, offset };
            const response = await dispatch(AddDataAction.variableDataRequest(payload));

            console.log('Fetch Response:', response); // Check API response

            if (response.status) {
                const newVariables = response.data;

                // Append new variables to the existing list
                setVariables(prevVariables => [...prevVariables, ...newVariables]);

                // Update filteredVariables to include new data
                setFilteredVariables(prevFilteredVariables => [...prevFilteredVariables, ...newVariables]);

                // Update offset for the next batch if new variables were received
                if (newVariables.length > 0) {
                    setOffset(prevOffset => prevOffset + limit);
                }

                // Check if more data is available (use newVariables length here)
                if (offset + newVariables.length >= response.totalCount) {
                    setHasMore(false); // No more data to fetch
                }
            }
        } catch (error) {
            console.error("Error fetching more variables:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleActionClick = (dashboard, action) => {
        setSelectedEventId(dashboard.serverId);
        setSelectedClientId(dashboard.clientId);

        if (action === 'variable') {
            setShowVariable(true); // Open the modal
            setOffset(0); // Reset offset for fresh fetch
            setVariables([]); // Clear previous variables
            setHasMore(true); // Reset 'hasMore' flag
            fetchMoreData(dashboard.serverId); // Fetch the first batch of variables when the modal opens
        } else if (action === 'edit') {
            setShowModal(true);
        } else if (action === 'delete') {
            setShowDelete(true);
        } else {
            console.error('Unknown action:', action);
        }
    };

    const handleCloseModal = () => {
        addDashboardFormik.resetForm();  // Resets the form values
        editFormik.resetForm();
        setAddModal(false);  // Close the modal explicitly
        setShowModal(false);
        setShowDelete(false);
        setShowVariable(false);
        selectedEventId = null;
    };

    const confirmDelete = () => {
        const payload = {
            serverId: selectedEventId,
            clientId: selectedClientId
        };

        // Check if an event ID is selected before dispatching
        if (selectedEventId && selectedClientId) {
            // Dispatch the delete action
            dispatch(AddDataAction.deleteDataRequest(payload));
        }

        // Close the modal after dispatching the action
        setShowDelete(null);
        setShowDelete(false);
    };

    // Handle search functionality when searchTerm or variables change
    useEffect(() => {
        const results = variables.filter((variable) =>
            variable?.variableName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVariables(results);
    }, [searchTerm, variables]);

    const handleCheckboxChange = (variableName) => {
        setSelectedVariables((prevState) => {
            const isChecked = !prevState[variableName]; // Toggle the checkbox value
            const updatedSelectedVariables = {
                ...prevState,
                [variableName]: isChecked,
            };

            // Update header checkbox state
            const allChecked = filteredVariables.every(variable =>
                updatedSelectedVariables[variable.variableName]
            );
            setAllSelected(allChecked);

            return updatedSelectedVariables;
        });
    };

    const handleHeaderCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setAllSelected(isChecked);

        // Update all checkboxes
        const updatedSelectedVariables = {};
        filteredVariables.forEach(variable => {
            updatedSelectedVariables[variable.variableName] = isChecked;
        });
        setSelectedVariables(updatedSelectedVariables);
    };

    const handleUnitChange = (variableName, unit) => {
        setSelectedUnits((prevState) => ({
            ...prevState,
            [variableName]: unit
        }));
    };

    //List
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredDashboards = Array.isArray(dashboards) ? dashboards.filter(dashboard => {
        return (
            dashboard.serverName.toLowerCase().includes(searchQuery) ||
            dashboard.serverId.toString().includes(searchQuery)
        );
    }) : [];

    useEffect(() => {
        const clientId = localStorage.getItem('clientId');
        if (clientId) {
            const payload = { clientId };
            dispatch(AddDataAction.listDataRequest(payload));
        } else {
            console.error('Client ID not found in local storage.');
        }
    }, [dispatch]);

    const getOptions = (dashboard) => [

        {
            value: "1",
            label: (
                <span onClick={() => handleActionClick(dashboard, 'edit')} className="flex items-center">
                    <FaPen className="mr-2 text-sky-500" />
                    Edit
                </span>
            ),
        },

        {
            value: "2",
            label: (
                <span className="flex items-center" onClick={() => handleActionClick(dashboard, 'delete')}>
                    <FaTrashAlt className="mr-2 text-rose-500" />
                    Delete
                </span>
            ),
        },

    ];

    //add dashboard
    const addDashboardFormik = useFormik({
        initialValues: {
            clientId: localStorage.getItem("clientId"),
            serverName: '',
            serverUrl: '',
            contentType: '',
            userName: '',
            password: ''
        },
        validationSchema: addDashboardFormikSchema,
        onSubmit: async (values) => {
            try {
                dispatch(AddDataAction.addDataRequest(values));  // Send form data in the request
                setAddModal(false);
                addDashboardFormik.resetForm();
            } catch (error) {
                console.error('Error adding server:', error);
            }
        },
    });

    // Formik initialization
    const addFormik = useFormik({
        initialValues: {
            serverId: '', // Replace with selected serverId
            variables: [] // This will be updated on submit
        },
        onSubmit: async (values) => {
            try {
                // Prepare the variables array for submission
                const variablesArray = Object.keys(selectedVariables).map((variableName) => ({
                    variableName,
                    variableValue: selectedVariables[variableName].variableValue,
                    status: selectedVariables[variableName].status,
                    unit: selectedVariables[variableName].unit
                }));

                // Create payload for dispatch
                const payload = {
                    serverId: values.serverId, // Add selected server ID from the form
                    variables: variablesArray
                };

                console.log('Submitting variables:', payload); // Log for debugging

                // Dispatch Redux action to add variables (handled by saga)
                dispatch(AddDataAction.addVariableDataRequest(payload));

                // Reset the form and close the modal after submission
                setShowVariable(false);
                addFormik.resetForm();
            } catch (error) {
                console.error('Error adding variables:', error);
            }
        }
    });

    useEffect(() => {
        if (selectedEventId) {
            const serverToEdit = res.find(data => data.serverId === selectedEventId);
            if (serverToEdit) {
                editFormik.setValues({
                    serverId: serverToEdit.serverId,
                    clientId: serverToEdit.clientId,
                    serverName: serverToEdit.serverName,
                    serverUrl: serverToEdit.serverUrl,
                    contentType: serverToEdit.contentType,
                    userName: serverToEdit.userName,
                    password: serverToEdit.password
                });
            }
        }
    }, [res, selectedEventId]);

    //edit dashboard
    const editFormik = useFormik({
        initialValues: {
            clientId: selectedClientId,
            serverId: selectedEventId,
            serverName: '',
            serverUrl: '',
            contentType: '',
            userName: '',
            password: ''
        },
        validationSchema: editFormikSchema,
        onSubmit: async (initialValues) => {
            try {
                dispatch(AddDataAction.editDataRequest(initialValues));
                setShowModal(false);
                editFormik.resetForm();
            } catch (error) {
                console.error('Error updating server:', error);
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
                            placeholder="Search Dashboard..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            icon={{ component: "search", direction: "left" }}
                        />
                    </div>
                    <SoftBox className="w-full  md:w-fit flex justify-center md:justify-end items-center gap-3 mt-2 md:mt-0">
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
                <SoftBox my={1}>
                    {/* Comments should be placed within curly braces */}
                    <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md w-full rounded-xl bg-clip-border">
                        <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 dark:text-blue-gray-300 divide-y divide-slate-200 dark:divide-slate-600">
                            {/* Display dashboards if available */}
                            {filteredDashboards.length > 0 ? (
                                filteredDashboards.map(dashboard => (
                                    <div key={dashboard.serverId} role="button" className="flex flex-col md:flex-row items-center justify-between w-full p-3 border-gray-200 dark:border-slate-600 leading-tight">
                                        {/* Dashboard item */}
                                        <div className="flex items-center gap-2 w-full md:w-4/6 xxl:w-3/4">
                                            <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-gray-700 dark:text-blue-400 rounded-full">
                                                <Dashboard />
                                            </span>
                                            <span className="font-medium text-sm dark:text-white">S{dashboard.serverId}</span>
                                            <SoftBox onClick={() => handleActionClick(dashboard, 'variable')}>
                                                {dashboard.serverName}
                                            </SoftBox>
                                        </div>
                                        <div className="flex items-center gap-2 w-full md:w-4/6 xxl:w-3/4">
                                            <SoftBox>
                                                {dashboard.contentType}
                                            </SoftBox>
                                        </div>
                                        <div>
                                            <SoftBox>
                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                    {dashboard.serverUrl}
                                                </span>
                                            </SoftBox>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 md:w-1/4 xxl:w-1/5 w-full mt-2 md:mt-0">
                                            <span className="bg-gray-100 text-gray-500 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-300 ">
                                                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                                </svg>
                                                {moment(dashboard.dateCreated).format('DD/MM/YY')}
                                            </span>
                                            <Dropdown options={getOptions(dashboard)} buttonComponent={
                                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:focus:ring-gray-600" type="button">
                                                    <FaEllipsisH className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                                </button>
                                            } />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <SoftTypography variant="h6" align="center" color="textSecondary">
                                    No dashboards found.
                                </SoftTypography>
                            )}
                        </nav>
                    </div>
                </SoftBox>
            </SoftBox>

            <Modal
                showFooter={false}
                showModal={showAddModal}
                setAddModal={handleCloseModal}
                onClose={handleCloseModal}
                size="max-w-lg"
                title="Add Datasource"
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

                    {/* Content Type Dropdown */}
                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Connector Type
                        </SoftTypography>
                    </SoftBox>
                    <select
                        name="contentType"
                        value={addDashboardFormik.values.contentType}
                        onChange={addDashboardFormik.handleChange}
                        onBlur={addDashboardFormik.handleBlur} style={{ padding: '8px', fontSize: '14px', height: '38px' }} // Adjusted padding, font size, and height
                        className="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Connector Type</option>
                        <option value="OPC Server">OPC</option>
                        <option value="Dummy Server">Dummy Server</option>
                    </select>

                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Server URL
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

                    {/* Username */}
                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Username
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="text"
                        name="userName"
                        placeholder="Enter Username"
                        value={addDashboardFormik.values.userName}
                        onChange={addDashboardFormik.handleChange}
                        onBlur={addDashboardFormik.handleBlur}
                    />

                    {/* Password */}
                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Password
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={addDashboardFormik.values.password}
                        onChange={addDashboardFormik.handleChange}
                        onBlur={addDashboardFormik.handleBlur}
                    />

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
                showFooter={false}
                showModal={showEditModal}
                setShowModal={handleCloseModal}
                onClose={handleCloseModal}
                size="max-w-lg"
                title="Edit Datasource"
            >
                <SoftBox mb={1} component="form" role="form" onSubmit={editFormik.handleSubmit}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Server Name
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="text"
                        name="serverName"
                        placeholder="Enter Server Name"
                        value={editFormik.values.serverName}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}  // Added onBlur for validation
                    />
                    {editFormik.errors.serverName && editFormik.touched.serverName && (
                        <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">
                            {editFormik.errors.serverName}
                        </p>
                    )}

                    {/* Content Type Dropdown */}
                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Connector Type
                        </SoftTypography>
                    </SoftBox>
                    <select
                        name="contentType"
                        value={editFormik.values.contentType}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        style={{ padding: '8px', fontSize: '14px', height: '38px' }} // Adjusted padding, font size, and height
                        className="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Connector Type</option>
                        <option value="OPC Server">OPC</option>
                        <option value="Dummy Server">Dummy Server</option>
                    </select>

                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Server URL
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="text"
                        name="serverUrl"
                        placeholder="Enter Server URL"
                        value={editFormik.values.serverUrl}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}  // Added onBlur for validation
                    />
                    {editFormik.errors.serverUrl && editFormik.touched.serverUrl && (
                        <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">
                            {editFormik.errors.serverUrl}
                        </p>
                    )}

                    {/* Username */}
                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Username
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="text"
                        name="userName"
                        placeholder="Enter Username"
                        value={editFormik.values.userName}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                    />

                    {/* Password */}
                    <SoftBox mb={1} ml={0.5} mt={2}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Password
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={editFormik.values.password}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                    />

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
                showModal={showVariable}
                setShowVariable={setShowVariable}
                onClose={() => setShowVariable(false)}
                size="max-w-lg"
                title="Select Variables"
            >
                {/* Search Input */}
                <div className="px-3">
                    <div className="h-10 w-full">
                        <SoftInput
                            type="text"
                            placeholder="Search Variables..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={{ component: "search", direction: "left" }}
                        />
                    </div>
                </div>

                {/* Variables Table */}
                <div className="overflow-auto px-3 max-h-72">
                    <Table hoverable>
                        <Table.Head className="border-b">
                            <Table.HeadCell className="p-2">
                                <Checkbox
                                    checked={allSelected}
                                    onChange={handleHeaderCheckboxChange}
                                />
                            </Table.HeadCell>
                            <Table.HeadCell className="px-3 py-2">Variable</Table.HeadCell>
                            <Table.HeadCell className="px-3 py-2">Value</Table.HeadCell>
                            <Table.HeadCell className="px-3 py-2">Units</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredVariables.length > 0 ? (
                                filteredVariables.map((variable) => (
                                    <Table.Row key={variable.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="p-2">
                                            <Checkbox
                                                checked={!!selectedVariables[variable.variableName]}
                                                onChange={() => handleCheckboxChange(variable.variableName)}
                                            />
                                        </Table.Cell>
                                        <Table.Cell className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {variable.variableName}
                                        </Table.Cell>
                                        <Table.Cell className="px-3 py-2">{variable.variableValue}</Table.Cell>
                                        <Table.Cell className="px-3 py-2">
                                            <select
                                                value={selectedUnits[variable.variableName] || ''}
                                                onChange={(e) => handleUnitChange(variable.variableName, e.target.value)}
                                                className="min-w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="">Choose Units</option>
                                                <option value="Boolean">Boolean</option>
                                                <option value="Bar">Bar</option>
                                                <option value="Meter">Meter</option>
                                                <option value="Celsius">Celsius</option>
                                            </select>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan="4" className="text-center">No variables found.</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>

                {/* Submit Button */}
                <SoftBox mb={1} className="flex justify-between" mt={2}>
                    <div className="text-base">
                        {addFormik.isSubmitting && (
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        )}
                        Scanning...
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                        onClick={addFormik.handleSubmit}
                        disabled={addFormik.isSubmitting}
                    >
                        Submit
                    </button>
                </SoftBox>
            </Modal>

        </DashboardLayout>
    );
};

export default Datasource;
