const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${className}`}
  >
    {children}
  </button>
);

export default Button;

