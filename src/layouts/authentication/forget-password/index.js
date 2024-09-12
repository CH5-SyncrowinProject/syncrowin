import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
// react-router-dom components
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Checkbox from "@mui/material/Checkbox";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PasswordResetActions } from './reducer';


function ForgetPassword() {
  const dispatch = useDispatch();
  const { processing, error,otpSendingResponse,verifyOtpResponse,resetPasswordResponse } = useSelector(state => state.passwordReset);

  const [agreement, setAgreement] = useState(true);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  //const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSendOtp = () => {
    
      dispatch(PasswordResetActions.sendOtpRequest({email}));
      if(otpSendingResponse){
        handleNext();
      }
      handleNext();

  };

  const handleVerifyOtp = () => {
    
      dispatch(PasswordResetActions.verifyOtpRequest({otp}));
      if(verifyOtpResponse){
        handleNext();
      }
      handleNext();
  };

  const handleResetPassword = () => {
    if ( newPassword && confirmPassword) {
      dispatch(PasswordResetActions.resetPasswordRequest({ newPassword,confirmPassword}));
      setNewPassword('');
      setConfirmPassword('');
    } else {
      console.error('Passwords do not match or are missing');
      NotificationManager.error(error.message);
    }
  };


  const handleSuccess = () => {
    console.log('Password reset successfully');
    NotificationManager.success('Password reset successfully');
  };
   // const [confirmPassword, setConfirmPassword] = useState('');
  //const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  


  const handleSetAgreement = () => setAgreement(!agreement);
  //const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <CoverLayout>
      {step === 1 && (
        <section className="">
          <div className="w-full mx-auto mt-6 p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
            <SoftTypography variant="h4" fontWeight="bold" mb={3}>
              Forgot your password?
            </SoftTypography>
            <p className="font-light text-gray-500 text-sm">
              Dont fret! Just type in your email and we will send you a code to reset your password!
            </p>
            <SoftBox component="form" role="form">
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </SoftBox>
              <SoftBox display="flex" alignItems="center" my={2}>
                <Checkbox checked={agreement} onChange={handleSetAgreement} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgreement}
                  sx={{ cursor: "pointer", userSelect: "none" }}
                >
                  &nbsp;&nbsp;I agree to the&nbsp;
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
              <SoftButton 
                variant="gradient" 
                color="info" 
                fullWidth 
                onClick={() => {
                  if (email) handleSendOtp();
                  ;
                }} 
                disabled={!email}
              >
                Reset password
              </SoftButton>
              <SoftBox mt={3} textAlign="center">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  Back to Sign In&nbsp;
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
          </div>
        </section>
      )}
      {step === 2 && (
        <section className="">
          <div className="w-full mx-auto mt-6 p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
            <SoftTypography variant="h4" fontWeight="bold" mb={3}>
              Enter OTP
            </SoftTypography>
            <SoftBox component="form" role="form">
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    OTP
                  </SoftTypography>
                </SoftBox>
                <SoftInput 
                  type="text" 
                  placeholder="Enter the OTP" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                />
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between">
                <SoftButton variant="outlined" color="info" onClick={handleBack}>
                  Back
                </SoftButton>
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  onClick={() => {
                    if (otp) handleVerifyOtp();
                  }} 
                  disabled={!otp}
                >
                  Next
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </div>
        </section>
      )}
      {step === 3 && (
        <section className="">
          <div className="w-full mx-auto mt-6 p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
            <SoftTypography variant="h4" fontWeight="bold" mb={3}>
              Enter New Password
            </SoftTypography>
            <SoftBox component="form" role="form">
              {/* <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Old Password
                  </SoftTypography>
                </SoftBox>
                <SoftBox className="relative">
                  <SoftInput 
                    type={showOldPassword ? "text" : "password"} 
                    placeholder="Enter old password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                  />
                  <SoftBox
                    className="absolute right-2 top-3 cursor-pointer text-sm z-100 text-gray-600"
                    onClick={toggleShowOldPassword}
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </SoftBox>
                </SoftBox>
              </SoftBox> */}
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    New Password
                  </SoftTypography>
                </SoftBox>
                <SoftBox className="relative">
                  <SoftInput 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                  />
                  <SoftBox
                    className="absolute right-2 top-3 cursor-pointer text-sm z-100 text-gray-600"
                    onClick={toggleShowNewPassword}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </SoftBox>
                </SoftBox>
              </SoftBox>
              <SoftBox mb={1}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Confirm Password
                  </SoftTypography>
                </SoftBox>
                <SoftBox className="relative">
                  <SoftInput 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Enter confirm password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                  <SoftBox
                    className="absolute right-2 top-3 cursor-pointer text-sm z-100 text-gray-600"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </SoftBox>
                </SoftBox>
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between">
                <SoftButton variant="outlined" color="info" onClick={handleBack}>
                  Back
                </SoftButton>
                <SoftButton 
                  component={Link}
                  to="/sign-in"
                  variant="gradient" 
                  color="info" 
                  onClick={() => {
                    if (newPassword && confirmPassword) {
                      if (newPassword === confirmPassword) {
                        handleResetPassword();
                      } else {
                        console.error('Passwords do not match!');
                        // Handle error notification if needed
                      }
                    }
                  }}
                  disabled={!newPassword || !confirmPassword}
                >
                  Submit
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </div>
        </section>
      )}
    </CoverLayout>
  );
}

export default ForgetPassword;
