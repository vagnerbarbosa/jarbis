(function () {
    'use strict';

    angular.module('jarbis')
            .controller('FornecedorController', FornecedorController);

    FornecedorController.$inject = ['$scope', '$http'];

    function FornecedorController ($scope, $http) {

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
            }, function errorCallback(response) {
              $scope.fornecedor = response.data;
              console.log("#[fornecedor_não_recuperado!]");
            });

          };
    };
})();
