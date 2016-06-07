<html ng-app="app">
    <head>
        <title>J.A.R.V.I.S.</title>
        <link href="include/styles.css" rel="stylesheet">
        <!-- Use Bootstrap -->
        <link rel="stylesheet" href="include/bootstrap.min.js">
        <script src="include/jquery.min.js"></script>
        <script src="include/bootstrap.min.js"></script>
        <script type="text/javascript" src="include/angular.min.js"></script>
        <script type="text/javascript" src="include/app.js"></script>

        <!--Import Google Icon Font-->
        <link href="fonts/icon.css" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>		
        <meta charset="UTF-8">

        <script src="include/jquery.min.js"></script>
        <script type="text/javascript">
            $(function() {
            $(window).scroll(function() {
            if ($(this).scrollTop() !== 0) {
            $('#toTop').fadeIn();
            } else {
            $('#toTop').fadeOut();
            }
            });
            $('#toTop').click(function() {
            $('body, html').animate({scrollTop:0}, 800);
            });
            });
        </script>
    </head>

    <body ng-controller="HttpCtrl as app">
        
        <div id="toTop"><i class="material-icons left" style="font-size: 300%">navigation</i></div>
        
        <div class="container">
            <div class="header">
                <a href="index.jsp"><img id="logo" src="include/logolrp.png" alt="Logo"/><h3 class="custom">J.A.R.V.I.S.<h6 class="red-text" style="margin-top: -1.5%">.beta</h6></a></h3>
            </div>

            <form>
                <table>
                    <td><input type="text" ng-model="cnpj" size="30" placeholder="Buscar Fornecedor Por CNPJ"></td>   
                    <td><div class="controles-fornecedor">                                          
                            <button type="button" ng-click="getFornecedorPorCnpj(cnpj)" class="waves-effect light-blue btn-large" style="width: 32%; float: left; margin-right: 1%"><i class="material-icons left">search</i>Buscar</button>                                
                            <button ng-click="addNew()" class="waves-effect light-blue btn-large" style="width: 32%; float: left; margin-right: 1%"><i class="material-icons left">assignment_ind</i>Novo Fornecedor</button>
                            <button ng-click="resetSearch()"  class="waves-effect light-blue btn-large {{off}}" style="width: 32%; float: left; margin-right: 1%"><i class="material-icons left">replay</i>Limpar Campos</button>                                                   
                        </div></td>  
                </table>
            </form>

            <form id="main">
                <table>
                    <tr>
                        <td class="display_bold"><label for="cnpj">CNPJ</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input id="cnpj" type="number" ng-model="fornecedor.cnpj" pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})" required="true" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="fantasia">Nome Fantasia:</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input type="text" ng-model="fornecedor.companyName" size="30" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="uf">UF:</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input type="text" ng-model="fornecedor.fu" maxlength="2" value="{{ fornecedor.fu | uppercase}}" size="2" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="cidade">Cidade:</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input type="text" ng-model="fornecedor.city" size="20" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="bairro">Bairro:</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input type="text" ng-model="fornecedor.neighborhood" size="30" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="rua">Rua:</label></td>                                                
                    </tr>
                    <tr>
                        <td class="display"><input type="text" ng-model="fornecedor.address" size="30" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="numero">Número:</label></td>
                    </tr>                                        
                    <tr>
                        <td class="display"><input type="number" ng-model="fornecedor.number" size="80" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="ie">Inscrição Estadual:</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input type="number" ng-model="fornecedor.ie" size="10" ng-disabled="isSaveDisabled"></td>
                    </tr>

                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <table>
                        <tr>
                        <div class="fornecedor-controle">
                            <button type="button" ng-click="saveFornecedor(fornecedor)" class="waves-effect light-green btn-large {{off}}" style="width: 49%; float: left; margin-right: 1%; text-align: center;" ng-disabled="isSaveDisabled"><i class="material-icons left">library_add</i>Salvar Fornecedor</button>                                   
                            <button type="button" ng-click="deleteFornecedor(fornecedor.cnpj)" class="waves-effect red btn-large {{off}}" style="width: 49%; margin-left: 1%;" ng-disabled="isDeleteDisabled"><i class="material-icons left">delete</i>Excluir Fornecedor</button>                                     	                                  
                        </div>
                        </tr>
                    </table>

                </table>
            </form>

            <div class="MainBody">
                <div class="leftPanel" >
                    <div id="LeftPanelHeader" class="card-panel light-blue lighten-1"><a class="white-text" href="fornecedores.jsp">{{navTitleLeft}}</a></div>
                    <ul class="collection">
                        <li class="collection-item" ng-repeat="f in fornecedores" >
                            {{f.companyName}} - CNPJ: {{f.cnpj}}
                        </li>
                    </ul>
                </div>

                <div class="RightPanel" >
                    <div id="LeftPanelHeader" class="card-panel light-blue lighten-1"><a class="white-text"  href="nota.jsp">{{navTitleRight}}</a></div>
                    <ul class="collection">
                        <li class="collection-item" ng-repeat="n in notas" >
                            {{n.number}} - Registro: {{n.id}}
                        </li>
                    </ul>
                </div>               
            </div>
            <footer class="page-footer light-blue">
                <div class="footer-copyright">

                    <span style="margin-left: 0.5%;">T.I. Lojão Rio do Peixe   - Copyright ©</span>

                </div>
            </footer>
        </div>
    </body>
</html>