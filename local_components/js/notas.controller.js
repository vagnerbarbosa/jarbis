(function () {
    'use strict';

    angular.module('jarbis')
            .controller('NotasController', NotasController);

    NotasController.$inject = ['$scope', '$http', '$timeout', '$window'];

    function NotasController ($scope, $http, $timeout, $window) {

      $scope.alerts = [];
      $scope.isSaveDisabled = true;
      $scope.isDeleteDisabled = true;
      $scope.isSearchDisabled = true;
      $scope.isNew = false;
      var hostAddress = 'localhost:8080';


      $scope.getBuscaNota = function (imei) {
        $scope.clearForm();
        $http({
            method: 'GET',
            url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/nota/' + imei
          }).then(function successCallback(response) {
            $scope.nota = response.data;
            $scope.operation = "update";
            $scope.isSaveDisabled = false;
            $scope.isDeleteDisabled = false;
            $scope.isSearchDisabled = false;
            $scope.offNota = '';
            console.log("#[jarbis says]: nota_recuperada!");
            $scope.alerts.push({type: 'success', msg: 'NF-e encontrada com sucesso!', show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);

          }, function errorCallback(response) {
            $scope.nota = response.data;
            console.log("#[jarbis says]: nota_não_encontrada!");
            $scope.alerts.push({type: 'danger', msg: 'Ops! NF-e não encontrada!', show: true});
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
              $scope.nota.cnpjFornecedor = response.data;
              console.log("#[jarbis says]: fornecedor_recuperado!");
              $scope.alerts.push({type: 'success', msg: 'Fornecedor encontrado!', show: true});
              $timeout(function () {
                  $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
              }, 2000);
            }, function errorCallback(response) {
              $scope.nota.cnpjFornecedor = response.data;
              console.log("#[jarbis says]: fornecedor_não_recuperado!");
              $scope.alerts.push({type: 'danger', msg: 'Ops! Fornecedor não cadastrado no Sabium!', show: true});
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
              $scope.isSearchDisabled = false;
              $scope.offNota = '';
              $scope.isNew = true;
          };


          $scope.saveNota = function (numero) {
              $scope.jsonObj = angular.toJson($scope.nota, false);
              console.log("#[jarbis says]: data atualizada --- " + $scope.jsonObj);

              if ($scope.operation === "update") {
                $http({
                    method: 'PUT',
                    url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/nota/' + numero,
                    headers: {"Content-Type": "application/json;charset=UTF-8"},
                    data: $scope.jsonObj
                  }).then(function successCallback(response) {
                    console.log("#[jarbis says]: nota_persistida!");
                    $scope.alerts.push({type: 'success', msg: 'NF-e salva com sucesso!', show: true});
                    $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                    }, 2000);

                  }, function errorCallback(response) {
                    $scope.nota = response.data;
                    console.log("#[jarbis says]: nota_não_persistida!");
                    $scope.alerts.push({type: 'danger', msg: 'Ops! Operação não realizada!', show: true});
                    $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                    }, 2000);
                  });


              }
            };

            $scope.deleteNota = function (numero) {
                $scope.jsonObj = angular.toJson($scope.nota, false);
                console.log("#[jarbis says]: data excluida --- " + $scope.jsonObj);

                  $http({
                      method: 'DELETE',
                      url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/nota/' + numero,
                      headers: {"Content-Type": "application/json;charset=UTF-8"}
                    }).then(function successCallback(response) {
                      console.log("#[jarbis says]: nota_deletada!");
                      $scope.alerts.push({type: 'success', msg: 'NF-e deletada com sucesso!', show: true});
                      $timeout(function () {
                          $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                      }, 2000);

                    }, function errorCallback(response) {
                      $scope.nota = response.data;
                      console.log("#[jarbis says]: nota_não_deletada!");
                      $scope.alerts.push({type: 'danger', msg: 'Ops! Operação não realizada!', show: true});
                      $timeout(function () {
                          $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                      }, 2000);
                    });
              };

          $http({
              method: 'GET',
              url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/nota/'
            }).then(function successCallback(response) {
              $scope.notas = response.data;
              console.log("#[jarbis says]: notas_recuperadas!");
            }, function errorCallback(response) {
              $scope.notas = response.data;
              console.log("#[jarbis says]: notas_não_encontradas!");
            });

    };
})();
