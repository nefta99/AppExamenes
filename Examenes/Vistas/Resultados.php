<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
<?php session_start(); ?>    
<?php $usuario= $_SESSION['usuario'];?>
<head>
    <meta charset="UTF-8">
    <title>Examenes</title>
    <link href="../Front/css/Menus.css" rel="stylesheet" type="text/css"/> 
    <link href="../Front/css/Resultados.css" rel="stylesheet" type="text/css"/> 
    <link href="../../datatable/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../Boostrap/css/Boostrapt.css" rel="stylesheet" type="text/css"/>
    
</head>

<body>
    
    <input type="hidden" id="hdfusuario" value = "<?php echo $usuario; ?>">
    <nav>
        <ul id="crearmenu">            
            <li><a href="#" id="ACerrar">Cerrar</a></li>
        </ul>
    </nav>
<!--    aquí va la zona de trabajo-->
<div class="container">
    <div class="row">
        <div class="col-md-12" id="alertas">
                               
        </div>
    </div>
    <div class="row" id="divAdministrador" style="display:none;">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-1">
                        <label >Usuario</label>
                    </div>
                    <div class="col-md-2">
                        <input  type="text" value="" id="txtCapturaMatricula" class="form-control">
                    </div>
                    <div class="col-md-1">
                        <input type="button"  value="Buscar" class="btn btn-success" onclick="buscarUsuarios();" />
                    
                    </div>
                </div>
            </div>
            
    </div>
    <div class="row" id="divAlumno" style="display:none;">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-1">
                    <label>Usuario</label>
                </div>
                <div class="col-md-1">
                    <strong>  <label id="lblmatricula"></label></strong>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-1">
                    <lable>
                        Nombre
                    </lable>
                </div>
                <div class="col-md-3">
                    <strong> <lable id="lblNombre"></lable></strong>
                </div>     
            </div> 
            <br/>
            <div class="row">
                <div class="col-md-1">
                    <label>Materia</label>
                </div>
                <div class="col-md-3" >
                    <select id="ddlMateria" class="form-control" onchange="catalogoCapitulos();">
                            
                    </select>
                </div>                    
            </div>
            <div class="row">
                <div class="col-md-1">
                    <label>Capitulo</label>
                </div>
                <div class="col-md-3" >
                    <select id="ddlCapitulo" class="form-control">
                            
                    </select>
                </div>
                <div class="col-md-2">
                    <input type="button" value="Calificación" id="btnExamen"  onclick="PintarExamen();" class="btn btn-warning" style="display:block"/>
                </div>
                <div class="col-md-1">
                    <input type="button" value="Reabir" id="btniniciarbusqueda"  onclick="iniciarBusqueda();" class="btn btn-primary" style="display:none"/>
                </div>
<!--                    <div class="col-md-1">
                        <input type="button" value="Calificar" id="btnejemplo"  onclick="cali();" class="btn btn-primary" style="display:block"/>
                    </div>-->
            </div>               
        </div>                   
    </div> 
    <div class="row" id="divExamen">
        <div class="col-md-12">
            <div id="TrabajoExamen">
                    
            </div>
                    
        </div>          
    </div>
</div>
 <!--    Termina zona de trabajo-->
</body>
<script src="../../Boostrap/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="../../Boostrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../../datatable/js/jquery.dataTables.min.js" type="text/javascript"></script>

<script src="../Front/js/Menu.js" type="text/javascript"></script>
<script src="../Front/js/Resultados.js" type="text/javascript"></script>
</html>
