import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with smooth fade */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-lg transform rounded-2xl transition-all duration-300 animate-in fade-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -right-3 -top-3 z-10 rounded-full bg-gray-900 p-2 text-gray-400 shadow-lg ring-1 ring-gray-700 hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content Container */}
            <div className="relative overflow-hidden rounded-2xl bg-gray-800 shadow-2xl ring-1 ring-gray-700/50">
              <div className="relative p-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
