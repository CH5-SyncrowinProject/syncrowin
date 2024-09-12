import React from "react";
const SoftSelect = () => {
  return (
    <>
    <form className="max-w-sm mx-auto">
      <select
        
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option selected>Select Gender</option>
        <option value="US">Male</option>
        <option value="CA">Female</option>
        <option value="FR">Other</option>
      </select>
    </form>
    </>
  );
};

export default SoftSelect;
