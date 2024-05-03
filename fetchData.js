const fetchData = function(key) {
  return JSON.parse(localStorage.getItem(key));
};

module.exports = fetchData;
