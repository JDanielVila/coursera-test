(function () {
'use strict';

angular.module('MenuApp', ['ui.router', 'Data'])
  .constant('ViewRoutes', {
    'Home': "/",
    'Categories': "/categories",
    'Items': "/items/"
  });

})();
