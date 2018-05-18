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
    <title>Materias</title>
    <link href="../Front/css/Menus.css" rel="stylesheet" type="text/css"/> 
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
<!--        <input type="button" id="prueba" value="prueba" onclick="prueba();" class=" btn btn-dark">
        <input type="button" id="pruebados" value="pruebad" onclick="pruebados();" class=" btn btn-dark">-->
        <div class="row">
            <div class="col-md-12">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" href="#" onclick="mostrarContenido();">Guardar</a>                    
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Buscar</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row" id="divGuardarMaterias" style="display:none;">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="text-center">Guardar Materias</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-2">
                                <label>Materias</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="txtmateria" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1">
                                <input type="button" onclick="guardarMateriasNuevas();" id="btnGuardar" value="Guardar" class="btn btn-danger">
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>
    
 <!--    Termina zona de trabajo-->
</body>
<script src="../../Boostrap/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="../../Boostrap/js/bootstrap.min.js" type="text/javascript"></script>

<script src="../Front/js/Menu.js" type="text/javascript"></script>
<script src="../Front/js/Materias.js" type="text/javascript"></script>
</html>
