import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import logo from "../../assets/logo.svg";
import { useSoftUIController, setMiniSidenav } from "context";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const [isCollapsed, setIsCollapsed] = useState(miniSidenav);

  const toggleSidenav = () => {
    setIsCollapsed(!isCollapsed);
    setMiniSidenav(dispatch, !isCollapsed);
  };

  const closeSidenav = () => setMiniSidenav(dispatch, true);
  const designationId = localStorage.getItem('designationId');

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    // The event listener that calls the handleMiniSidenav function when resizing the window.
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes
    .filter((item) => {
      if (designationId === '1') {
        // Show everything except 'User Management'
        return item.key !== "sign-in" && item.key !== "sign-up" && item.key !== "profile" && item.key !== "editProfile" && item.key !== "forgetpassword" &&
          item.key !== "dashboardhome" && item.key !== "projectDetail" && item.key !== "ProjectAnalysis" && item.key !== "TimeSeries" && item.key !== "UserDetails" && item.key !== "datasource" && item.key !== "library" &&
          item.key !== "addlibrary" && item.key !== "libraryDetails" && item.key !== "editlibrary" && item.key !== "parentassete" && item.key !== "edituserdetails" && item.key !== "home" && item.key !== "dashboard";
      } else if (designationId === '2') {
        // Show everything except 'Client Management'
        return item.key !== "clientmanagement" && item.key !== "sign-in" && item.key !== "sign-up" && item.key !== "profile" && item.key !== "editProfile" && item.key !== "forgetpassword" &&
          item.key !== "dashboardhome" && item.key !== "projectDetail" && item.key !== "ProjectAnalysis" && item.key !== "TimeSeries" && item.key !== "UserDetails" &&
          item.key !== "addlibrary" && item.key !== "libraryDetails" && item.key !== "editlibrary" && item.key !== "parentassete" && item.key !== "edituserdetails";
      } else if (designationId === '3') {
        // Show everything except 'Client Management'
        return item.key !== "clientmanagement" && item.key !== "usermanagement" && item.key !== "sign-in" && item.key !== "sign-up" && item.key !== "profile" && item.key !== "editProfile" && item.key !== "forgetpassword" &&
          item.key !== "dashboardhome" && item.key !== "projectDetail" && item.key !== "ProjectAnalysis" && item.key !== "TimeSeries" && item.key !== "UserDetails" &&
          item.key !== "addlibrary" && item.key !== "libraryDetails" && item.key !== "editlibrary" && item.key !== "parentassete" && item.key !== "edituserdetails";
      }
      return true;
    })
    .map(({ type, name, icon, title, noCollapse, key, route, href }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <SoftTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </SoftTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }

      return returnValue;
    });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SoftTypography>
        </SoftBox>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <SoftBox component="img" src={logo} alt="Syncrowin" />
          <IconButton onClick={toggleSidenav}>
            <Icon>{isCollapsed ? "chevron_right" : "chevron_left"}</Icon>
          </IconButton>
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
