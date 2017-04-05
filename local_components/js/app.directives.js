(function () {
    'use strict';

      angular.module('jarbis')
              .directive("formatDate", function(){
                return {
                  require: 'ngModel',
                  link: function(scope, elem, attr, modelCtrl) {
                    modelCtrl.$formatters.push(function(modelValue){
                      return new Date(modelValue);
                    })
                  }
                }
              })

})();
