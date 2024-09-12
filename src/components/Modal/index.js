import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ showModal, setShowModal, showHeader = true, showFooter = true, title, children, size, onClose }) => {
  const closeModal = () => {
    if (onClose) {
      onClose();
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-9999 overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={closeModal}></div>
          <div className={`relative p-4 w-full ${size} max-h-full`}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {showHeader && (
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                  >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
              )}
              <div className="p-4 md:p-5 space-y-4">
                {children}
              </div>
              {showFooter && (
                <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  size: "max-w-6xl",
  showFooter: true,
};

export default Modal;
