(function() {
  'use strict';
  angular.module('jarbis', ['ngRoute']);

  angular.module('jarbis')
    .run(function($rootScope, $route, $routeParams, $location) {

      $rootScope.$route = $route;
      $rootScope.$location = $location;
      $rootScope.$routeParams = $routeParams;
      $rootScope.systemName = 'J.A.R.B.I.S.';
      $rootScope.systemVersion = '2.1.beta';
      $rootScope.easterEgg = 'Just Another Reality Booster Interoperable System';
      $rootScope.companyName = 'T.I. Lojão Rio do Peixe';

      $rootScope.$on('$routeChangeStart',function(evt,next,current){
        console.log('#[jarbis says]: I\'m ' + $rootScope.easterEgg + "!" );
      });

    });
})();
