import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-4">Page Under Development</h2>
        <p>This page is currently in development. Please check back later!</p>
        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
