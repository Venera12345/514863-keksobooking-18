'use strict';
(function () {
  var dataLoad = [];
  var onSuccess = function (data) {
    data.forEach(function (item) {
      dataLoad.push(item);
    });
    return dataLoad;
  };
window.load(onSuccess);

window.dataLoad = {
  dataLoad: dataLoad
};
})();
