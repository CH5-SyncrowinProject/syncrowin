import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import Navigetor from "examples/Navigetor";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator, setOpenNavigetor } from "context";
import brand from "assets/images/logo-ct.png";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, openNavigetor, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [buttonPos, setButtonPos] = useState({
    config: { x: 20, y: 500 },
    nav: { x: 80, y: 500 }
  });
  const [isDragging, setIsDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  
  // Change the openNavigetor state
  const handleNavigetorOpen = () => setOpenNavigetor(dispatch, !openNavigetor);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  // Dragging logic
  const handleMouseDown = (e, buttonType) => {
    setIsDragging(buttonType);
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newPos = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };
      setButtonPos((prevPos) => ({
        ...prevPos,
        [isDragging]: newPos,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="Syncrowin"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            <SoftBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="3.5rem"
              height="3.5rem"
              bgColor="white"
              shadow="sm"
              borderRadius="50%"
              position="fixed"
              left={`${buttonPos.config.x}px`}
              top={`${buttonPos.config.y}px`}
              zIndex={99999}
              color="dark"
              sx={{ cursor: "pointer", border: '2px solid red' }}  // Debugging border
              onMouseDown={(e) => handleMouseDown(e, 'config')}
              onClick={handleConfiguratorOpen}
            >
              <Icon fontSize="default" color="inherit">
                settings
              </Icon>
            </SoftBox>
            <SoftBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="3.5rem"
              height="3.5rem"
              bgColor="white"
              shadow="sm"
              borderRadius="50%"
              position="fixed"
              left={`${buttonPos.nav.x}px`}
              top={`${buttonPos.nav.y}px`}
              zIndex={99999}
              color="dark"
              sx={{ cursor: "pointer", border: '2px solid blue' }}  // Debugging border
              onMouseDown={(e) => handleMouseDown(e, 'nav')}
              onClick={handleNavigetorOpen}
            >
              <Icon fontSize="default" color="inherit">
                bookmarks
              </Icon>
            </SoftBox>
          </>
        )}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Syncrowin"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.5rem"
            height="3.5rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            left={`${buttonPos.config.x}px`}
            top={`${buttonPos.config.y}px`}
            zIndex={99999}
            color="dark"
            sx={{ cursor: "pointer", border: '2px solid red' }}  // Debugging border
            onMouseDown={(e) => handleMouseDown(e, 'config')}
            onClick={handleConfiguratorOpen}
          >
            <Icon fontSize="default" color="inherit">
              settings
            </Icon>
          </SoftBox>
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.5rem"
            height="3.5rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            left={`${buttonPos.nav.x}px`}
            top={`${buttonPos.nav.y}px`}
            zIndex={99999}
            color="dark"
            sx={{ cursor: "pointer", border: '2px solid blue' }}  // Debugging border
            onMouseDown={(e) => handleMouseDown(e, 'nav')}
            onClick={handleNavigetorOpen}
          >
            <Icon fontSize="default" color="inherit">
              bookmarks
            </Icon>
          </SoftBox>
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </ThemeProvider>
  );
}
