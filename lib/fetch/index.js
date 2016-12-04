import fetch from './globalFetch';
import Headers from './Headers';
import Request from './Request';
import Response from './Response';
import timeout from './helper/timeout';

const _self = self || this;

if (typeof _self.fetch === 'undefined') {
  _self.fetch = fetch;

  _self.Headers = Headers;
  _self.Request = Request;
  _self.Response = Response;
}

_self.fetch.helper = {};
_self.fetch.helper.timeout = timeout;

export default _self.fetch;
