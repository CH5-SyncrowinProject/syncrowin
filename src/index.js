// /**
// =========================================================
// * Soft UI Dashboard React - v4.0.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import React from "react";
// import ReactDOM from "react-dom/client";
// import './main.css'
// import { BrowserRouter } from "react-router-dom";
// import App from "App";
// import { Provider } from "react-redux"; 
// import store from "./redux/configStore";
// // Soft UI Dashboard React Context Provider
// import { SoftUIControllerProvider } from "context";
// import { NotificationContainer } from "react-notifications";
// import "react-notifications/lib/notifications.css";


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(

//   <BrowserRouter>
//     <SoftUIControllerProvider>
//       <Provider store={store}>
//       <App />
//     <NotificationContainer />
//       </Provider>
//     </SoftUIControllerProvider>
//   </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import './main.css';
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import store from "./redux/configStore";
import { SoftUIControllerProvider } from "context";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

// Backend URL
const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log("Backend URL:", backendUrl);

// Disable console output in production
if (process.env.NODE_ENV === 'production') {
  if (window) {
    window.console.log = function () { };
    window.console.warn = function () { };
    window.console.error = function () { };
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <Provider store={store}>
        <App />
        <NotificationContainer />
      </Provider>
    </SoftUIControllerProvider>
  </BrowserRouter>
);
