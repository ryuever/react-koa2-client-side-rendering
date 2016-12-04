import validEmail from './email';
import validPassword from './password';
import validateState from './validateState';
import * as pattern from './pattern';

const res = {
  valid: true,
  message: null,
};

export const email = (input) => {
  validEmail.MAILGUN_KEY = null;
  return validEmail(input.value);
};

export const password = (input) => {
  return validPassword(input.value);
};

export const url = (input) => {
  return new Promise((resolve) => {
    return pattern.url.test(input.value) ? resolve(res) : resolve({
      valid: false,
      message: '请输入正确的网址',
    });
  });
};

export const tel = (input) => {
  return new Promise((resolve) => {
    return pattern.mobile.test(input.value) ? resolve(res) : resolve({
      valid: false,
      message: '请输入正确的手机号',
    });
  });
};

export const field = (input, state) => {
  const invalid = input.validity ? input.validity[state] : validateState[state](input);
  return new Promise((resolve) => {
    return !invalid ? resolve(res) : resolve({
      valid: !invalid,
      message: dataset(input, state),
    });
  });
};

/**
  <input type="text" required pattern="1|2"
    data-value-missing-message="不能为空"
    data-pattern-mismatch-message="只能输入1或2" />
*/

function dataset(elem, state) {
  return elem.dataset ? elem.dataset[`${state}Message`] : elem.getAttribute(`data-${state}-message`);
}
