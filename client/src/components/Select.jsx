const Select = ({ label, options, value, onChange, error }) => (
  <div className="flex flex-col">
    {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      className={`border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default Select;
