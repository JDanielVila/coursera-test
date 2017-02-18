(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {

    $scope.lunchList = "";
    $scope.lunchHint = "";

    $scope.checkIfTooMuch = function () {
      var num = getLunchItems($scope.lunchList);
      if (num == 0) {
        $scope.lunchHint = 'Please enter data first';
        $scope.hintStyle = {
          'border-color':'red',
          'color':'red'
        };
      } else {
        $scope.lunchHint = (num <= 3 ? 'Enjoy!' : 'Too much!');
        $scope.hintStyle = {
          'border-color':'green',
          'color':'green'
        };
      }
    };

    // Empty items aren't taken in account
    function getLunchItems(string) {
      var trimSep = /^[\s*\,*\s*]*|[\s*\,*\s*]*$/g; // RegExp to discard begin or end separators
      var separator = /[\,+\s*\,*]*/; // Separator RegExp that discards empty items
      string = string.replace(trimSep,'');
      if(string.length > 0) {
        return string.split(separator).length;
      } else {
        return 0;
      }
    }

  }; //controller end

})(); //funtion end
