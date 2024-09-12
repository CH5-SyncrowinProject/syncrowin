/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/
import { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Custom styles for the Configurator

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setOpenNavigetor,
 
} from "context";
import NavigetorRoot from "./NavigetorRoot";
import { FaAngleDown } from "react-icons/fa";

function Navigetor() {
  const [controller, dispatch] = useSoftUIController();
  const { openNavigetor, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseNavigetor = () => setOpenNavigetor(dispatch, false);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <NavigetorRoot variant="permanent" ownerState={{ openNavigetor }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SoftBox>
          <SoftTypography variant="h5">Quick Access Toolbar</SoftTypography>
          <SoftTypography variant="body2" color="text">
            You can quick navigate to any section
          </SoftTypography>
        </SoftBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseNavigetor}
        >
          close
        </Icon>
      </SoftBox>

      <Divider />

      <SoftBox pt={1.25} pb={3} px={3}>
        <SoftBox pb={2}>
          <SoftTypography variant="h6">Created Shortcuts</SoftTypography>

          <SoftBox mb={0.5}>
            <div className="flex flex-wrap gap-3 items-center mt-2">
              <button className="bg-white shadow-md rounded-full border border-gray-200 font-semibold px-4 py-2 text-base">
                Dashboard
              </button>
              <button className="bg-white shadow-md rounded-full border border-gray-200 font-semibold px-4 py-2 text-base">
                Home
              </button>
              <button className="bg-white shadow-md rounded-full border border-gray-200 font-semibold px-4 py-2 text-base">
                Library
              </button>         
            </div>
          </SoftBox>
        </SoftBox>

        <SoftBox mt={3} lineHeight={1} className="fixed bottom-2 right-5">
          <SoftBox
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: 2,
            }}
          >
            <SoftButton
              color="info"
              variant={transparentSidenav ? "gradient" : "outlined"}
              disabled={disabled}
              fullWidth
              sx={{
                mr: 1,
                ...sidenavTypeButtonsStyles,
              }}
            >
              Save
            </SoftButton>
            <SoftButton
              color="info"
              variant={transparentSidenav ? "outlined" : "gradient"}
              disabled={disabled}
              fullWidth
              sx={sidenavTypeButtonsStyles}
            >
              Remove
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <Divider />
        <SoftBox>
          <SoftTypography variant="h5" mt={3}>Add this Page</SoftTypography>     
        </SoftBox>
        <SoftBox mt={3} mb={2} lineHeight={1}>
          <div className="w-full mb-2">
            <SoftTypography variant="h6">Name</SoftTypography>
            <SoftBox className="flex gap-3 items-center">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 "
              placeholder="Enter shortcut name"
              required
            />
              <SoftButton
              color="info"
              variant="gradient"             
              sx={{
               
                ...sidenavTypeButtonsStyles,
              }}
            >
              Add
            </SoftButton>
            </SoftBox>
         
          </div>      
        </SoftBox>

        <Divider />
      </SoftBox>
      
    </NavigetorRoot>
  );
}

export default Navigetor;
