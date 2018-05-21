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
    <title>Capitulos</title>
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
<!--    <input type="button" id="prueba" value="prueba" onclick="prueba();" class=" btn btn-dark">
        <input type="button" id="pruebados" value="pruebad" onclick="pruebados();" class=" btn btn-dark">-->
        <div class="row">
            <div class="col-md-12">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link  " href="#" onclick="mostrarContenido();">Guardar</a>                    
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#" onclick="mostrarBuscarCapitulos();">Buscar</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row" id="divGuardarCapitulos" style="display:none;">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="text-center">Guardar Capitulos</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-2">
                                <label>Materia</label>
                            </div>
                            <div class="col-md-2">
                                <select id="ddlmateria" class="form-control">
                                    <option value="volvo">Volvo</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Capitulo</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" id="txtcapitulo" class="form-control">
                            </div>
                            <div class="col-md-1">
                                <input type="button" onclick="guardarCapitulosnuevos();" id="btnGuardar" value="Guardar" class="btn btn-success">
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>            
        </div>
        <!--        zona de buscar materias-->
        <div class="row" id="divBuscarCapitulo" style="display:none;">
            <div class="col-md-12">
                <div class="row "  > 
                    <div class="col-md-12" >
                        <h2 class="text-center">Editar capitulo</h2>
                    </div>
                </div>
                <div id="divactualizarCapitulo" style="display:none;">
                    <div class="row"   >
                    <div class="col-md-2">
                        <label >Materia</label>
                    </div>
                    <div class="col-md-2">
                        <select id="ddlmateriaeditar" class="form-control">
                            <option value="volvo">Volvo</option>
                        </select>
                    </div> 
                    <div class="col-md-2">
                        <label>Capitulo</label>    
                    </div>
                    <div class="col-md-2">
                        <input type="text" id="txtcapituloeditar" class="form-control">
                    </div>
                    <div class="col-md-1">
                        <input type="button" value="Editar" onclick="editar();" class="btn btn-success"> 
                    </div>
                    <div class="col-md-1">
                        <input type="button" value="Cancelar"class="btn btn-danger"  onclick="cancelaEditar();">
                    </div>
                    <input type="hidden" id="hdfIdcaputulo" value="" >
                </div>
                </div>
                
            </div>
        </div>
        <div class="row" id="divTablaMaterias">
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
<script src="../Front/js/Capitulos.js" type="text/javascript"></script>
</html>
