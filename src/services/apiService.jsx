import { loginApi, api } from "./utils/index";
import axios from "axios";

// Log the environment variable to check its value
console.log(process.env.REACT_APP_BACKEND_URL);

// Create a new Axios instance with the Azure Function backend URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use axiosInstance for all API calls
export const signUpService = async (data) => {
  try {
    const response = await axiosInstance.post('/api/signupfunction', data);  // Your API endpoint for sign-up
    return response;
  } catch (error) {
    console.error('Error in signUpService:', error.message);
    throw error;
  }
};

export const loginService = async (data) => {
  try {
    const response = await axiosInstance.post('/api/loginfunction', data);  
    return response;
  } catch (error) {
    console.error('Error in loginService:', error.message);
    throw error;
  }
};

export const fetchUsersService = async () => {
  try {
    const response = await axiosInstance.get('/user/user'); // Adjust the endpoint if necessary
    return response;
  } catch (error) {
    console.error('Error in fetchUsersService:', error.message);
    throw error;
  }
};

export const addClientService = async (data) => {
  try {
    const response = await loginApi.post('/user/register', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in addClientService:', error.message);
    throw error;
  }
};

export const passwordResetService = async (data) => {
  try {
    const response = await loginApi.post('/user/passwordReset', data, { headers });
    return response.data;

  } catch (error) {
    console.error('Error in passwordResetService:', error.message);
    return { status: false, message: error.message };
  }
};

export const userDetailService = async (data) => {
  try {
    const response = await loginApi.post('/user/userDetail', data, { headers });
    return response.data;
  }
  catch (error) {
    console.log("Error in userDetailService", error.message);
    return { status: false, message: error.message };
  }
};
export const editUserDetailService = async (data) => {
  try {
    const response = await loginApi.post('/user/editUserDetail', data, { headers });
    return response.data;
  }
  catch (error) {
    console.log("Error in editUserDetailService", error.message);
    return { status: false, message: error.message };
  }
};

export const addAssetService = async (data) => {
  try {
    const response = await loginApi.post('/library/addAsset', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in addAssetService:', error.message);
    throw error;
  }
};

// Fetch Parent Assets
export const fetchParentAssets = async (createdBy) => {
  try {
    const response = await loginApi.post('/library/getParentAssets', createdBy, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Fetch Asset Types
export const fetchAssetTypes = async () => {
  try {
    const response = await loginApi.post('/library/getAssetTypes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Tags
export const fetchAssetTags = async () => {
  try {
    const response = await loginApi.post('/library/getAssetTags');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addOperationalInfoService = async (data) => {
  try {

    const response = await loginApi.post('/library/addOperationalInfo', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in addOperationalInfoService:', error.message);
    throw error;
  }
};

export const addSupportContactService = async (data) => {
  try {

    const response = await loginApi.post('/library/addSupportContactInfo', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in addSupportContactService:', error.message);
    throw error;
  }
};

//datasource
export const datasourceService = async (data) => {
  try {

    const response = await loginApi.post('/opc/addOPC', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in datasourceService:', error.message);
    throw error;
  }
};

export const listdataService = async (data) => {
  try {
    const response = await loginApi.post('/opc/getOpc', data, { headers });
    return response.data;
  }
  catch (error) {
    console.error('Error in listdataService:', error.message);
    throw error;
  }
};

export const getvariableService = async (data) => {
  try {
    const response = await loginApi.post('/opc/getVariable', data, { headers });
    return response.data;
  }
  catch (error) {
    console.error('Error in getvariableService:', error.message);
    throw error;
  }
};

export const addVariableService = async (data) => {
  try {
    const response = await loginApi.post('/opc/addVariable', data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in addVariableService:', error.message);
    throw error;
  }
};

export const editOPCService = async (data) => {
  try {
    const response = await loginApi.post('/opc/editOpc', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in listdataService:', error.message);
    throw error;
  }
};

export const deleteOPCService = async (params) => {
  try {

    const response = await loginApi.post('/opc/deleteOpc', params, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in listdataService:', error.message);
    throw error;
  }
};

export const addEventService = async (data) => {
  try {

    const response = await loginApi.post('/library/addEvent', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in addEventService:', error.message);
    throw error;
  }
};

export const editEventService = async (data) => {
  try {

    const response = await loginApi.post('/library/editEvent', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in editEventService:', error.message);
    throw error;
  }
};

export const deleteEventService = async (data) => {
  try {

    const response = await loginApi.post('/library/deleteEvent', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in deleteEventService:', error.message);
    throw error;
  }
};

export const fetchEventsByAssetIdService = async (assetId) => {
  try {
    const response = await loginApi.post(`/library/getEvent`, { assetId }, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assetDetailService = async (payload) => {
  try {
    const response = await loginApi.post('/library/getAssetDetails', payload, { headers });
    return response.data;
  }
  catch (error) {
    throw error;
  }
};

export const deleteAssetService = async (payload) => {
  try {
    console.log(payload, "api payload");
    const response = await loginApi.delete('/library/deleteAssetById', {
      headers,
      data: payload
    });
    console.log(response, "response from api");

    return response.data;
  } catch (error) {
    console.error("Error in deleteAssetService:", error);
    throw error;
  }
};

export const childAssetDetailService = async (payload) => {
  try {
    const response = await loginApi.post('/library/getChildAssetDetails', payload, { headers });
    return response.data;
  }
  catch (error) {
    throw error;
  }
};

export const fetchAssetByIdService = async (assetId) => {

  try {
    const response = await loginApi.post('/library/getAssetById', {
      assetId // Include assetId in the request body
    }, {
      headers // Pass headers separately
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetchAssetByIdService:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const editAssetService = async (assetId, newDetails) => {
  try {
    const response = await loginApi.post(`/library/editAssetById`, { assetId, ...newDetails }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in editAssetService:', error.message);
    throw error;
  }
};

//calender
export const addmainService = async (data) => {
  try {

    const response = await loginApi.post('/library/addMaintenance', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in addEventService:', error.message);
    throw error;
  }
};

export const EditmainService = async (data) => {
  try {

    const response = await loginApi.post('/library/updateMaintenance', data, { headers });
    return response;
  }
  catch (error) {
    console.error('Error in addEventService:', error.message);
    throw error;
  }
};

export const fetchMaintenancesByAssetIdService = async (assetId) => {
  try {
    const response = await loginApi.post(`/library/getMaintenance`, { assetId }, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};