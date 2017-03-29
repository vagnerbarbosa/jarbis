(function () {
    'use strict';

    angular.module('jarbis')
            .controller('NotasController', NotasController);

    NotasController.$inject = ['$scope', '$http', '$timeout'];

    function NotasController ($scope, $http, $timeout) {

      $scope.alerts = [];
      var hostAddress = 'localhost:8080';

      $scope.getBuscaNota = function (imei) {

        $http({
            method: 'GET',
            url: 'http://' + 'localhost:1337/' + hostAddress + '/riodopeixe-rest/webservice/nota/' + imei
          }).then(function successCallback(response) {
            $scope.nota = response.data;
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

    };
})();
