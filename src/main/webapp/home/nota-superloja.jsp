<!DOCTYPE html>
<html ng-app="app">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">

        <title>J.A.R.V.I.S.</title>

        <link href="css/font-awesome.min.css" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/mdb.min.css" rel="stylesheet">
                <style>
            html {
                font-size: 90%;
            }
        </style>
        <style rel="stylesheet">
            /* TEMPLATE STYLES */

            main {
                margin-top: 1rem;
                ;
            }

            main .card {
                margin-bottom: 1rem;
            }

            @media only screen and (max-width: 768px) {
                .read-more {
                    text-align: center;
                }
            }
        </style>      

    </head>

    <body ng-controller="HttpCtrl as app">

        <header>
            <!--Navbar-->
            <nav class="navbar navbar-dark bg-primary">
                <!-- Collapse button-->
                <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapseEx">
                    <i class="fa fa-bars"></i>
                </button>

                <div class="container">

                    <!--Collapse content-->
                    <div class="collapse navbar-toggleable-xs" id="collapseEx">
                        <!--Navbar Brand-->
                        <a class="navbar-brand" href="./" target="_blank">LRP</a>
                        <!--Links-->
                        <ul class="nav navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="./">Início</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="fornecedores.jsp">Fornecedores</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="nota.jsp">Notas Fiscais</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="nota-superloja.jsp">Últimas Entradas<span class="sr-only">(current)</span></a>
                            </li>                             
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="modal" data-target="#myModal3" href="#myModal3">Sobre</a>
                            </li>
                        </ul>
                     <form class="form-inline">
                        <input class="form-control" type="text" ng-model="code" size="30" placeholder="Busca por código do produto" >
                        <button type="button" ng-click="getNotaPorCodigo(code)" class="btn btn-primary btn-rounded btn-sm" >Buscar</button>
                    </form>
                        
                    </div>
                    <!--/.Collapse content-->

                </div>

            </nav>
            <!--/.Navbar-->
        </header>
        
        <div style="float: top; position: relative; width: 100%; z-index: 10;">
        <alert class="alert" style="left: 50%; position: absolute; transform: translateX(-50%);" ng-repeat="alert in alerts" ng-class="'alert-' + (alert.type || 'warning')"  close="closeAlert()" ><strong>{{alert.msg}}</strong></alert>
        </div>
        
        <img style="float: top; width: 100%; padding-bottom: 0.1%; opacity: 0.8; filter: alpha(opacity=80); /* For IE8 and earlier */" src="img/oldbg.jpg" alt="Notas Fiscais"/>
        <main>
            <!--Main layout-->
            <div class="container" style="font-size: 80%; width: 90%;">               

                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th class="text-lg-center" data-field="fl">Código de Compra</th>
                            <th class="text-lg-center" data-field="flname">Data de Entrada</th>
                            <th class="text-lg-center" data-field="brutepriceprod">Chave da Nota Fiscal</th>
                            <th class="text-lg-center" data-field="totalreturnedprod">Número da Nota Fiscal</th>
                            <th class="text-lg-center" data-field="brutepriceserv">Código de Produto</th>
                            <th class="text-lg-center" data-field="canceledserv">Descrição do Produto</th>
                            <th class="text-lg-center" data-field="tickettotal">Nome do Fornecedor</th>
                        </tr>
                    </thead>

                    <tbody ng-repeat="s in olds">
                        <tr>
                            <td class="text-lg-center" style="color: #0059bc; font-weight: bold;">{{s.codigoCompra}}</td>
                            <td class="text-lg-center" style="color: red; font-weight: bold;">{{s.dataEntrada | date:"dd/MM/yyyy"}}</td>
                            <td class="text-lg-center" style="color: #0059bc; font-weight: bold;">{{s.chaveNotaFiscal}}</td>
                            <td class="text-lg-center" style="color: red; font-weight: bold;">{{s.numeroNotaFiscal}}</td>
                            <td class="text-lg-center" style="color: #0059bc; font-weight: bold;">{{s.codigoProduto}}</td>
                            <td class="text-lg-center" style="color: red; font-weight: bold;">{{s.descricaoProduto}}</td>
                            <td class="text-lg-center" style="color: #0059bc; font-weight: bold;">{{s.nomeFornecedor}}</td>
                        </tr>  
                    </tbody>
                </table>  
                    <div class="control-table">
                       
                        <div class="fornecedor-controle">
                            <button ng-click="addNew()" class="btn btn-primary" style="width: 31%; display: inline; margin-right: 0.0%" ng-disabled="isAddDisabled">Incluir</button>                                                                               
                            <button type="button" ng-click="saveNota(nota)" class="btn btn-success {{off}}" style="width: 31%; display: inline; margin-right: 0.0%" ng-disabled="isSaveDisabled">Salvar</button>                                   
                            <button type="button" ng-click="deleteNota(nota.id)" class="btn btn-danger {{off}}" style="width: 31%; display: inline; margin-right: 0.0%" ng-disabled="isDeleteDisabled">Excluir</button>                                     	                                  
                        </div>
                        
                    </div>                
            </div>
            <!--/.Main layout-->
        </main>

        <!--Footer-->
        <footer class="page-footer center-on-small-only navbar-dark bg-primary">
            <!--Footer links-->
            <div class="container-fluid">
                <div class="row">
                    <!--First column-->
                    <div class="col-md-3 offset-md-1">
                        <h5 class="title">Sobre o J.A.R.V.I.S.</h5>
                        <p>O sistema J.A.R.V.I.S. é uma solução para o controle de Fornecedores, Notas Fiscais e IMEI.</p>
                        <p>Desenvolvido pela T.I. Lojão Rio do Peixe, para uso interno, no auxílio da localização das notas ficais correspondentes aos IMEI's buscados.</p>
                    </div>
                    <!--/.First column-->
                    <hr class="hidden-md-up">
                    <!--Second column-->
                    <div class="col-md-2 offset-md-1">
                        <h5 class="title">REDES SOCIAIS</h5>
                        <ul>
                            <li>
                                <a href="https://www.instagram.com/lojaoriodopeixe/">Instagram</a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/LojaoRiodoPeixe/">Facebook</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/lojaoriodopeixe">Twitter</a>
                            </li>
                            <li>
                                <a href="https://issuu.com/lojaoriodopeixe/docs">Issuu</a>
                            </li>
                        </ul>
                    </div>
                    <!--/.Second column-->
                    <hr class="hidden-md-up">
                    <!--Third column-->
                    <div class="col-md-2">
                        <h5 class="title">LINKS ÚTEIS</h5>
                        <ul>
                            <li>
                                <a href="http://sabium.com.br">Sabium Sistemas</a>
                            </li>
                            <li>
                                <a href="http://idg.receita.fazenda.gov.br">Receita Federal</a>
                            </li>
                            <li>
                                <a href="https://www.danfeonline.com.br">Danfe Online</a>
                            </li>
                            <li>
                                <a href="http://www.sintegra.gov.br">Sintegra</a>
                            </li>
                        </ul>
                    </div>
                    <!--/.Third column-->
                    <hr class="hidden-md-up">
                    <!--Fourth column-->
                    <div class="col-md-2">
                        <h5 class="title">Grupo Rio do Peixe</h5>
                        <ul>
                            <li>
                                <a href="http://www.lojaoriodopeixe.com.br/">Lojão Rio do Peixe</a>
                            </li>
                            <li>
                                <a href="http://www.gruporiodopeixe.com.br/cristalina-dos-alpes">Cristalina do Alpes</a>
                            </li>
                            <li>
                                <a href="http://www.gruporiodopeixe.com.br/telerio">Tele Rio</a>
                            </li>
                            <li>
                                <a href="http://www.gruporiodopeixe.com.br/river">River</a>
                            </li>
                        </ul>
                    </div>
                    <!--/.Fourth column-->
                </div>
            </div>
            <!--/.Footer links-->
            <hr>

            <!--Copyright-->
            <div class="footer-copyright">
                <div class="containter-fluid">
                    © 2016 Copyright: <a href="http://www.lojaoriodopeixe.com.br/"> T.I. - Lojão Rio do Peixe</a>
                </div>
            </div>
            <!--/.Copyright-->
        </footer>
        <!--/.Footer-->
        
        <script type="text/javascript" src="js/angular.min.js"></script>
        <script type="text/javascript" src="js/app3.js"></script>
        <script type="text/javascript" src="js/ui-bootstrap-tpls-0.6.0.js"></script>        
        <script type="text/javascript" src="js/jquery-2.2.3.min.js"></script>
        <script type="text/javascript" src="js/jquery.mask.min.js"></script>
        <script type="text/javascript" src="js/tether.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/mdb.min.js"></script>
        <script type="text/javascript" src="js/custom.js"></script>

        <!-- Modal Fornecedores -->
        <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Fornecedores Cadastrados</h4>
                    </div>
                    <div class="modal-body">                                         
                        <ul class="list-group">
                            <li class="list-group-item" ng-repeat="f in fornecedores| orderBy: '-companyName' : 'true' ">
                                <span class="tag tag-default tag-pill float-xs-right">{{f.cnpj}}</span>
                                {{f.companyName}}
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn light-blue" data-dismiss="modal">Fechar</button>        
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal NF -->
        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Notas Fiscais Cadastradas</h4>
                    </div>
                    <div class="modal-body">                                         
                        <ul class="list-group">
                            <li class="list-group-item" ng-repeat="n in notas| orderBy: '-id'">
                                <span class="tag tag-default tag-pill float-xs-right">Registro {{n.id}}</span>
                                Número: {{n.number}}
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn light-blue" data-dismiss="modal">Fechar</button>        
                    </div>
                </div>
            </div>
        </div>        

        <!-- Modal Sobre -->
        <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">SOBRE O J.A.R.V.I.S.</h4>
                    </div>
                    <div class="modal-body">                                         
                        <p>O sistema J.A.R.V.I.S. é uma solução para o controle de Fornecedores, Notas Fiscais e IMEI.</p>
                        <p>Desenvolvido pela T.I. Lojão Rio do Peixe, para uso interno, no auxílio da localização das notas ficais correspondentes aos IMEI's buscados.</p>

                        <div class="modal-footer">
                            <button type="button" class="btn light-blue" data-dismiss="modal">Fechar</button>        
                        </div>
                    </div>
                </div>
            </div>        


    </body>

</html>