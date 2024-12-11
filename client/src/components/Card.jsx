const Card = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
    {children}
  </div>
);

export default Card;
