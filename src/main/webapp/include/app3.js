(function () {

    var app = angular.module("app", []);
    var off;

    app.controller("HttpCtrl", function ($scope, $http, $timeout) {
        var app = this;
        $scope.navTitleLeft = 'Fornecedores Cadastrados';
        $scope.navTitleRight = 'Notas Cadastradas';
        $scope.operation = "";
        $scope.isSaveDisabled = true;
        $scope.isDeleteDisabled = true;
        $scope.isAddDisabled = true;
        $scope.off = 'disabled';


        $scope.alerts = [];

        $scope.getNotaPorCodigo = function (code) {

            //var response = $http.get('/SisNota/rest/fornecedor/' + unformattedCnpj);
            var response = $http.get('/SisNota/rest/nota-entrada/' + code);

            response.success(function (data) {
                $scope.notas = data;
                $scope.$apply();
                $scope.alerts.push({type: 'success', msg: 'Notas encontradas!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);

                console.log("[searchFornecedor] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[searchFornecedor] fornecedor: " + element.codigoCompra);
                });

            });

            response.error(function (data, status, headers, config) {
                $scope.alerts.push({type: 'danger', msg: 'Nota não encontrada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);
                //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);

        };

        //Gods Of Angular Forgive me...        

        $scope.atualizaModals = function () {

            var response = $http.get('/SisNota/rest/nota/');
            response.success(function (data) {
                $scope.notas = data;
                console.log("[main] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[main] nota: " + element.numero);
                });
            });
            response.error(function (data, status, headers, config) {
                $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 1000);
                //alert("AJAX failed to get data, status=" + status);
            });

            var response = $http.get('/SisNota/rest/fornecedor/');
            response.success(function (data) {
                $scope.fornecedores = data;
                console.log("[main] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[main] fornecedor: " + element.razaoSocial);
                });
            });
            response.error(function (data, status, headers, config) {
                $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 1000);
                //alert("AJAX failed to get data, status=" + status);
            });

        };

    }

    );
})();
