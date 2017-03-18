(function () {
'use strict';

angular.module('MenuApp')
  .controller('MenuitemsListController', MenuitemsListController);

  // 'item' is injected through state's resolve
  MenuitemsListController.$inject = ['items']
  function MenuitemsListController(items) {
    var menuitemsList = this;
    menuitemsList.items = items;
    console.log(menuitemsList.items);
  }

})();