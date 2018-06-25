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
                console.log("paso algo");
                alertaError('El usuario que busca no existe');
                 $("#divAlumno").css({"display":"none"});
            }
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}



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
/**********************************************************************************************************/
function iniciarBusqueda(){
    $("#divAdministrador").css({"display":"block"});
    $("#divAlumno").css({"display":"none"});
    
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
function PintarExamen(){
    var materia =$("#ddlMateria").val();
    var capitulo =$("#ddlCapitulo").val();
    $("#TrabajoExamen").empty();
    pintarPregunta(materia,capitulo);
}
/*******************************************************************************************************************************************/
function pintarPregunta(materia,capitulo){
    var paramentros = {
        "opt": "obtenerPreguntas",
        "materia":materia,
        "capitulo":capitulo
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: true,
        data: paramentros,
        dataType: "json",
        success: function (data) {    
            var html='';
            var cont =1;
            for(var i =0 ; i<data.length;i++){
                html+='<div class="row">';
                html+='<div class="col-md-12">';                
                html+='<label> '+cont+'- '+data[i].Pregunta+'</label>';
                cont++;
                html+='<input type="hidden" id="numeroPregunta'+data[i].IdPregunta+'"  value="'+data[i].IdPregunta+'" >';                
                html+='</div>';
                html+='</div>';
                html+='</br>';
                html += llenarRespuesta(data[i].TipoComponente,data[i].IdPregunta);
            }
            $("#TrabajoExamen").append(html);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/*****************************************************************************************************************************************************/
function llenarRespuesta(tipoComponente,idpregunta){
    var html ='';
    var datos = sacarRespuestas(idpregunta);
    if (datos != undefined)
    {        
        switch(tipoComponente)
        {
            case "Select":
                html += '<div class="row">';
                html += '<div class="col-md-3">';
                html += '<select id="ddlRespuesta'+idpregunta+'" class="form-control">';
                for(var i = 0; i< datos.length;i++){
                    html += '<option value="'+datos[i].IdRespuesta+'">'+datos[i].Respuesta+'</option>';
                }
                html += '';
                html += '</select>';
                html += '</div>';
                 html += '</div>';
                break;
            case "Radio":
                html += '<div class="row">';
                for(var i =0 ;i<datos.length;i++) {
                    html += '<div class="col-md-1">';
                    html += '<input type="radio" id="radio'+idpregunta+'" name="radio'+idpregunta+'"  class="seleccione" value="'+datos[i].IdRespuesta+'"> '+datos[i].Respuesta+' ';
                    html += '</div>';
                }
                html += '</div>';
                html += '';
                break;
            case "Checkbox":
                html += '<div class="row">';
                for(var i =0 ;i<datos.length;i++) {
                    html += '<div class="col-md-1">';
                    html += '<input type="checkbox" class="seleccione" value="'+datos[i].IdRespuesta+'"> '+datos[i].Respuesta+' ';
                    html += '</div>';
                }
                html += '</div>';
                html += '';
                break;
        }
        return html;
    }
    else
    {
        alert("No funciona");
    }
    
}
/******************************************************************************************************************************************************************/
function sacarRespuestas(idpregunta){
    var datos;
    var paramentros = {
        "opt": "obtenerRespuestas",
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
           datos =data;
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return datos;
}