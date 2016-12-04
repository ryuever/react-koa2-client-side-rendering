
const prefixer = (className, prefix) => {
  return prefix ? `${prefix}-${className}` : className;
};

export default prefixer;
