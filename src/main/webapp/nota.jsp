<html ng-app="app">
    <head>
        <title>J.A.R.V.I.S.</title>
        <link href="include/styles.css" rel="stylesheet">
        <!-- Use Bootstrap -->
        <link rel="stylesheet" href="include/bootstrap.min.js">
        <script src="include/jquery.min.js"></script>
        <script src="include/bootstrap.min.js"></script>
        <script type="text/javascript" src="include/angular.min.js"></script>
        <script type="text/javascript" src="include/app2.js"></script>

        <!--Import Google Icon Font-->
        <link href="fonts/icon.css" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>		
        <meta charset="UTF-8">

        <script src="include/jquery.min.js"></script>
        <script type="text/javascript" src="include/jquery.mask.min.js"></script>
        <script type="text/javascript">
            $(function () {
                $(window).scroll(function () {
                    if ($(this).scrollTop() !== 0) {
                        $('#toTop').fadeIn();
                    } else {
                        $('#toTop').fadeOut();
                    }
                });
                $('#toTop').click(function () {
                    $('body, html').animate({scrollTop: 0}, 800);
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
                    <td><input type="text" ng-model="imei" size="30" placeholder="Buscar Notas Fiscais Por IMEI ou Registro"></td>   
                    <td><div class="nota-controle">                                         
                            <button type="button" ng-click="getNotaPorImei(imei)" class="waves-effect light-blue btn-large" style="width: 32%; float: left; margin-right: 1%"><i class="material-icons left">search</i>Buscar</button>                                
                            <button ng-click="addNew()" class="waves-effect light-blue btn-large" style="width: 32%; float: left; margin-right: 1%"><i class="material-icons left">tab</i>Incluir Nota Fiscal</button>
                            <button ng-click="resetSearch()"  class="waves-effect light-blue btn-large {{offNota}}" style="width: 32%; float: left; margin-right: 1%"><i class="material-icons left">replay</i>Limpar Campos</button>                                                   
                        </div></td>  
                </table>
            </form>

            <form id="main">
                <table>
                    <tr>
                        <td class="display_bold"><label for="numero">Número da Nota</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input id="numero" type="text" ng-model="nota.number" name="nota.numero" size="4" required="true" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="dataEmissao">Data Emissão:</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input type="date" ng-model="nota.issuanceDate" value="{{nota.issuanceDate}}" name="nota.dataEmissao" required="true" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr>
                        <td class="display_bold"><label for="dataChegada">Data Entrada:</label></td>
                    </tr>
                    <tr>
                        <td class="display"><input type="date" ng-model="nota.dateEntry" value="{{nota.dateEntry}}" name="nota.dataEntrada" required="true" ng-disabled="isSaveDisabled"></td>
                    </tr>
                    <tr><td class="display_bold"><label for="imei">IMEI's:</label></td></tr>
                    <tr>
                        <td class="input_fields_wrap">
                            <textarea  ng-model="nota.imei" name="nota.imei" ng-list="&#10;" ng-trim="false" required="true" ng-disabled="isSaveDisabled" style="height: 200%;"></textarea></td>                            
                    </tr>                                           
                    <td class="display_bold"><label for="fornecedor">CNPJ do Fornecedor:</label></td>
                    </tr>
                    <tr>
                        <td class="display">
                            <input type="text" ng-model="nota.cnpjFornecedor.id" list="fornecedores" name="fornecedor" ng-disabled="isSaveDisabled" class="input-field col s12">
                        <datalist id="fornecedores">
                                <option ng-repeat="fornecedor in fornecedores" value="{{fornecedor.id}}">{{fornecedor.cnpj}} {{fornecedor.companyName}}</option>  </td>                                  
                        </datalist>
                        </select>                                                
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <table>
                        <tr>
                        <div class="notas-controle">
                            <button type="button" ng-click="saveNota(nota)" class="waves-effect light-green btn-large {{offNota}}" style="width: 49%; float: left; margin-right: 1%; text-align: center;" ng-disabled="isSaveDisabled"><i class="material-icons left">library_add</i>Salvar Nota Fiscal</button>                                   
                            <button type="button" ng-click="deleteNota(nota.id)" class="waves-effect red btn-large {{offNota}}" style="width: 49%; margin-left: 1%;" ng-disabled="isDeleteDisabled"><i class="material-icons left">delete</i>Excluir Nota Fiscal</button>                                     	                                  
                        </div>
                        </tr>
                    </table>
                </table>
            </form>


            <div class="MainBody">
                <a href="#fornecedor"></a>
                <div class="leftPanel" >
                    <div id="LeftPanelHeader" class="card-panel light-blue lighten-1"><a class="white-text" href="fornecedores.jsp">{{navTitleLeft}}</a></div>
                    <ul class="collection">
                        <li class="collection-item" ng-repeat="f in fornecedores" >
                            {{f.companyName}} - CNPJ: <i class="cnpj">{{f.cnpj}}</i>
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
        <script type="text/javascript">
  $(function() {
    $('.cnpj').mask('00.000.000/0000-00');
  });
        </script>        

    </body>
</html>