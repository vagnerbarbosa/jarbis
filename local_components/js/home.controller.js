(function () {
    'use strict';

    angular.module('jarbis')
            .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$http'];

    function HomeController ($scope, $http) {

        var fornecedorResponse = $http({
            method: 'GET',
            url: 'http://192.168.19.250:8080/riodopeixe-rest/webservice/fornecedor'
        }).then(function successCallback(response) {
            $scope.toners = response.data;
            console.log("#[total_de_fornecedores]: " + response.data.length);
        }, function errorCallback(response) {
          $scope.toners = response.data;
          console.log("#[total_de_fornecedores]: " + response.data.length);

        });


        var notaResponse = $http({
            method: 'GET',
            url: 'http://192.168.19.250:8080/riodopeixe-rest/webservice/nota'
        }).then(function successCallback(response) {
            $scope.toners = response.data;
            console.log("#[total_de_notas]: " + response.data.length);
        }, function errorCallback(response) {
          $scope.toners = response.data;
          console.log("#[total_de_notas]: " + response.data.length);

        });

    };
})();
