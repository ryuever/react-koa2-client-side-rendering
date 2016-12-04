const simpleChar = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
const specialChar = '~)!@#$%^&*()_+-={}[]|:;<>?,./';

// e.g. 12345, abcdefg
function tightAttached(raw) {
  const delta = raw.charCodeAt(1) - raw.charCodeAt(0);

  for (let i = 0, l = raw.length; i < l - 1; i++) {
    if (raw.charCodeAt(i + 1) - raw.charCodeAt(i) !== delta) {
      return false;
    }
  }

  return true;
}

function followAsdf(raw) {
  const reverse = raw.split('').reverse().join('');
  let asdf = simpleChar.join('');

  if (asdf.indexOf(raw) !== -1 || asdf.indexOf(reverse) !== -1) {
    return true;
  }

  asdf = simpleChar.reverse().join('');

  if (asdf.indexOf(raw) !== -1 || asdf.indexOf(reverse) !== -1) {
    return true;
  }

  return false;
}

// 密码强度
function calculateStrength(raw) {
  let strength = 0;

  // lowercase
  if (/[a-z]/.test(raw)) {
    strength += 1;
  }

  // uppercase
  if (/[A-Z]/.test(raw)) {
    strength += 1;
  }

  // number
  if (/[0-9]/.test(raw)) {
    strength += 1;
  }

  // marks
  if (/[^0-9a-zA-Z]/.test(raw)) {
    strength += 1;
  }

  // special character
  specialChar.split('').forEach(char => {
    if (raw.indexOf(char) !== -1) {
      strength += 1;
      return;
    }
  });

  return strength > 3 ? 'strong' : 'medium';
}

function valid(raw) {
  let ret = {
    valid: false,
    strength: 'simple',
    message: null,
  };

  if (raw.length < valid.min) {
    ret = { ...ret, message: '密码太短' };
  } else if (valid.blacklist.indexOf(raw) !== -1) {
    ret = { ...ret, message: '单词太简单' };
  } else if (tightAttached(raw) || followAsdf(raw)) {
    ret = { ...ret, message: '密码太简单' };
  } else {
    ret = { ...ret, valid: true, strength: calculateStrength(raw) };
  }

  return Promise.resolve(ret);
}

// min-length of the password
valid.min = 6;

// password can't be these words
valid.blacklist = [];

export default valid;
