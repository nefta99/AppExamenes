<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Agregar paginas</title>
<!--        <link href="css/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
        <script src="cssinicio/jquery/jquery-3.2.1.min.js" type="text/javascript"></script>
        <script src="css/bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
        -->
       
        <script src="cssinicio/jquery/jquery-3.2.1.min.js" type="text/javascript"></script>
        <!--Esto es para boostrapt-->                
        <link href="css/bootstrap-3.3.7-dist/css/bootstrap.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>        
        <script src="css/bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="css/bootstrap-3.3.7-dist/js/bootstrap.js" type="text/javascript"></script>
        
        <!--Esto es para Datatable -->
        <link href="../script/datatable/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>
<!--        <script src="../script/datatable/js/jquery-1.11.3.min.js" type="text/javascript"></script>-->
        <script src="../script/datatable/js/jquery.dataTables.min.js" type="text/javascript"></script>    
        

        
          <link href="css/Generales.css" rel="stylesheet" type="text/css"/>
          <script src="css/Agregar.js" type="text/javascript"></script>
    </head>
    <body>
        
        <!-- Modal -->
        <div id="agregarda" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Agregar</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                    <div class="col-md-2">
                        Titulo
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="txtTitulo" class="form-control" >
                    </div>            
                </div>
                <div class="row">
                    <div class="col-md-2">
                        body
                    </div>
                    <div class="col-md-4">
                        <textarea class="form-control" id="txtbody"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        Leyenda Html
                    </div>
                    <div class="col-md-4">
                        <textarea class="form-control" id="txtleyendaHtml"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        html  mostrar
                    </div>
                    <div class="col-md-4">
                        <textarea class="form-control" id="txthtmlmostrar"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        leyenda css
                    </div>
                    <div class="col-md-4">
                        <textarea class="form-control" id="txtLeyendacss"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        css mostrar
                    </div>
                    <div class="col-md-4">
                        <textarea class="form-control" id="txtCssMostrar"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        ubicación css
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="txtubicacion"  class="form-control">                
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        Link
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="txtlink"  class="form-control">                
                    </div>
                </div>              
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                <button type="button" id="btnGuardar" class="btn btn-primary" data-dismiss="modal">Guardar</button>
              </div>
            </div>

          </div>
        </div>
        
        <div class="row">
            <div class="col-md-offset-1 col-md-2">
                
                <button id="btnAgregar"  class="btn btn-primary">Agregar</button>
            </div>
        </div>
    </body>
    <div class="row">
        <div class="col-md-12">
             <table id="example" class="display" width="100%"></table>
        </div>
    </div>
    
</html>
