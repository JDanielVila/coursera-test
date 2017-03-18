(function () {
'use strict';

angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })
    
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/templates/categories-list.template.html',
      controller: 'CategoriesListController as categoriesList',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })    
    
    .state('items', {
      url: '/items/{itemId}',
      templateUrl: 'src/menuapp/templates/menuitems-list.template.html',
      controller: 'MenuitemsListController as menuitemsList',
      resolve: {
        items: ['$stateParams', 'MenuDataService', 
          function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.itemId);
        }]
      }
    })
    ;

  }

})();
