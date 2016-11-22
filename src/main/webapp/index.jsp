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
    </head>

    <body ng-controller="HttpCtrl as app" >
        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="include/jquery.min.js"></script>
        <script type="text/javascript" src="js/materialize.js"></script>
        <script type="text/javascript" src="include/jquery.mask.min.js"></script>
        <div class="container" >

            <div class="header">
                <a href="index.jsp"><img id="logo" src="include/logolrp.png" alt="Logo"/><h3 class="custom">J.A.R.V.I.S.</h3><h6 class="red-text" style="margin-top: -1.5%; font-weight: 400;">.beta</h6></a>
            </div>

            <div id="links">
                <a class="waves-effect light-blue btn-large" style="margin-right: 10px; margin-top: 1%; margin-bottom: 1%; width: 40%" href="fornecedores.jsp"><i class="material-icons left">assignment_ind</i>Manutenção de Fornecedores</a>
                <a class="waves-effect light-blue btn-large" style="margin-right: 10px; margin-top: 1%; margin-bottom: 1%; width: 40%" href="nota.jsp"><i class="material-icons left">tab</i>Manutenção de Notas</a>
            </div>

            <div class="MainBody" >
                <div class="leftPanel" >
                    <ul class="collapsible popout" data-collapsible="accordion">
                        <li>
                            <div id="LeftPanelHeader" class="collapsible-header light-blue lighten-1"><span class="white-text"><i class="material-icons left">assignment_ind</i>{{navTitleLeft}}</span></div>
                            <div class="collapsible-body" id="collection-item" ng-repeat="f in fornecedores" >
                                <span style="margin-left: 0.5%;">{{f.companyName}} - CNPJ: <i class="cnpj">{{f.cnpj}}</i></span>                                               
                            </div>
                        </li>
                    </ul>
                </div>            

                <div class="RightPanel" >                    
                    <ul class="collapsible popout" data-collapsible="accordion">
                        <li>
                            <div id="LeftPanelHeader" class="collapsible-header light-blue lighten-1"><span class="white-text"><i class="material-icons left">tab</i>{{navTitleRight}}</span></div>
                            <div class="collapsible-body" id="collection-item" ng-repeat="n in notas" >
                                <span style="margin-left: 0.5%;">{{n.number}} - Registro: {{n.id}}</span>
                            </div>
                        </li>                        
                    </ul>
                </div>               
            </div>

            <footer class="page-footer light-blue" style="margin-left: 2%; margin-right: 2%; margin-top: 0.1%;">
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