import * as React from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-70">
      <div className="w-full max-w-md p-6 text-center text-black bg-white rounded-lg shadow-lg mx-4">
        <p className="mb-5 text-lg">{message}</p>
        <button
          onClick={onClose}
          className="px-5 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;