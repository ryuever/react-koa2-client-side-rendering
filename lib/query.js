const doc = document;

function query(selector, baseElement) {
  return first(selector, baseElement);
}

function first(selector, baseElement) {
  const element = baseElement || doc;
  return element.querySelector(selector);
}

function all(selector, baseElement) {
  const element = baseElement || doc;
  return element.querySelectorAll(selector);
}

query.first = first;
query.all = all;

export default query;
