(function() {
  'use strict';

  angular.module('jarbis')

    .config(function($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $routeProvider
        .when('/', {
          templateUrl: '/views/index.html',
          controller: 'HomeController'

        })
        .when('/fornecedores', {
          templateUrl: '/views/fornecedores.html',
          controller: 'FornecedorController'
        })
        .when('/notas', {
          templateUrl: '/views/notas.html',
          controller: 'NotasController'
        })
        .when('/relatorios', {
          templateUrl: '/views/notas-superloja.html',
          controller: 'NotasSuperLojaController'
        }).otherwise({
          redirectTo: '/'
        });

         

    });
})();
