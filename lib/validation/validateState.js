const pattern = require('./pattern');

function isValueMissing(v) {
  return v.trim() === '';
}

function range(node, type) {
  const v = parseInt(node.value, 10);
  const min = parseInt(node.dataset['min'] || node.getAttribute('min'), 10);
  const max = parseInt(node.dataset['max'] || node.getAttribute('max'), 10);
  const step = parseInt(node.getAttribute('step'), 10);
  const minLength = parseInt(node.dataset['minlength'] || node.getAttribute('minlength'), 10);
  const maxLength = parseInt(node.dataset['maxlength'] || node.getAttribute('maxlength'), 10);

  if (!isValueMissing(node.value) && !isNaN(v)) {
    switch (type) {
      case 'max':
        return max ? v > max : false;
      case 'min':
        return min ? v < min : false;
      case 'maxLength':
        return maxLength ? v.length > maxLength : false;
      case 'minLength':
        return minLength ? v.length < minLength : false;
      case 'step':
        return (v - min) % step !== 0;
      default:
        return false;
    }
  }

  return false;
}

const ValidateState = {
  // TODO
  badInput: false,
  customError: node => !node.validationMessage,
  patternMismatch: node => {
    const pattern = new RegExp(`^(?:${node.getAttribute('pattern')})$`);
    return !pattern.test(node.value.trim());
  },
  rangeOverflow: node => range(node, 'max'),
  rangeUnderflow: node => range(node, 'min'),
  stepMismatch: node => range(node, 'step'),
  tooLong: node => range(node, 'maxLength'),
  tooShort: node => range(node, 'minLength'),
  typeMismatch: node => {
    const v = node.value.trim();
    const type = node.getAttribute('type');
    if (!/^(email|url)$/i.test(type)) {
      throw new Error('ValidateState: type should be email or url, use .patternMismatch() instead.');
    }
    return !pattern[type].test(v);
  },
  valueMissing: node => isValueMissing(node.value),
  valid: node => !ValidateState.valueMissing(node)
    && !ValidateState.patternMismatch(node)
    && !ValidateState.rangeOverflow(node)
    && !ValidateState.rangeUnderflow(node),
};

export default ValidateState;
