(function () {
    'use strict';

    angular.module('jarbis')
            .controller('NotasController', NotasController);

    NotasController.$inject = ['$scope', '$http', '$timeout', '$window'];

    function NotasController ($scope, $http, $timeout, $window) {

      $scope.alerts = [];
      $scope.isSaveDisabled = true;
      $scope.isDeleteDisabled = true;
      $scope.isNew = false;
      var hostAddress = 'localhost:8080';

      $scope.getBuscaNota = function (imei) {

        $http({
            method: 'GET',
            url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/nota/' + imei
          }).then(function successCallback(response) {
            $scope.nota = response.data;
            $scope.isSaveDisabled = false;
            $scope.isDeleteDisabled = false;
            $scope.offNota = '';
            console.log("#[nota_recuperada!]");
            $scope.alerts.push({type: 'success', msg: 'Registros encontrados!', show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);

          }, function errorCallback(response) {
            $scope.nota = response.data;
            console.log("#[nota_não_encontrada!]");
            $scope.alerts.push({type: 'danger', msg: 'Ops! Registros não encontrados!', show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
          });

        };

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

          $scope.clearForm = function () {
              $scope.nota = {
                  number: '',
                  issuanceDate: '',
                  issuanceDate: '',
                  cellPhone: '',
                  cnpjFornecedor: ''
              };
          };

          $scope.addNew = function () {
              $scope.operation = "create";
              $scope.clearForm();
              $scope.isSaveDisabled = false;
              $scope.isDeleteDisabled = true;
              $scope.offNota = '';
              $scope.isNew = true;
          };
    };
})();
