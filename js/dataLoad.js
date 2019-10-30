'use strict';
(function () {
  var dataLoad = [];
  var onSuccess = function (data) {
    data.forEach(function (item, i) {
      item.id = i;
      item.name = i;
      dataLoad.push(item);
    });
    return dataLoad;
  };
  window.load(onSuccess);

  window.dataLoad = {
    dataLoad: dataLoad
  };
})();
