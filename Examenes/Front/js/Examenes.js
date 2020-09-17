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
    cerrarAlerta();
    $("#TrabajoExamen").empty();
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
function PintarExamen(){
    cerrarAlerta();    
    var materia =$("#ddlMateria").val();
    var capitulo =$("#ddlCapitulo").val();
    var usuario =$("#lblmatricula").html().trim();
    $("#TrabajoExamen").empty();
    if(materia!="X"){
        if(capitulo!="X"){
            if(hayExamenMostrar(materia,capitulo)){
                if(!fueCalificado(capitulo,usuario)) {                
                    pintarPregunta(materia,capitulo);
                }
                else
                {
                    alertaError("La usuario " + usuario + " con anterioridad ya realizo su examen");
                }                
            }
            else
            {
                alertaError("No hay examen configurado, intentelo mas tarde");
                
            }
        }
        else
        {
            alertaError("Favor de seleccionar un capitulo");
        }
    }
    else
    {
        alertaError("Favor de seleccionar una materia");
    }
    
    
    
}
/********************************************************************************************************************************************************/
function hayExamenMostrar(materia, capitulo){
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
            if(data.Resultado=="Existe"){
                bandera=true;
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return bandera;
}
/*******************************************************************************************************************************************/
function fueCalificado(capitulo,usuario){
    var bandera = false;
    var paramentros = {
        "opt": "concerSiYaEvaluo",
        "capitulo":capitulo,
        "usuario":usuario
        
        };
    $.ajax({
        url:'../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {   
            if(data.Resultado=='Existe'){
                bandera=true;
            }
            else
            {
                bandera=false;
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return bandera;
}
/*******************************************************************************************************************************************/
function pintarPregunta(materia,capitulo){
    var jsons;
    var listajoson = new Array(); 
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
                html+='<input type="hidden" id="numeroPreguntaComponente'+data[i].IdPregunta+'"  value="'+data[i].IdComponente+'" >';                
                html+='</div>';
                html+='</div>';
                html+='</br>';
                html += llenarRespuesta(data[i].TipoComponente,data[i].IdPregunta);
                jsons = jsonrespuestas(data[i].TipoComponente,data[i].IdPregunta);
                listajoson.push(jsons);
            }
               html +='<div class="row">';
                html +='<div class="col-md-2">';
                html +='<input type="button" class="btn btn-success" value="Evaluar" onclick="evaluarExamen();" >';
                html +='</div>';
                html +='<div class="col-md-2">';
                html +='<input type="button" class="btn btn-danger" value="Cancelar" onclick="cancelarExamen();" >';;
                html +='</div>';
                html +='</div>';
            $("#TrabajoExamen").append(html);
            //alert(JSON.stringify(listajoson));
            $("#formadorJson").append(JSON.stringify(listajoson));
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            alert(exception + xhr.statusText);
            console.log(exception + xhr.statusText);
        }
    });
}
/****************************************************************************************************************/

function jsonrespuestas(TipoComponente,idpregunta)
{
    var html ='';
    var obj;
    var datos = sacarRespuestas(idpregunta);
    if (datos != undefined){
        obj ={"IdPregunta":idpregunta,
            "Componente":TipoComponente,
            "Respuestas":[                
                    {"IdRespuesta":datos[0].IdRespuesta,"Seleccionado":"No"},
                    {"IdRespuesta":datos[1].IdRespuesta,"Seleccionado":"No"},
                    {"IdRespuesta":datos[2].IdRespuesta,"Seleccionado":"No"},
                    {"IdRespuesta":datos[3].IdRespuesta,"Seleccionado":"No"},
                    {"IdRespuesta":datos[4].IdRespuesta,"Seleccionado":"No"}                    
            ]
        };
    }
    return obj;
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
                html += '</br>';
                break;
            case "Radio":
                html += '<div class="row">';
                for(var i =0 ;i<datos.length;i++) {
                    html += '<div class="col-md-2">';
                    html += '<input type="radio" name="radio'+idpregunta+'"  class="seleccione" value="'+datos[i].IdRespuesta+'"> '+datos[i].Respuesta+' ';
                    html += '</div>';
                }
                html += '</div>';
                html += '</br>';
                break;
            case "Checkbox":
                html += '<div class="row">';
                for(var i =0 ;i<datos.length;i++) {
                    html += '<div class="col-md-2">';
                    html += '<input type="checkbox" class="seleccione" id="che'+idpregunta+'res'+datos[i].IdRespuesta+'" value="'+datos[i].IdRespuesta+'"> '+datos[i].Respuesta+' ';
                    html += '</div>';
                }
                html += '</div>';
                html += '</br>';
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
/*********************************************************************************************************************************/
function cancelarExamen(){
    $("#TrabajoExamen").empty();
    $("#formadorJson").empty();
}
/****************************************************************************************************************************************/
function evaluarExamen(){
    var j = $("#formadorJson").val();
    var s = $("#formadorJson").html().trim();    
    var obj = JSON.parse(s);
    var transformacion=tomarvaloreHTML(obj);
    //alert(JSON.stringify(transformacion));
    crearEvaluacion(transformacion);
}
/**************************************************************************************************************************************/
function crearEvaluacion(obj)
{
    var lista =  new Array(); 
    var listaRespuesta = new Array();
    var dato;
    var ls;
    var idcapitulo  =$("#ddlCapitulo").val();
    var usuario = $("#lblmatricula").html().trim();
    for(var i = 0 ;i<obj.length;i++){
        dato = guardarHistorialPregunta(idcapitulo,usuario,obj[i].IdPregunta);
        lista.push(dato);
    }
    for(var i =0 ;i<lista.length;i++){
        if(obj[i].IdPregunta ==lista[i].IdPregunta){
            if(lista[i].Resultado=="Guardado"){
                for(var j =0; j<obj[i].Respuestas.length;j++){
                    if(obj[i].Respuestas[j].Seleccionado=="Si"){
                        ls =  guardarHistorialRespuesta(lista[i].HistorialPregunta,obj[i].Respuestas[j].IdRespuesta);
                        listaRespuesta.push(ls);
                    }
                }
            }
        }
    }
    $("#TrabajoExamen").empty();
    alertaExito("El examen se guardo correctamente, su resultado lo puede consultar en la pantalla resultados");
    
    
}
function cali(){
    var idspreguntas="";
    var usuario = $("#lblmatricula").html().trim();
    var idcapitu =$("#ddlCapitulo").val();
    var obj = ajaxpreguntas(usuario,idcapitu);
    for(var z=0;z<obj.length;z++){
        idspreguntas +=  obj[z].IdPregunta + ",";
    }
    var res;
    if(idspreguntas.length>0){
        idspreguntas = idspreguntas.substring(0,idspreguntas.length-1);
        res = mostrarCalificacionExamen(usuario, idspreguntas);       
    }
    //esto se tiene que poner en crearEvaluacion ahorita solo es prueba
    
    
    
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
/*************************************************************************************************************************************************/
function guardarHistorialRespuesta(idhistorialPregunta, idrespuesta){
    var  respuesta ={"IdRespuesta":idrespuesta,"Resultado":""};
    var paramentros = {
        "opt": "guardarHistorialRespuesta",
        "idhistorialPregunta":idhistorialPregunta,
        "idrespuesta":idrespuesta
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {   
            
            respuesta.Resultado=data.Resultado;
        },
        error: errorHandler = function (xhr, errorType, exception) {
            alert(exception + xhr.statusText);
            console.log(exception + xhr.statusText);
        }
    });
    return respuesta;
}
/*************************************************************************************************************************************/
function guardarHistorialPregunta(idcapitulo,usuario,idpregunta)
{
    var datos;
    var paramentros = {
        "opt":"guardarHistorialPregunta",
        "idcapitulo": idcapitulo,
        "usuario":usuario,
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
            datos = {
                "IdPregunta":idpregunta,
                "Resultado":data.Resultado,
                "HistorialPregunta":data.IdhisPregunta
            };
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
        
    });
    return datos;
}
/************************************************************************************************************************/
function tomarvaloreHTML(obj)
{
    for(var i =0;i<obj.length;i++){
        
        switch(obj[i].Componente){
            case "Checkbox":
                for(var j=0;j<obj[i].Respuestas.length;j++){
                    if($("#che"+obj[i].IdPregunta+"res"+obj[i].Respuestas[j].IdRespuesta).is(':checked') ){
                        obj[i].Respuestas[j].Seleccionado="Si";
                    }
                }                
                break;
            case "Radio":
                var componente = "name=radio"+obj[i].IdPregunta;
                var valor =$("input:radio["+componente+"]:checked").val();
                for(var j=0;j<obj[i].Respuestas.length;j++){
                    if(valor ==obj[i].Respuestas[j].IdRespuesta){
                        obj[i].Respuestas[j].Seleccionado="Si";
                    }
                }
                break;
            case "Select":
                var componente = "#ddlRespuesta"+obj[i].IdPregunta;
                var valor =$(componente).val();
                for(var j=0;j<obj[i].Respuestas.length;j++){
                    if(valor ==obj[i].Respuestas[j].IdRespuesta){
                        obj[i].Respuestas[j].Seleccionado="Si";
                    }
                }
                break;
        }
    }
    return obj;
}
/***********************************************************************************************************************************/