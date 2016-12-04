import * as pattern from './pattern';

// Public key by https://documentation.mailgun.com/api-email-validation.html
const MAILGUN_KEY = 'pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7';

// https://documentation.mailgun.com/api-email-validation.html#email-validation
const MAILGUN_URL = 'https://api.mailgun.net/v3/address/validate';

function valid(email) {
  const ret = {
    valid: true,
    message: null,
  };

  const promise = new Promise((resolve) => {
    if (!pattern.email.test(email)) {
      resolve({
        valid: false,
        message: '邮箱格式不正确',
      });
    } else if (valid.MAILGUN_KEY) {
      remoteValid(email, res => {
        let message = null;
        if (res.did_you_mean) {
          message = `你是想输入 ${res.did_you_mean} 吗`;
        } else if (!res.is_valid) {
          message = '邮箱格式不正确';
        }
        resolve({ message, valid: res.is_valid });
      });
    } else {
      resolve(ret);
    }
  });

  return promise;
}

// You can set this to `null` to disable mailgun validation
valid.MAILGUN_KEY = MAILGUN_KEY;

// Use mailgun API to validate email address
function remoteValid(email, cb) {
  const name = `valid_email_${Date.now()}`;
  window[name] = res => cb(res) && delete (window[name]);

  // timeout in 3s
  const timer = setTimeout(() => cb({
    is_valid: true,
    did_you_mean: null,
  }), 3000);

  const doc = document;
  const s = doc.createElement('script');
  const url = `${MAILGUN_URL}?callback=${name}&api_key=${MAILGUN_KEY}`;
  s.src = `${url}&address=${encodeURIComponent(email)}`;
  s.onload = () => {
    clearTimeout(timer);
    doc.body.removeChild(s);
  };
  doc.body.appendChild(s);
}

export default valid;
