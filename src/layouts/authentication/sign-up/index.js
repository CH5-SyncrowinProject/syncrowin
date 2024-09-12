import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import CoverLayout from "../components/CoverLayout";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signUpSchema } from "../../../schemas/index";
import { SignupActions } from "./reducer";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, signupResponse } = useSelector((state) => state.signUp);

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
    initialValues:
    {
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
        dispatch(SignupActions.signupRequest(values));
        navigate("/sign-in");
      }
    },

  })

  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);
  useEffect(() => { }, [navigate]);

  return (
    <CoverLayout>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
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

            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={formik.handleSubmit} variant="gradient" color="info" fullWidth>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
      <NotificationContainer />
    </CoverLayout>
  );
}

export default SignUp;
