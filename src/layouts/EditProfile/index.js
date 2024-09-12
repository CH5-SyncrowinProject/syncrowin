import { Card, Divider, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
// react-router-dom components
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditProfileActions } from "./reducer";
import { ProfileActions } from "../profile/reducer";
import { useFormik } from "formik";
import * as Yup from "yup";


const EditProfile = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const { user, loading, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (userId) {
      dispatch(ProfileActions.getUserDetailsRequest({ userId }));
    } else {
      NotificationManager.error('UserId not found');
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      formik.setValues({
        userId: userId,
        firstName: user.data.firstName || '',
        designation: user.data.designation || '',
        email: user.data.email || '',
        company: user.data.company || '',
        phone: user.data.phone || '',
        profilePicture: user.data.profilePicture || '',
        companyAddress: user.data.companyAddress || '',
        industry: user.data.industry || '',
        streetAddress: user.data.streetAddress || '',
        city: user.data.city || '',
        state: user.data.state || '',
        country: user.data.country || '',
        postalCode: user.data.postalCode || '',
        preferredLanguage: user.data.preferredLanguage || '',
        communicationPreference: user.data.communicationPreference || '',
      });
    }
  }, [user, userId]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    company: Yup.string().required("Company name is required"),
    companyAddress: Yup.string().required("Company address is required"),
    industry: Yup.string().required("Industry is required"),
    streetAddress: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    preferredLanguage: Yup.string().required("Preferred language is required"),
    communicationPreference: Yup.string().required("Communication preference is required"),
  });

  const formik = useFormik({
    initialValues: {
      userId: userId || '',
      firstName: '',
      designation: '',
      email: '',
      company: '',
      phone: '',
      profilePicture: '',
      companyAddress: '',
      industry: '',
      streetAddress: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      preferredLanguage: '',
      communicationPreference: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // Remove fields with null or empty values
      const filteredData = {};
      for (const key in values) {
        if (values[key] !== null && values[key] !== '') {
          filteredData[key] = values[key];
        }
      }
      try {
        await dispatch(EditProfileActions.updateProfileRequest(filteredData));
        console.log('Profile update successful', filteredData);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  });

  return (

    <DashboardLayout>
      <Header />
      <SoftBox mb={3} mt={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <div className="flex items-center gap-2  mb-3">
                {" "}
                <Link to="/profile">
                  {" "}
                  <FaArrowCircleLeft className="cursor-pointer" />
                </Link>{" "}
                <SoftTypography variant="h6" fontWeight="medium">
                  Edit Profile
                </SoftTypography>
              </div>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <form onSubmit={formik.handleSubmit}>

              <SoftBox>
                <SoftTypography variant="button" fontWeight="medium" color="text">
                  Personal Information
                </SoftTypography>
              </SoftBox>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Name
                    </SoftTypography>
                    <SoftInput
                      type="text"
                      placeholder="Name"
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.firstName}</p>
                    )}

                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Email
                    </SoftTypography>
                    <SoftInput type="email" placeholder="Email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.email}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Phone Number
                    </SoftTypography>
                    <SoftInput type="number" placeholder="Phone Number"
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.phone}</p>)}
                  </SoftBox>

                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Profile Picture
                    </SoftTypography>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      name="profilePicture"
                      onChange={formik.handleChange}
                    />
                    {formik.touched.profilePicture && formik.errors.profilePicture && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.profilePicture}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Job Title
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Job Title"
                      name="designation"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.designation}
                    />
                    {formik.touched.designation && formik.errors.designation && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.designation}</p>
                    )}
                  </SoftBox>
                </Grid>
              </Grid>
              <Divider />
              <SoftBox>
                <SoftTypography variant="button" fontWeight="medium" color="text">
                  Company Information
                </SoftTypography>
              </SoftBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Company Name
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Company Name"
                      name="company"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company}
                    />
                    {formik.touched.company && formik.errors.company && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.company}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Company Address
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Company Address"
                      name="companyAddress"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.companyAddress}
                    />
                    {formik.touched.companyAddress && formik.errors.companyAddress && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.companyAddress}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Position
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Role/Position" />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Industry
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Industry"
                      name="industry"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.industry}
                    />
                    {formik.touched.industry && formik.errors.industry && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.industry}</p>
                    )}


                  </SoftBox>
                </Grid>
              </Grid>
              <Divider />
              <SoftBox>
                <SoftTypography variant="button" fontWeight="medium" color="text">
                  Address Information
                </SoftTypography>
              </SoftBox>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Street Address
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Street Address"
                      name="streetAddress"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.streetAddress}
                    />
                    {formik.touched.streetAddress && formik.errors.streetAddress && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.streetAddress}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      City
                    </SoftTypography>
                    <SoftInput type="text" placeholder="City"
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.city}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      State
                    </SoftTypography>
                    <SoftInput type="text" placeholder="State/Province/Region"
                      name="state"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.state}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.state}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Zip
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Zip/Postal Code"
                      name="postalCode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.postalCode}
                    />
                    {formik.touched.postalCode && formik.errors.postalCode && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.postalCode}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Country
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Country"
                      name="country"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.country}</p>
                    )}
                  </SoftBox>
                </Grid>
              </Grid>
              <Divider />
              {/* <SoftBox>
                <SoftTypography variant="button" fontWeight="medium" color="text">
                  Preferences
                </SoftTypography>
              </SoftBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Preferred Language
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Preferred Language"
                      name="preferredLanguage"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.preferredLanguage}
                    />
                    {formik.touched.preferredLanguage && formik.errors.preferredLanguage && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.preferredLanguage}</p>
                    )}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <SoftBox>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Communication Preferences
                    </SoftTypography>
                    <SoftInput type="text" placeholder="Communication Preferences"
                      name="communicationPreference"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.communicationPreference}
                    />
                    {formik.touched.communicationPreference && formik.errors.communicationPreference && (
                      <p className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{formik.errors.communicationPreference}</p>
                    )}
                  </SoftBox>
                </Grid>
              </Grid> */}
              {/* <Divider /> */}
              <Grid container spacing={3}>
                <Grid className="flex gap-3 items-center justify-end" item xs={12}>
                  <SoftButton color="info" variant="gradient" onClick={formik.handleSubmit} >
                    Save
                  </SoftButton>
                  <SoftButton color="info" variant="outlined">
                      <Link to="/profile">
                    Resume
                    </Link>
                  </SoftButton>
                </Grid>
              </Grid>
            </form>

          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
};

export default EditProfile;


