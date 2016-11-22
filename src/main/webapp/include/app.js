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
        $scope.off = 'disabled';


        $scope.alerts = [];

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

        $scope.getFornecedorPorCnpj = function (cnpj) {
            var unformattedCnpj = cnpj.replace('.', '');
            unformattedCnpj = unformattedCnpj.replace('.', '');
            unformattedCnpj = unformattedCnpj.replace('/', '');
            unformattedCnpj = unformattedCnpj.replace('-', '');

            //var response = $http.get('/SisNota/rest/fornecedor/' + unformattedCnpj);
            var response = $http.get('/SisNota/rest/fornecedor/' + unformattedCnpj);

            response.success(function (data) {
                $scope.fornecedor = data;
                $scope.operation = "update";
                $scope.isSaveDisabled = false;
                $scope.isDeleteDisabled = false;
                $scope.off = '';
                $scope.alerts.push({type: 'success', msg: 'Fornecedor encontrado!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 1000);

            });

            response.error(function (data, status, headers, config) {
                $scope.alerts.push({type: 'danger', msg: 'Fornecedor nao encontrado!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 1000); // maybe '}, 3000, false);' to avoid calling apply
                //alert("AJAX failed to get data, status=" + status);
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);

        };

        $scope.searchFornecedor = function (cnpj) {
            var app = this;
            $scope.navTitleLeft = 'Fornecedores';
            $scope.navTitleRight = 'Notas';

            var response = $http.get('/SisNota/rest/fornecedor/' + cnpj);
            response.success(function (data) {
                $scope.fornecedor = data;
                $scope.$apply();
                $scope.alerts.push({type: 'success', msg: 'Fornecedor encontrado!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 1000);

                console.log("[searchFornecedor] # of items: " + data.length);
                angular.forEach(data, function (element) {
                    console.log("[searchFornecedor] fornecedor: " + element.name);
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

        $scope.clearForm = function () {
            $scope.fornecedor = {
                cnpj: '',
                fantasia: '',
                uf: '',
                cidade: '',
                bairro: '',
                rua: '',
                numero: '',
                ie: ''
            };
        };

        $scope.addNew = function (element) {
            $scope.operation = "create";
            $scope.clearForm();
            main.cnpj.focus();
            $scope.isSaveDisabled = false;
            $scope.isDeleteDisabled = true;
            $scope.off = '';
        };

        $scope.saveFornecedor = function (cnpj) {
            $scope.jsonObj = angular.toJson($scope.fornecedor, false);
            console.log("[update] data: " + $scope.jsonObj);

            if ($scope.operation === "update") {
                var response = $http.put('/SisNota/rest/fornecedor/' + cnpj, $scope.jsonObj);
                response.success(function (data, status, headers, config) {
                    $scope.resetSearch();
                    $scope.alerts.push({type: 'success', msg: 'Fornecedor atualizado!', show: true});
                    $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                        $scope.atualizaModals();
                    }, 1000);
                });

                response.error(function (data, status, headers, config) {
                    $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema!', show: true});
                    $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                    }, 1000);
                    //alert("AJAX failed to get data, status=" + status);
                });
            } else if ($scope.operation === "create") {
                var response = $http.post('/SisNota/rest/fornecedor/add', $scope.jsonObj);
                response.success(function (data, status, headers, config) {
                    $scope.resetSearch();
                    $scope.alerts.push({type: 'success', msg: 'Fornecedor incluido!', show: true});
                    $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                        $scope.atualizaModals();
                    }, 1000);
                });

                response.error(function (data, status, headers, config) {
                    $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema!', show: true});
                    $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                    }, 1000);
                    //alert("AJAX failed to get data, status=" + status);
                });
            }
        };

        $scope.deleteFornecedor = function (cnpj) {
            var unformattedCnpj = cnpj.replace('.', '');
            unformattedCnpj = unformattedCnpj.replace('.', '');
            unformattedCnpj = unformattedCnpj.replace('/', '');
            unformattedCnpj = unformattedCnpj.replace('-', '');
            var response = $http.delete('/SisNota/rest/fornecedor/' + unformattedCnpj);
            response.success(function (data, status, headers, config) {
                $scope.resetSearch();
                $scope.alerts.push({type: 'success', msg: 'Fornecedor excluido!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                    $scope.atualizaModals();
                }, 1000);
            });

            response.error(function (data, status, headers, config) {
                $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 1000);
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
            $scope.off = 'disabled';

            var response = $http.get('/SisNota/rest/fornecedor/');
            response.success(function (data) {
                $scope.fornecedor = data;
                $scope.$apply();
                console.log("[resetSearch] # of items: " + data.length);
            });

            response.error(function (data, status, headers, config) {
                $scope.alerts.push({type: 'danger', msg: 'Ops! Ocorreu um problema!', show: true});
                $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
                }, 1000);
                //alert("AJAX failed to get data, status=" + status);
            });
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