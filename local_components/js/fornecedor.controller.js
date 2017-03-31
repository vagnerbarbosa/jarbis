(function () {
    'use strict';

    angular.module('jarbis')
            .controller('FornecedorController', FornecedorController);

    FornecedorController.$inject = ['$scope', '$http', '$timeout'];

    function FornecedorController ($scope, $http, $timeout) {

      $scope.alerts = [];
      var hostAddress = 'localhost:8080';

        $scope.getFornecedorPorCnpj = function (cnpj) {

          var unformattedCnpj = cnpj.replace('.', '');
          unformattedCnpj = unformattedCnpj.replace('.', '');
          unformattedCnpj = unformattedCnpj.replace('/', '');
          unformattedCnpj = unformattedCnpj.replace('-', '');

          $http({
              method: 'GET',
              url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/fornecedor/' + unformattedCnpj
            }).then(function successCallback(response) {
              $scope.fornecedor = response.data;
              console.log("#[fornecedor_recuperado!]");
              $scope.alerts.push({type: 'success', msg: 'Fornecedor encontrado!', show: true});
              $timeout(function () {
                  $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
              }, 2000);
            }, function errorCallback(response) {
              $scope.fornecedor = response.data;
              console.log("#[fornecedor_não_recuperado!]");
              $scope.alerts.push({type: 'danger', msg: 'Ops! Fornecedor não encontrado!', show: true});
              $timeout(function () {
                  $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
              }, 2000);
            });

          };

          $http({
              method: 'GET',
              url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/fornecedor/'
            }).then(function successCallback(response) {
              $scope.fornecedores = response.data;
              console.log("#[fornecedores_recuperados!]");
            }, function errorCallback(response) {
              $scope.fornecedores = response.data;
              console.log("#[fornecedores_não_encontrados!]");
            });

    };
})();
