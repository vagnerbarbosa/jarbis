(function () {

    var app = angular.module("app", []);
    var offNota;

    app.controller("HttpCtrl", function ($scope, $http) {
        var app = this;
        $scope.navTitleLeft = 'Fornecedores Cadastrados';
        $scope.navTitleRight = 'Notas Cadastradas';
        $scope.operation = "";
        $scope.isSaveDisabled = true;
        $scope.isDeleteDisabled = true;
        $scope.offNota = 'disabled';

        var response = $http.get('/SisNota/rest/nota/');
        response.success(function (data) {
            $scope.notas = data;
            console.log("[main] # of items: " + data.length);
            angular.forEach(data, function (element) {
                console.log("[main] nota: " + element.numero);
            });
        });
        response.error(function (data, status, headers, config) {
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
            //alert("AJAX failed to get data, status=" + status);
        });


        $scope.getNotaPorNumero = function (numero) {
            var response = $http.get('/SisNota/rest/nota/' + numero);

            response.success(function (data) {
                $scope.nota = data;
                $scope.operation = "update";
                $scope.isSaveDisabled = false;
                $scope.isDeleteDisabled = false;
            });

            response.error(function (data, status, headers, config) {
                //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.getNotaPorImei = function (imei) {
            var response = $http.get('/SisNota/rest/nota/' + imei);

            response.success(function (data) {
                $scope.nota = data;
                $scope.operation = "update";
                $scope.isSaveDisabled = false;
                $scope.isDeleteDisabled = false;
                $scope.offNota = '';
            });

            response.error(function (data, status, headers, config) {
                //alert("AJAX failed to get data, status=" + status);                
                alert("Sem nota encontrada!");

            });
        };

        $scope.searchFornecedor = function (cnpj) {
            var app = this;

            var response = $http.get('/SisNota/rest/fornecedor/' + cnpj);
            response.success(function (data) {
                $scope.fornecedor = data;
                $scope.$apply();

                console.log("[searchFornecedor] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[searchFornecedor] fornecedor: " + element.name);
                });

            });

            response.error(function (data, status, headers, config) {
                //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.searchNota = function (numero) {
            var app = this;
            $scope.navTitleLeft = 'Fornecedores';
            $scope.navTitleRight = 'Notas';

            var response = $http.get('/SisNota/rest/nota/' + numero);
            response.success(function (data) {
                $scope.nota = data;
                $scope.$apply();

                console.log("[searchNota] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[searchNota] nota: " + element.numero);
                });

            });

            response.error(function (data, status, headers, config) {
                //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.clearForm = function () {
            $scope.nota = {
                numero: '',
                dataEmissao: '',
                dataEntrada: '',
                imei: '',
                fornecedor: ''
            };
        };

        $scope.addNew = function (element) {
            $scope.operation = "create";
            $scope.clearForm();
            main.numero.focus();
            $scope.isSaveDisabled = false;
            $scope.isDeleteDisabled = true;
            $scope.offNota = '';
        };

        $scope.saveNota = function (numero) {
            $scope.jsonObj = angular.toJson($scope.nota, false);
            console.log("[update] data: " + $scope.jsonObj);

            if ($scope.operation === "update") {
                var response = $http.put('/SisNota/rest/nota/' + numero, $scope.jsonObj);
                response.success(function (data, status, headers, config) {
                    $scope.resetSearch();
                    window.location = '/SisNota/nota.jsp';
                });

                response.error(function (data, status, headers, config) {
                    //alert("AJAX failed to get data, status=" + status);
                });
            } else if ($scope.operation === "create") {                
                var response = $http.post('/SisNota/rest/nota/add', $scope.jsonObj);
                response.success(function (data, status, headers, config) {
                    $scope.resetSearch();
                    window.location = '/SisNota/nota.jsp';
                });

                response.error(function (data, status, headers, config) {
                    if (status === 500)
                    alert("Nota ja foi cadastrada!");
                });
            }
        };

        $scope.deleteNota = function (numero) {
            var response = $http.delete('/SisNota/rest/nota/' + numero);
            response.success(function (data, status, headers, config) {
                $scope.resetSearch();
                window.location = '/SisNota/nota.jsp';
            });

            response.error(function (data, status, headers, config) {
                //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.resetSearch = function (name) {
            var app = this;
            $scope.operation = "";
            $scope.clearForm();
            $scope.isSaveDisabled = true;
            $scope.isDeleteDisabled = true;
            $scope.navTitleLeft = 'Fornecedores';
            $scope.navTitleRight = 'Notas';
            $scope.searchName = '';            
            $scope.offNota = 'disabled';

            var response = $http.get('/SisNota/rest/nota/');
            response.success(function (data) {
                $scope.nota = data;
                $scope.$apply();
                console.log("[resetSearch] # of items: " + data.length);
            });

            response.error(function (data, status, headers, config) {
                //alert("AJAX failed to get data, status=" + status);
            }, 100);
        };

    });
})();