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
            $scope.operation = "PUT";
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
            //$scope.alerts.push({type: 'danger', msg: 'Ops! NF-e não encontrada!', show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
          });

        };

        $scope.getCelularPorCodigo = function (codigo, cor, voltagem) {
          $http({
              method: 'GET',
              url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/celular/' + codigo + '/' + cor + '/' + voltagem
            }).then(function successCallback(response) {
              $scope.nota.celular[$scope.nota.celular.length-1] = response.data;
              console.log("#[jarbis says]: celular_recuperado! " + $scope.nota.celular.descricao);
              $scope.alerts.push({type: 'success', msg: 'Celular encontrado!', show: true});
              $timeout(function () {
                  $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
              }, 2000);
            }, function errorCallback(response) {
              $scope.nota.celular[$scope.nota.celular.length-1] = {};
              console.log("#[jarbis says]: celular_não_recuperado!");
              $scope.alerts.push({type: 'danger', msg: 'Ops! Celular não cadastrado no Sabium!', show: true});
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
              $scope.operation = "POST";
              $scope.clearForm();
              $scope.isSaveDisabled = false;
              $scope.isDeleteDisabled = true;
              $scope.isSearchDisabled = false;
              $scope.offNota = '';
              $scope.isNew = true;
              $scope.nota.celular = [{}];//[{"idProduto":0,"cor":0,"voltagem":0,"descricao":"teste","imeis":[],"idcelular":0}];
              $scope.nota.celular.length = 0;
          };


          $scope.saveNota = function (numero) {
              $scope.jsonObj = angular.toJson($scope.nota, false);
              console.log("#[jarbis says]: data atualizada --- " + $scope.jsonObj);

                $http({
                    method: $scope.operation,
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



            };

            $scope.deleteNota = function (numero) {
                $scope.jsonObj = angular.toJson($scope.nota, false);
                console.log("#[jarbis says]: data excluida - " + $scope.jsonObj);

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

              $scope.refreshNota = function () {
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

          $scope.addNewPhone = function() {
            var newItemNo = $scope.nota.celular.length+1;
            $scope.nota.celular.push({});
          };

          $scope.removePhone = function() {
            var lastItem = $scope.celular.length-1;
            $scope.nota.celular.splice(lastItem);
          };

    };
})();
