(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['RegistrationService', 'MenuService'];  
function RegistrationController(RegistrationService, MenuService) {
  var regCtrl = this;
  
  regCtrl.saved;
  regCtrl.dishError;  
  
  this.user = RegistrationService.getRegistration();

  regCtrl.submit = function () {
    if (regCtrl.user.dish) {
      var promise = MenuService.isMenuItem(regCtrl.user.dish);     
      promise.then(function(value) { 
        if (value == true) {
          regCtrl.dishError = false;
          RegistrationService.saveRegistration(regCtrl.user);
          regCtrl.saved = true;
        } else {
          regCtrl.dishError = true;
          regCtrl.saved = false;
        }
      });
    } else {
      regCtrl.dishError = false;             
      RegistrationService.saveRegistration(regCtrl.user);
      regCtrl.saved = true;
    } 
  };
  
}

})();