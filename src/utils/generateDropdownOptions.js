const generateDropdownOptions = (options) => {
  return options.map((option, index) => {
    return (
      <option
        className="option-text"
        value={option.value}
        key={`${option.value}-${index}`}
      >
        {option.label}
      </option>
    );
  });
};

export default generateDropdownOptions;
