$(document).ready(function(){
    cargarMateria();
    var usuario =$("#hdfusuario").val();
    var paramentros = {
        "opt": "VerTipoUsuario","usuario":usuario
        };
    $.ajax({
        url:  '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {   
            if(data.TipoUsuario=='Administrador')
            {
                $("#htipoUsuario").val('Administrador');
                $("#divAdministrador").css({"display":"block"});
                //$("#btncalcelarbusqueda").css({"display":"block"});
                $("#btniniciarbusqueda").css({"display":"block"});
                
                console.log("Administrador");
            }
            else //puede ser alumno(a)
            {
                console.log("Alumno");
                $("#htipoUsuario").val('Alumno');
                $("#btncalcelarbusqueda").css({"display":"none"});
                $("#divAdministrador").css({"display":"none"});
                var us = $("#hdfusuario").val();
                $("#lblmatricula").text(us);
                 $("#divAlumno").css({"display":"block"});
                vernombre(us);
            }
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
});

/***************************************************************************************************************************************************/
function alertaError(texto)
{
    var htn ='<div class="alert alert-danger" role="alert"  >';    
        htn += '<strong>Error! </strong>'+texto+' </a>.';
        htn += ' </div>';
        
    $("#alertas").html(htn);
}
function alertaExito(texto)
{
    var htn ='<div class="alert alert-success" role="alert"  >';    
        htn += '<strong>Exito! </strong>'+texto+' </a>.';
        htn += ' </div>';
        
    $("#alertas").html(htn);
    
    
}
/******************************************************************************************************/
function cerrarAlerta()
{
    $(".alert").alert('close');
}
/******************************************************************************************************/
function buscarUsuarios(){
    var usuario = $("#txtCapturaMatricula").val();
    var paramentros = {
        "opt": "busquedaUsuario",
        "usuario":usuario
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {
            cerrarAlerta();
            $("#lblmatricula").text('');
            $("#lblNombre").text('');
            if(data[0].Resultado=='Existe')
            {
                
                var nombre = data[0].Nombre + ' '+ data[0].ApellidoPaterno + ' '+ data[0].ApellidoMaterno;
                var usuari= $("#txtCapturaMatricula").val();
                $("#lblmatricula").text(usuari);
                $("#lblNombre").text(nombre);
                $("#divAdministrador").css({"display":"none"});
                $("#txtCapturaMatricula").val('');
                $("#divAlumno").css({"display":"block"});
            }
            else
            {                
                alertaError('El usuario que busca no existe');
                 $("#divAlumno").css({"display":"none"});
            }
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/*************************************************************************************************************************/
function cargarMateria(){
    var paramentros = {
        "opt": "cargarMateriasCatalogo"
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) { 
            var htm='';
             $("#ddlMateria").empty();
            for(var i =0 ;i< data.length ;i++){
                if(i==0){
                   htm+='<option value="X">Seleccione</option>';
                    htm+='<option value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                }
                else{
                    htm+='<option value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                }
            }
            $("#ddlMateria").append(htm);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/***************************************************************************************************************/

function catalogoCapitulos(){
    $("#ddlCapitulo").empty();
    var materia =$("#ddlMateria").val();
    var paramentros = {
        "opt": "cargarCapitulosCatalogo",
        "idmateria":materia
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {  
            $("#ddlCapitulo").empty();
            var htm ='';
            for(var i =0 ;i<data.length;i++) {
                if(i==0){
                    htm +='<option value="X">Seleccione</option>';
                    htm +='<option value="'+data[i].IdCapitulo+'">'+data[i].Capitulo+'</option>';
                }
                else{
                    htm +='<option value="'+data[i].IdCapitulo+'">'+data[i].Capitulo+'</option>';   
                }
                    
            }
            $("#ddlCapitulo").append(htm);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/*******************************************************************************************************************************/
function iniciarBusqueda(){
    cerrarAlerta();
    $("#TrabajoExamen").empty();
    $("#divAdministrador").css({"display":"block"});
    $("#divAlumno").css({"display":"none"});
    
}
/*************************************************************************************************************************/
function PintarExamen(){
    cali();
}
/*************************************************************************************************************************/
function cali(){
    var idspreguntas="";
    var usuario = $("#lblmatricula").html().trim();
    var idcapitu =$("#ddlCapitulo").val();
    var idmateria =$("#ddlMateria").val();
    var obj = ajaxpreguntas(usuario,idcapitu);
    if(hayexamen(idmateria,idcapitu)){
        if (obj !=null)
        {
            for(var z=0;z<obj.length;z++){
                idspreguntas +=  obj[z].IdPregunta + ",";
            }
            var res;
            if(idspreguntas.length>0){
                idspreguntas = idspreguntas.substring(0,idspreguntas.length-1);
                res = mostrarCalificacionExamen(usuario, idspreguntas);    
                var html;
                var calificacion =(parseFloat(res.Resultado) * 100);
                if( calificacion> 50 ){
                    //pasate el examen
                    html =' <div class="aprobado">Felicidades pasaste Tu Calificacion es :<span class="letraAprobado"> '+calificacion+'</span> </div>';
                }
                else
                {
                     html =' <div class="reprobado"> <b> Favor de ponerte a repasar tus Capitulos </b>Tu Calificación es de : <span class="letraReporbado"> '+calificacion+'</span> </div>';
                }
               
                $("#TrabajoExamen").append(html);
            }
        }
        else
        {
            alertaError("Aun no se ha realizado la evaluación");
        }
    }
    else
    {
       alertaError("No existe examen para esta selección.");
    }
    
    
    //esto se tiene que poner en crearEvaluacion ahorita solo es prueba
    
    
    
}
/*************************************************************************************************************************************************************************/
function hayexamen(materia,capitulo){
    var bandera=false;
    var paramentros = {
        "opt": "ayexamenpintar",
        "materia":materia,
        "capitulo":capitulo
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {    
            if (data.Resultado=="Existe"){
                bandera=true;
            }
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return bandera;
}
/************************************************************************************************************************************************************************/
function ajaxpreguntas(usuario,idcampitulo)
{
    var datos;
    var paramentros = {
        "opt": "valoresEjemplo",
        "usuario":usuario,
        "idcapitulo":idcampitulo
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {        		
            datos=data;
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return datos;
}
/**************************************************************************************************************************************************************/
function mostrarCalificacionExamen(usuario, idpregunta)
{
    var obj;
    var paramentros = {
        "opt":"obtenerresultadosporPregunta",
        "usuario": usuario,
        "idpregunta":idpregunta
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {        		
            obj = data;
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return obj;
}


/******************************************************************************************************************************/
function vernombre(usuario){
    var paramentros = {
        "opt":"Nombreusuario",
        "usuario":usuario
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {   
            var nombres = data[0].Nombre + ' '+ data[0].ApellidoPaterno + ' ' + data[0].ApellidoMaterno;
            $("#lblNombre").text(nombres);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/****************************************************************************************************************************/