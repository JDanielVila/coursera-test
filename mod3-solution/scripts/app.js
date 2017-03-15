(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('found-items', NarrowItDownDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


  function NarrowItDownDirective() {
    var ddo = {
      templateUrl: 'loader/itemsloaderindicator.template.html',
      scope: {
        items: '<',
        onRemove: '&',
        showError:'<'
      },
      controller: NarrowItDownController,
      controllerAs: 'found',
      bindToController: true
    };

    return ddo;
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {   
    var ctr = this;
    
    ctr.searchTerm = "";
    ctr.items = {};
    ctr.showError = false;
    
    ctr.getFoundItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(ctr.searchTerm);
      promise.then(function (response) {
        ctr.items = response;
        ctr.showError = false;
      })
      .catch(function (error) {
        ctr.showError = true;
      });
    }
   
    ctr.onRemove = function (itemIndex) {
      ctr.items.splice(itemIndex, 1);
    };      
  }

  
  MenuSearchService.$inject = ['$http', 'ApiBasePath', '$filter'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (response) {
        var items = [];
        var foundItems = [];       
        items = response.data.menu_items;
        console.log(items);
        if (searchTerm.length !== 0) {
          for (var i = 0; i < items.length; i++) {
            var description = items[i].description;
            if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(items[i]);
            }
          }
          return foundItems;
        }         
      }).catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };
  }

  
})();