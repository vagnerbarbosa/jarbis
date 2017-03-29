(function () {
    'use strict';

    angular.module('jarbis')
            .controller('NotasController', NotasController);

    NotasController.$inject = ['$scope', '$http', '$timeout'];

    function NotasController ($scope, $http, $timeout) {

      $scope.alerts = [];
      var hostAddress = 'localhost:8080';

        var fornecedorResponse = $http({
            method: 'GET',
            url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/fornecedor'
        }).then(function successCallback(response) {
          $scope.fornecedores = response.data;
          console.log("#[total_de_fornecedores]: " + response.data.length);
          $scope.alerts.push({type: 'success', msg: 'Nota encontrada!', show: true});
          $timeout(function () {
              $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
          }, 2000);
        }, function errorCallback(response) {
          $scope.fornecedores = response.data;
          console.log("#[total_de_fornecedores]: " + response.data.length);
          $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema!', show: true});
          $timeout(function () {
              $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
          }, 2000);
        });

        var notaResponse = $http({
            method: 'GET',
            url: 'http://' + hostAddress + '/riodopeixe-rest/webservice/nota'
        }).then(function successCallback(response) {
            $scope.notas = response.data;
            console.log("#[total_de_notas]: " + response.data.length);
        }, function errorCallback(response) {
          $scope.notas = response.data;
          console.log("#[total_de_notas]: " + response.data.length);
        });

    };
})();
