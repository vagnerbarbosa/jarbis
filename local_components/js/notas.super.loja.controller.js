(function () {
    'use strict';

    angular.module('jarbis')
            .controller('NotasSuperLojaController', NotasSuperLojaController);

    NotasSuperLojaController.$inject = ['$scope', '$http', '$timeout'];

    function NotasSuperLojaController ($scope, $http, $timeout) {

      $scope.alerts = [];
      var hostAddress = 'localhost:8080';

        $scope.getNotaPorCodigo = function (code) {

          $http({
              method: 'GET',
              url: 'http://192.168.19.250:8080/riodopeixe-rest/webservice/nota-entrada/' + code
            }).then(function successCallback(response) {
              $scope.olds = response.data;
              console.log("#[jarbis says]: nota_do_superloja_recuperada!");
              $scope.alerts.push({type: 'success', msg: 'Registros encontrados!', show: true});
              $timeout(function () {
                  $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
              }, 2000);

            }, function errorCallback(response) {
              $scope.olds = response.data;
              console.log("#[jarbis says]: nota_do_superloja_não_encontrada!");
              $scope.alerts.push({type: 'danger', msg: 'Ops! Registros não encontrados!', show: true});
              $timeout(function () {
                  $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
              }, 2000);
            });

          };
    };


})();
