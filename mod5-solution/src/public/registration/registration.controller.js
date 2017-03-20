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
    regCtrl.saved = false;
    regCtrl.dishError = false;
    
    if (regCtrl.user.dish) {
      var promise = MenuService.isMenuItem(regCtrl.user.dish);     
      promise.then(function(value) { regCtrl.dishError = !value });
    } 

    if (regCtrl.dishError == false) {
      RegistrationService.saveRegistration(regCtrl.user);
      regCtrl.saved = true;
    } 
  };
  
}

})();
