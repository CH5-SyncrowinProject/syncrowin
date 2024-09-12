import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
const HomeTable = () => {
  return (
    <div className="px-2 md:pr-6">
         <SoftTypography  className="text-start bg-theme sticky top-0" pb={1} fontWeight="medium" color="dark" >
            Dashboards
          </SoftTypography>
      <SoftBox bgColor="white" className="w-full p-6  border border-gray-200 rounded-lg  shadow-lg" mb={2}>
      <h1 className="text-2xl font-semibold text-start px-2 py-3 text-sky-950">
        Clayton Production Site
      </h1>
      <div className="overflow-auto w-full">
        <table className="table-DesignOne w-full">
          <tbody>
            <tr>
              <td>Oven A Temperature</td>
              <td>302°C</td>
              <td>15%</td>
              <td>
                <span className="text-green-500">
                  <FaArrowUp />
                </span>
              </td>
            </tr>
            <tr>
              <td>Compressor Pressure</td>
              <td>10 bar</td>
              <td>9%</td>
              <td>
                <span className="text-rose-500">
                  <FaArrowDown  />
                </span>
              </td>
            </tr>
            <tr>
              <td>Water Tank A Level</td>
              <td>2982L</td>
              <td>12%</td>
              <td>
                <span className="text-green-500">
                  <FaArrowUp />
                </span>
              </td>
            </tr>
        
            <tr>
              <td>Compressor Pressure</td>
              <td>10 bar</td>
              <td>9%</td>
              <td>
                <span className="text-rose-500">
                  <FaArrowDown  />
                </span>
              </td>
            </tr>
            <tr>
              <td>Water Tank A Level</td>
              <td>2982L</td>
              <td>12%</td>
              <td>
                <span className="text-green-500">
                  <FaArrowUp />
                </span>
              </td>
            </tr>
      
          </tbody>
        </table>
      </div>
      </SoftBox>
      <SoftBox bgColor="white" className="w-full p-6  border border-gray-200 rounded-lg  shadow-lg" mb={2}>
      <h1 className="text-2xl font-semibold text-start px-2 py-3 text-sky-950">
      Geelong production Site
      </h1>
      <div className="overflow-auto w-full">
        <table className="table-DesignOne w-full">
          <tbody>
            <tr>
              <td>Oven A Temperature</td>
              <td>302°C</td>
              <td>15%</td>
              <td>
                <span className="text-green-500">
                  <FaArrowUp />
                </span>
              </td>
            </tr>
            <tr>
              <td>Compressor Pressure</td>
              <td>10 bar</td>
              <td>9%</td>
              <td>
                <span className="text-rose-500">
                  <FaArrowDown  />
                </span>
              </td>
            </tr>
            <tr>
              <td>Water Tank A Level</td>
              <td>2982L</td>
              <td>12%</td>
              <td>
                <span className="text-green-500">
                  <FaArrowUp />
                </span>
              </td>
            </tr>
        
            <tr>
              <td>Compressor Pressure</td>
              <td>10 bar</td>
              <td>9%</td>
              <td>
                <span className="text-rose-500">
                  <FaArrowDown  />
                </span>
              </td>
            </tr>
            <tr>
              <td>Water Tank A Level</td>
              <td>2982L</td>
              <td>12%</td>
              <td>
                <span className="text-green-500">
                  <FaArrowUp />
                </span>
              </td>
            </tr>
      
          </tbody>
        </table>
      </div>
      </SoftBox>
    </div>
  );
};

export default HomeTable;
