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
    <div class="row">
        <div class="col-md-12">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link  " href="#" onclick="guardarContenido();">Guardar</a>                    
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#" onclick="mostrarTabla();">Buscar</a>
                </li>
            </ul>
        </div>
    </div>
    <div id="divGuardarUsuarios" style="display:none;">
        <div class="col-md-12">
            <br>
            <div class="row">
                <div class="col-md-2">
                    <label>Nombre</label>
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtNombre" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>A. Paterno</label>                    
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtPaterno" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>A. Materno</label>                    
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtMaterno" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label> Tipo usuario <label>
                </div>
                <div class="col-md-2">
                    <select class="form-control" id="ddlTipoUsuario">  
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>Usuario</label>
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtUsuario"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>
                        Contraseña
                    </label>
                </div>
                <div  class="col-md-2">
                    <input type="password" id="txtpassword" value="" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-md-1">
                    <input type="button" value="Guardar" class="btn btn-primary" onclick="agregarUsuario();"> 
                </div>
                <div class="col-md-1">
                    <input type="button" value="Cancelar" class="btn btn-danger" onclick="cancelarGuardada();"> 
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="display:none" id="divmensaje">
        <div class="col-md-12">
            
            <h2 class="text-center">Usuarios</h2>
        </div>
    </div>
    <div id="diveditarUsuario" style="display:none;">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-2">
                    <label>Nombre</label>
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtNombreup" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>A. Paterno</label>                    
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtPaternoup" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>A. Materno</label>                    
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtMaternoup" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label> Tipo usuario <label>
                </div>
                <div class="col-md-2">
                    <select class="form-control" id="ddlTipoUsuarioup">  
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>Usuario</label>
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" id="txtUsuarioup"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label>
                        Contraseña
                    </label>
                </div>
                <div  class="col-md-2">
                    <input type="password" id="txtpasswordup" value="" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-md-1">
                    <input type="button" value="Editar" class="btn btn-primary" onclick="editarUsuario();"> 
                </div>
                <div class="col-md-1">
                    <input type="button" value="Cancelar" class="btn btn-danger" onclick="cancelarupd();"> 
                </div>
            </div>
        </div>
    </div>
    <div id="divtabla" class="row" style="display:none;">
        <div class="col-md-12">
            <table id="example" class="display" width="100%"></table>
        </div>
    </div>
    
</div>
 <!--    Termina zona de trabajo-->
</body>
<script src="../../Boostrap/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="../../Boostrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../../datatable/js/jquery.dataTables.min.js" type="text/javascript"></script>

<script src="../Front/js/Menu.js" type="text/javascript"></script>
<script src="../Front/js/Usuarios.js" type="text/javascript"></script>
</html>
