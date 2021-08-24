const generateOptions = (options) => {
  return options.map((option) => {
    return {
      value: option.id,
      label: option.name.charAt(0).toUpperCase() + option.name.slice(1),
    };
  });
};

const generateRoleOptions = (options) => {
  return options.map((option) => {
    return {
      value: option.id,
      label: option.role.charAt(0).toUpperCase() + option.role.slice(1),
    };
  });
};

const generateDefaultValues = (options) => {
  return options.map((option) => {
    return option.id;
  });
};

module.exports = {
  generateOptions,
  generateRoleOptions,
  generateDefaultValues,
};
