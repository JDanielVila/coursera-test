(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {

		var toBuyList = this;

  		toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
		toBuyList.isEmpty = function () {
			return (toBuyList.items.length == 0);
		}

  		toBuyList.bought = function (itemIndex) {
    		ShoppingListCheckOffService.bought(itemIndex);
		}
		
		
  	}; 

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {

		var boughtList = this;
		
  		boughtList.items = ShoppingListCheckOffService.getBoughtItems();
		boughtList.isEmpty = function() {
			return (boughtList.items.length == 0);	
		}
		
	}; 	

	function ShoppingListCheckOffService() {
	  var service = this;

	  // List of shopping items
	  var toBuyItems = [{
                          name:'Cookies',
                          quantity:'10',
                        },
                        {
                          name:'Cherry Cake', 
                          quantity:'1',
                        },
		                {
                          name:'Strawberry Cake',
                          quantity:'1',
                        },
                        {
                          name:'Milk', 
                          quantity:'2',
                        },		  				                        {
                          name:'Coffee', 
                          quantity:'3',
                        }];
	
	  var boughtItems = []; 	

	  service.bought = function (itemIndex) {
	  	boughtItems.push(toBuyItems[itemIndex]);
		toBuyItems.splice(itemIndex, 1);  
	  };

	  service.getToBuyItems = function () {
	  	return toBuyItems;
	  };

	  service.getBoughtItems = function () {
	  	return boughtItems;
	  };		
		
	}	
	
})(); //funtion end