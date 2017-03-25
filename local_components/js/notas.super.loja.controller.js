(function () {
    'use strict';

    angular.module('jarbis')
            .controller('NotasSuperLojaController', NotasSuperLojaController);

    NotasSuperLojaController.$inject = ['$scope', '$http'];

    function NotasSuperLojaController ($scope, $http) {

      var hostAddress = 'localhost:8080';

        $scope.getNotaPorCodigo = function (code) {

          $http({
              method: 'GET',
              url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/nota-entrada/' + code
            }).then(function successCallback(response) {
              $scope.olds = response.data;
              console.log("#[nota_do_superloja_recuperada!]");
            }, function errorCallback(response) {
              $scope.olds = response.data;
              console.log("#[nota_do_superloja_não_encontrada!]");
            });

          };
    };


})();
