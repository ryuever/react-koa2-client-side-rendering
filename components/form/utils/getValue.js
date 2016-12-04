import { isBlank } from 'lib/lang';

const getSelectedValues = (options) => {
  const ret = [];

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (option.selected) {
      ret.push(option.value);
    }
  }

  return ret;
};

const getValue = (event) => {
  if (!(event.preventDefault && event.stopPropagation)) {
    if (event && typeof event === 'object' && isBlank(event.value)) {
      return event.value;
    }

    return event;
  }

  const {
    target: {
      type,
      value,
      checked,
      files,
      options,
    },
    dataTransfer,
  } = event;

  if (type === 'checkbox') {
    return checked;
  }

  if (type === 'file') {
    if (dataTransfer) {
      return dataTransfer.files;
    }
    return files;
  }

  if (type === 'number' || type === 'range') {
    return parseFloat(value);
  }

  if (type === 'select-multiple') {
    return getSelectedValues(options);
  }

  return value;
};

export default getValue;
