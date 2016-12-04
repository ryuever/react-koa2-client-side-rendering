
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const timeout = (p, ms = 30 * 1000) => Promise.race([p, wait(ms).then(() => {
  const error = new Error({
    status: 408,
    statusText: '',
    message: 'connection timed out',
  });
  return Promise.reject(error);
})]);

timeout.wait = wait;

export default timeout;
