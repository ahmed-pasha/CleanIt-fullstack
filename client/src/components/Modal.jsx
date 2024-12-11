const Modal = ({ show, onClose, children }) => (
  show ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
        {children}
      </div>
    </div>
  ) : null
);

export default Modal;
