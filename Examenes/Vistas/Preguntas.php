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
                        <a class="nav-link" href="#" onclick="busqueda();">Buscar</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row" id="divGuardarPreguntas" style="display:none;">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="text-center">Guardar preguntas</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-2">
                                <label>Materia</label>
                            </div>
                            <div class="col-md-2">
                                <select id="ddlmateria" class="form-control" onchange="catalogocapitulos();">
                                    <option value="volvo">Volvo</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Capitulo</label>
                            </div>
                            <div class="col-md-2">
                                <select id="ddlcapitulo" class="form-control">
                                  
                                </select>
                            </div>                            
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-md-2">Pregunta</div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="txtpregunta">
                            </div>                            
                        </div>
                        </br>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Tipo de componente</label>
                            </div>
                            <div class="col-md-2">
                                <select id="ddlcomponente" class="form-control">
                                    <option value="volvo">Volvo</option>
                                </select>
                            </div>
                            <div class="col-md-1">
                                <input type="button" class="btn btn-success" id="btnGuardar" value="Guardar" onclick="guardaPregunta();" >
                            </div>
                            <div class="col-md-1">
                                <input type="button" class="btn btn-danger" id="btnGuardarCancelar" value="Cancelar" onclick="cancelarGuardarPregunta();" >
                            </div>
                            <div class="col-md-1">
<!--                                <input type="button" class="btn btn-danger" id="btncalar" value="prueba" onclick="prueba();" >-->
                            </div>
                            <input type="hidden" id="hdfIdPregunta" value="1"/>
                        </div>                        
                    </div>
                </div>
            </div>            
        </div>
        <div class="row" id="divguardarRespuestas" style="display:none;">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="text-center"> Guardar respuestas </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 text-center">
                        <label>Agregar Respuesta</label>
                    </div>
                    <div class="col-md-2 text-center">
                        <label>Valor</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <label>1.-</label>  
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="txtrespuesta1" class="form-control">
                    </div>
                    <div class="col-md-2">
                        <input type="text" id="txtvalor1" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <label>2.-</label>  
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="txtrespuesta2" class="form-control">
                    </div>
                    <div class="col-md-2">
                        <input type="text" id="txtvalor2" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <label>3.-</label>  
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="txtrespuesta3" class="form-control">
                    </div>
                    <div class="col-md-2">
                        <input type="text" id="txtvalor3" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <label>4.-</label>  
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="txtrespuesta4" class="form-control">
                    </div>
                    <div class="col-md-2">
                        <input type="text" id="txtvalor4" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <label>5.-</label>  
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="txtrespuesta5" class="form-control">
                    </div>
                    <div class="col-md-2">
                        <input type="text" id="txtvalor5" class="form-control">
                    </div>
                    <div class="col-md-1">
                        <input type="button"  class="btn btn-success" value="Guardar" onclick="guardarRespuestas();">
                    </div>
                </div>
            </div>
        </div>
        <!--        zona de buscar materias-->
        <div class="row" id="divBuscarPregunta" style="display:none;">
            <div class="col-md-12">               
                <div id="divactualizarCapitulo" style="display:none;">                    
                </div>
                
            </div>
        </div>
        <div class="row" id="divEditarPreguntas" style="display:none;">   
            <input type="hidden" id="hdfIdPreguntaEditar" value="">
            
            <div class="col-md-12">
                 <div class="row "  > 
                    <div class="col-md-12" >
                        <h2 class="text-center">Editar pregunta</h2>
                    </div>
                </div>
                      <div class="row"   >
                    <div class="col-md-1">
                        <label >Materia</label>
                    </div>
                    <div class="col-md-3">
                        <select id="ddlmateriaeditar" onchange="cambiarCapitulos();" class="form-control">
                            <option value="volvo">Volvo</option>
                        </select>
                    </div> 
                    <div class="col-md-2">
                        <label>Capitulo</label>    
                    </div>
                    <div class="col-md-3">
                         <select id="ddlcapituloEditar" class="form-control">
                            <option value="volvo">Volvo</option>
                        </select>
                    </div>
                    
                    <input type="hidden" id="hdfIdcaputulo" value="" >
                </div>
                <br/>
                <div class="row">
                    <div class="col-md-1">
                        <label>Pregunta</label>
                    </div>
                    <div class="col-md-9">
                        <input type="text" id="txtPreguntaEditar" class="form-control">
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-md-1">
                        <label>Componente</label>
                    </div>
                    <div class="col-md-3">
                        <select id="ddlcomponenteeditar" class="form-control">
                            <option value="volvo">Volvo</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <input type="button" value="Editar" onclick="editar();" class="btn btn-success"> 
                    </div>
                    <div class="col-md-1">
                        <input type="button" value="Cancelar"class="btn btn-danger"  onclick="cancelaEditarPregunta();">
                    </div>
                </div>
                <br />   
            </div>
      
        </div>
        <div class="row" id="divEditarRespuesta" style="display:none;">
            <input type="hidden" id="preguntaEditarTxt" value="">
            <div class="col-md-12">
                <h2 class="text-center" >Editar Respuesta</h2>
                <div class="row">
                    <div class="col-md-4 text-center">
                        <lable>Editar Respuesta</lable>
                    </div>
                    <div class="col-md-2 text-center">                        
                        <lable>Valor</lable>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label>
                            1.-
                        </label>
                    </div>
                    <div class="col-md-3">
                        <input type="hidden" class="form-control" id="hdfR1">
                        <input type="text" class="form-control" id="txtEditaR1">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" id="txtEditaV1">
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label>
                            2.-
                        </label>
                    </div>
                    <div class="col-md-3">
                        <input type="hidden" class="form-control" id="hdfR2">
                        <input type="text" class="form-control" id="txtEditaR2">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" id="txtEditaV2">
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label>
                            3.-
                        </label>
                    </div>
                    <div class="col-md-3">
                        <input type="hidden" class="form-control" id="hdfR3">
                        <input type="text" class="form-control" id="txtEditaR3">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" id="txtEditaV3">
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label>
                            4.-
                        </label>
                    </div>
                    <div class="col-md-3">
                        <input type="hidden" class="form-control" id="hdfR4">
                        <input type="text" class="form-control" id="txtEditaR4">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" id="txtEditaV4">
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label>
                            5.-
                        </label>
                    </div>
                    <div class="col-md-3">
                        <input type="hidden" class="form-control" id="hdfR5">
                        <input type="text" class="form-control" id="txtEditaR5">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" id="txtEditaV5">
                    </div>
                    <div class="col-md-1">
                        <input type="button" value="Editar" onclick="validacionesEditar();" class="btn btn-success">
                    </div>
                    <div class="col-md-1">                        
                        <input type="button" value="Cancelar" onclick="cancelarEditarRespuestas();" class="btn btn-danger">
                        
                    </div>
                </div>
                </br>
                <div class="row">
                
                </div>
                
            </div>
            <input type="hidden" value="" id="hdfTipoComponente">
        </div>
        
        <div class="row" id="divTablaPreguntas">
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
<script src="../Front/js/Preguntas.js" type="text/javascript"></script>
</html>
