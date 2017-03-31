(function () {

    var app = angular.module("app", []);

    app.controller("HttpCtrl", function ($scope, $http, $timeout, $interval) {
        var app = this;
        $scope.navTitleLeft = 'Fornecedores Cadastrados';
        $scope.navTitleRight = 'Notas Cadastradas';
        $scope.operation = "";
        $scope.isSaveDisabled = true;
        $scope.isDeleteDisabled = true;
        $scope.offNota = 'disabled';

        $scope.alerts = [];

        var response = $http.get('/riodopeixe-rest/webservice/nota/');
        response.success(function (data) {
            $scope.notas = data;
            console.log("[main] # of items: " + data.length);
            angular.forEach(data, function (element) {
                console.log("[main] nota: " + element.numero);
            });
        });
        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
        });

        var response = $http.get('/riodopeixe-rest/webservice/fornecedor/');
        response.success(function (data) {
            $scope.fornecedores = data;
            console.log("[main] # of items: " + data.length);
            angular.forEach(data, function (element) {
                console.log("[main] fornecedor: " + element.razaoSocial);
            });
        });
        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
        });


        $scope.getNotaPorNumero = function (numero) {
            var response = $http.get('/riodopeixe-rest/webservice/nota/' + numero);

            response.success(function (data) {
                $scope.nota = data;
                if ($scope.nota.id !== undefined) {
                $scope.operation = "update";
                $scope.isSaveDisabled = false;
                $scope.isDeleteDisabled = false;
                $scope.alerts.push({type: 'success', msg: 'Nota encontrada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 3000); } else {
                $scope.alerts.push({type: 'danger', msg: 'Nota nao encontrada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);
                }
            });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Nota nao encontrada!', show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.getNotaPorImei = function (imei) {
            var response = $http.get('/riodopeixe-rest/webservice/nota/' + imei);

            response.success(function (data) {
                $scope.nota = data;
                if ($scope.nota.id !== undefined) {
                $scope.operation = "update";
                $scope.isSaveDisabled = false;
                $scope.isDeleteDisabled = false;
                $scope.offNota = '';
                $scope.alerts.push({type: 'success', msg: 'Nota encontrada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);
            } else {
                $scope.alerts.push({type: 'danger', msg: 'Nota nao encontrada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);
                }
            });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Nota nao encontrada!', show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);

            });
        };

        $scope.searchFornecedor = function (cnpj) {
            var app = this;

            var response = $http.get('/riodopeixe-rest/webservice/fornecedor/' + cnpj);
            response.success(function (data) {
                $scope.fornecedor = data;
                $scope.$apply();
                $scope.alerts.push({type: 'success', msg: 'Nota encontrada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);

                console.log("[searchFornecedor] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[searchFornecedor] fornecedor: " + element.name);
                });

            });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.searchNota = function (numero) {
            var app = this;
            $scope.navTitleLeft = 'Fornecedores';
            $scope.navTitleRight = 'Notas';

            var response = $http.get('/riodopeixe-rest/webservice/nota/' + numero);
            response.success(function (data) {
                $scope.nota = data;
                $scope.$apply();
                $scope.alerts.push({type: 'success', msg: 'Nota encontrada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);

                console.log("[searchNota] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[searchNota] nota: " + element.numero);
                });

            });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
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

        $scope.saveNota = function (nota) {
            $scope.jsonObj = angular.toJson($scope.nota, false);
            console.log("[update] data: " + $scope.jsonObj);

            if ($scope.operation === "update") {
                var response = $http.put('/riodopeixe-rest/webservice/nota/' + $scope.nota.number, $scope.jsonObj);
                response.success(function (data, status, headers, config) {
                    $scope.resetSearch();
                $scope.alerts.push({type: 'success', msg: 'Nota atualizada!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                    $scope.atualizaModals();
                }, 2000);

                });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
                });
            } else if ($scope.operation === "create") {
                var response = $http.post('/riodopeixe-rest/webservice/nota/add', $scope.jsonObj);
                response.success(function (data, status, headers, config) {
                    $scope.resetSearch();
                $scope.alerts.push({type: 'success', msg: 'Nota incluida!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                    $scope.atualizaModals();
                }, 2000);

                });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
                });
            }
        };

        $scope.deleteNota = function (numero) {
            var response = $http.delete('/riodopeixe-rest/webservice/nota/' + numero);
            response.success(function (data, status, headers, config) {
                $scope.resetSearch();
                $scope.alerts.push({type: 'success', msg: 'Nota excluida!', show: true});
                $scope.atualizaModals();
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 2000);
            });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
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

            var response = $http.get('/riodopeixe-rest/webservice/nota/');
            response.success(function (data) {
                $scope.nota = data;
                $scope.$apply();
                console.log("[resetSearch] # of items: " + data.length);
            });

        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
            }, 100);
        };

//Gods Of Angular Forgive me...

        $scope.atualizaModals = function () {

                var response = $http.get('/riodopeixe-rest/webservice/nota/');
        response.success(function (data) {
            $scope.notas = data;
            console.log("[main] # of items: " + data.length);
            angular.forEach(data, function (element) {
                console.log("[main] nota: " + element.numero);
            });
        });
        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
        });

        var response = $http.get('/riodopeixe-rest/webservice/fornecedor/');
        response.success(function (data) {
            $scope.fornecedores = data;
            console.log("[main] # of items: " + data.length);
            angular.forEach(data, function (element) {
                console.log("[main] fornecedor: " + element.razaoSocial);
            });
        });
        response.error(function (data, status, headers, config) {
            $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema! Código: ' + status, show: true});
            $timeout(function () {
                $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
            }, 2000);
            //alert("AJAX failed to get data, status=" + status);
        });
        };






    });
})();
