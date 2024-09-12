import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { LoginActions } from "./reducer";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, loginResponse } = useSelector((state) => state.login);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSetRememberMe = () => setRememberMe((prev) => !prev);

  const validateEmail = (val) => {
    if (!val) {
      setEmailError("Email is required");
      return false;
    }
    else if (!val.includes("@") || !val.includes(".")) {
      setEmailError("Please enter a valid email");
      return false;
    } else if (val.length < 10) {
      setEmailError("Email length should be greater than 10 characters");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (val) => {
    if (!val) {
      setPasswordError("Password is required");
      return false;
    }
    else if (val.length < 8 || val.length > 16) {
      setPasswordError("Password length should be between 8 and 16 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSignIn = (e) => {
    console.log(validateEmail(email), email);
    console.log(validatePassword(password), password);
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      dispatch(LoginActions.loginRequest({ email, password }));
    }
  };

  useEffect(() => {
    console.log("loginresponse", loginResponse);
    if (loginResponse) {
      navigate("/home");

    }
  }, [loginResponse, navigate]);

  return (
    <CoverLayout>
      <SoftBox mt={10} component="form" role="form">
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email*
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
          {emailError && (
            <span className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{emailError}</span>
          )}
        </SoftBox>
        <SoftBox mb={1}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password*
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
          />
          {passwordError && (
            <span className="mb-2 text-sm text-red-800 rounded-lg dark:text-red-400">{passwordError}</span>
          )}
        </SoftBox>
        <SoftBox display="flex" alignItems="center" justifyContent="end">
          <SoftTypography
            component={Link}
            to="/authentication/forgetpassword"
            variant="button"
            fontWeight="bold"
            textGradient
          >
            Forgot Password
          </SoftTypography>
        </SoftBox>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <SoftButton onClick={handleSignIn} variant="gradient" color="info" fullWidth>
              Sign In
            </SoftButton>
          </Grid>
          <Grid item xs={6}>
            <SoftButton
              variant="outlined" color="info"
              component={Link}
              to="/authentication/sign-up"
              fullWidth
            >
              Create Account
            </SoftButton>
          </Grid>
        </Grid>
      </SoftBox>
      <NotificationContainer />
    </CoverLayout>
  );
}

export default SignIn;

