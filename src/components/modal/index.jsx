const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
