// export default Dropdown;
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, buttonComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Set up event listener for clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clonedButtonComponent = React.cloneElement(buttonComponent, {
    onClick: toggleDropdown,
  });

  return (
    <div className="dropdown relative" ref={dropdownRef}>
      {clonedButtonComponent}
      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 right-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow min-w-44 w-max dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  buttonComponent: PropTypes.element.isRequired,
};

export default Dropdown;
