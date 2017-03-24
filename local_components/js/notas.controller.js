(function () {
    'use strict';

    angular.module('jarbis')
            .controller('NotasController', NotasController);

    NotasController.$inject = ['$scope', '$http'];

    function NotasController ($scope, $http) {

      var hostAddress = '192.168.19.33:8080';

        var fornecedorResponse = $http({
            method: 'GET',
            url: 'http://' + hostAddress + '/riodopeixe-rest/webservice/fornecedor'
        }).then(function successCallback(response) {
            $scope.fornecedores = response.data;
            console.log("#[total_de_fornecedores]: " + response.data.length);
        }, function errorCallback(response) {
          $scope.fornecedores = response.data;
          console.log("#[total_de_fornecedores]: " + response.data.length);
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
