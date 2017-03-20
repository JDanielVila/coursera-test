(function () {
"use strict";

angular.module('common')
.service('RegistrationService', RegistrationService);

function RegistrationService() {
  var regService = this;
  
  regService.user = {};

  regService.getRegistration = function () {
    return regService.user;
  };

  regService.saveRegistration = function (newuser) {
    console.log(newuser);
    regService.user.firstname = newuser.firstname;
    regService.user.lastname = newuser.lastname;
    regService.user.email = newuser.email;
    regService.user.phone = newuser.phone;
    regService.user.dish = newuser.dish;
  };
  
  

}

})();