function alertaError(texto)
{
    var htn ='<div class="alert alert-danger" role="alert"  >';    
        htn += '<strong>Error! </strong>'+texto+' </a>.';
        htn += ' </div>';
        
    $("#alertas").html(htn);
}
/***************************************************************************************************************/
function alertaExito(texto)
{
    var htn ='<div class="alert alert-success" role="alert"  >';    
        htn += '<strong>Exito! </strong>'+texto+' </a>.';
        htn += ' </div>';
        
    $("#alertas").html(htn);    
}
/***************************************************************************************************************/
function cerrarAlerta()
{
    $(".alert").alert('close');
}
/***********************************************************************************************/
function mostrarContenido(){
    cerrarAlerta();
    $("#divGuardarPreguntas").css({"display":"block"});
    $("#divguardarRespuestas").css({"display":"none"});
    $("#divBuscarPregunta").css({"display":"none"});
    $("#divTablaPreguntas").css({"display":"none"});
    $("#divEditarRespuesta").css({"display":"none"});
    $("#divEditarPreguntas").css({"display":"none"});
    
    catalogomaterias();
    catalogoComponentes();
    
}
/******************************************************************************************************/
function catalogoComponentes(){
     $("#ddlcomponente").empty();
    var paramentros = {
        "opt": 'catalogoComponentes'
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {        		
            var html='';
            if(data.length>0){
              
               for(var i =0 ;i <= data.length-1; i++)
               {
                   if(i==0)
                   {
                       html +='<option value="-1">Seleccionar</option>';
                       html +='<option value="'+data[i].IdComponente+'">'+data[i].TipoComponente+'</option>';
                   }
                   else
                   {
                       html +='<option value="'+data[i].IdComponente+'">'+data[i].TipoComponente+'</option>';
                   }
               }
               $("#ddlcomponente").append(html);             
            }
            else{
                alertaError("No existe componentes para el catalogo componentes");
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/******************************************************************************************************/
function catalogocapitulos()
{   cerrarAlerta();
    if ($("#ddlmateria").val()!="-1"){
        $("#ddlcapitulo").empty();
        var idcapitulo = $("#ddlmateria").val();
        var paramentros = {
            "opt": "cargarCapitulosCatalogo",
            "idmateria": idcapitulo
            };
        $.ajax({
            url: '../Clases/Remo/remoto.php',
            type: 'POST',
            cache: false,
            async: false,
            data: paramentros,
            dataType: "json",
            success: function (data) {
                var html='';
                for(var i =0;i<= data.length-1;i++){
                    if(i==0)
                    {
                        html+='<option value="-1">Seleccionar </option>';
                        html+='<option value="'+data[i].IdCapitulo+'">'+data[i].Capitulo+'</option>';
                    }
                    else
                    {
                        html+='<option value="'+data[i].IdCapitulo+'">'+data[i].Capitulo+'</option>';
                    }
                }
                $("#ddlcapitulo").append(html);
            },
            error: errorHandler = function (xhr, errorType, exception) {
                console.log(exception + xhr.statusText);
            }
        });
    }
    else
    {
        alertaError("Favor de seleccionar una materia");
    }
    
}
/******************************************************************************************************/
function catalogomaterias()
{
    $("#ddlmateria").empty();
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
            var html='';
            for(var i =0;i<= data.length-1;i++){
                if(i==0)
                {
                    html+='<option value="-1">Seleccionar </option>';
                    html+='<option value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                }
                else
                {
                    html+='<option value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                }
            }
            $("#ddlmateria").append(html);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/*************************************************************************************************/
function guardaPregunta(){
    var pregunta = $("#txtpregunta").val();
    var idmateria = $("#ddlmateria").val();
    var idcapitulo = $("#ddlcapitulo").val();
    var idcomponente =$("#ddlcomponente").val();
    if(idmateria!="-1"){
        if(idcapitulo!="-1" && idcapitulo!="")
        {
            if(pregunta!=""){
                if(idcomponente!="-1"){
                    guardar(idmateria,idcapitulo,pregunta,idcomponente);
                }
                else{
                    alertaError("Favor de seleccionar un componente");
                }
            }
            else
            {
                alertaError("Favor de escribir una pregunta");
            }
        }
        else
        {
            alertaError("Favor de seleccionar un capitulo");
        }
    }
    else{
          alertaError("Favor de seleccionar una materia");
    }
    
}
/************************************************************************************************************************/
function guardar(idmateria,idcapitulo,pregunta,idcomponente){
    var paramentros = {
        "opt": "preguntaGuardar",
        "idmateria":idmateria,
        "idcapitulo":idcapitulo,
        "pregunta":pregunta,
        "idcomponente":idcomponente
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) { 
            if(data.length>=0){
                if(data[0].Resultado=='Ok'){
                    $("#hdfIdPregunta").val(data[0].IdPregunta);                    
                    $("#divGuardarPreguntas").css({"display":"none"});
                    $("#divguardarRespuestas").css({"display":"block"});
                    $("#txtpregunta").val('');  
                    $("#ddlmateria").val('-1');
                    $("#ddlcapitulo").val('-1');
                    $("#ddlcomponente").val('-1');
                    alertaExito("La pregunta se guardo exítosamente");
                }
                else
                {
                    alertaError("La pregunta ya existe guardada en la base de datos");
                }
            }
            else
            {
                alertaError("No hay información disponible");
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            //console.log(exception + xhr.statusText);
            alertaError(exception + xhr.statusText);
        }
    });
}
/************************************************************************************************************************************/
function prueba(){
    $("#divGuardarPreguntas").css({"display":"none"});
    $("#divguardarRespuestas").css({"display":"block"});
   
}
/***********************************************************************************************************************************************/
function guardarRespuestas(){
    var r1 = $("#txtrespuesta1").val();
    var v1 = $("#txtvalor1").val();
    var r2 = $("#txtrespuesta2").val();
    var v2 = $("#txtvalor2").val();
    var r3 = $("#txtrespuesta3").val();
    var v3 = $("#txtvalor3").val();
    var r4 = $("#txtrespuesta4").val();
    var v4 = $("#txtvalor4").val();
    var r5 = $("#txtrespuesta5").val();
    var v5 = $("#txtvalor5").val();
    
    if (r1!="")
    {
        if(v1!="")
        {
            if(r2!="")
            {
                if(v2!="")
                {
                    if(r3!="")
                    {
                        if(v3!="")
                        {
                            if(r4!="")
                            {
                                if(v4!="")
                                {
                                    if(r5!="")
                                    {
                                        if(v5!="")
                                        {
                                            if(!hayPreguntasRepetidas(r1,r2,r3,r4,r5)){
                                                if(rangosCorrectos(parseFloat(v1),parseFloat(v2),parseFloat(v3),parseFloat(v4),parseFloat(v5))==true){
                                                    if(sumaCorrecta(parseFloat(v1),parseFloat(v2),parseFloat(v3),parseFloat(v4),parseFloat(v5))==true){
                                                        voloresGuardar(r1,r2,r3,r4,r5,v1,v2,v3,v4,v5);
                                                    }                                                
                                                }
                                            }                                            
                                        }
                                        else
                                        {
                                            alertaError("Favor de agregar un valor en valor cinco");
                                        }
                                    }
                                    else
                                    {
                                        alertaError("Favor de agregar una respuesta en respuesta cinco");
                                    }
                                }
                                else
                                {
                                    alertaError("Favor de agregar un valor en valor cuatro");
                                }
                            }
                            else
                            {
                                alertaError("Favor de agregar una respuesta en respuesta cuatro");
                            }
                        }
                        else
                        {
                            alertaError("Favor de agregar un valor en valor tres");
                        }
                    }
                    else
                    {
                        alertaError("Favor de agregar una respuesta en respuesta tres");
                    }
                }
                else
                {
                    alertaError("Favor de agregar un valor en valor dos");
                }
            }
            else
            {
                alertaError("Favor de agregar una respuesta en respuesta dos");
            }
        }
        else
        {
            alertaError("Favor de agregar un valor en valor uno");
        }
    }
    else
    {
        alertaError("Favor de agregar una respuesta en respuesta uno");
    }
    
    
}
/**********************************************************************************************************************************************************************/
function hayPreguntasRepetidas(r1,r2,r3,r4,r5)
{
    var bandera=false;
    var comparativaRespuesta="";
    var comparativaPocision=0;
    var respuestas =[r1,r2,r3,r4,r5];
     for(var i=0;i<=respuestas.length-1; i++){
        comparativaRespuesta =respuestas[i];
        comparativaPocision = i;
        for(var j=0;j<=respuestas.length-1; j++){
            if(respuestas[j]!=comparativaRespuesta || comparativaPocision != j){
                if(respuestas[i]==respuestas[j]){
                    bandera=true;   
                    j = respuestas.length;
                    i = respuestas.length;
                    alertaError("La posicion " +pocisionamientoRespuesta(j) +" tiene el mismo valor que la " +pocisionamientoRespuesta(i));                    
                }
            }            
        }
     }
}
/***********************************************************************/
function pocisionamientoRespuesta(valor)
{
    var resultado;
    switch(valor){
        case 0:
            resultado="Primera";
            break;
            case 1:
            resultado="Segunda";
            break;
            case 2:
            resultado="Tercera";
            break;
            case 3:
            resultado="Cuarta";
            break;
            case 4:
            resultado="Quinta";
            break;
    }
    return resultado;
}
/************************************************************************************************************************************************/
function voloresGuardar(r1,r2,r3,r4,r5,v1,v2,v3,v4,v5)
{
    var idpregunta=$("#hdfIdPregunta").val();
    var paramentros = {
        "opt":"guardarvalores",
        "r1": r1,"r2":r2,"r3":r3,"r4":r4,"r5":r5,
        "v1": v1,"v2":v2,"v3":v3,"v4":v4,"v5":v5,
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
            if(data[0].Respuesta=="Ok"){
                $("#txtrespuesta1").val('');
                $("#txtvalor1").val('');
                $("#txtrespuesta2").val('');
                $("#txtvalor2").val('');
                $("#txtrespuesta3").val('');
                $("#txtvalor3").val();
                $("#txtrespuesta4").val('');
                $("#txtvalor4").val('');
                $("#txtrespuesta5").val('');
                $("#txtvalor5").val('');
                $("#divguardarRespuestas").css({"display":"none"});
                alertaExito("Las respuestas se agregaron correctamente");
            }
            else
            {
                alertaError("No se puede guardar la información, intentelo más tarde.");
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            //console.log(exception + xhr.statusText);
            alertaError(exception + xhr.statusText);
        }
    });
}
/***********************************************************************************************************************************************/
function sumaCorrecta(v1,v2,v3,v4,v5){
    var bandera =false;
    var valores =[v1,v2,v3,v4,v5];
    var sumatoria=0.0;
    for(var i =0; i<=valores.length-1; i++){
        sumatoria = sumatoria + valores[i];
    }
    if (sumatoria==1.0){
        bandera =true;
    }
    else{
        if(sumatoria<1.0){
            alertaError("La sumatoria es menor a 1.0 este valor no es permitido favor de revisar su información.");
        }
        else
        {
            alertaError("La sumatoria es mayor a 1.0 este valor no es permitido favor de revisar su información.");
        }
    }
    
    
    return bandera;
}
/********************************************************************************************************************************/
function rangosCorrectos(v1,v2,v3,v4,v5)
{   /**
    v1=0.00;
    v2=0.20;
    v3=0.20;
    v4=0.20;
    v5=0.20;
    */
    var bandera =false;
    var rangoMenor = 0.00;
    var rangoMayor = 1.0;
    var valormodulo=0.0;
    var valores =[v1,v2,v3,v4,v5];
    for(var i =0 ;i<=valores.length-1;i++){
        if(valores[i]>=rangoMenor && valores[i]<=rangoMayor){
            if(valores[i]==0.0 || valores[i]==1.0 ){
                bandera=true;
            }
            else
            {
                //crear function     
               
                if( decimalCorrecto(valores[i])){
                    bandera=true;
                }
                else
                {
                    bandera=false;
                    switch(i) {
                    case 0:                        
                        alertaError("El valor de la cajita uno no es aceptable ejemplo 0.20, 0.40");
                        break;
                    case 1:                            
                        alertaError("El valor de la cajita dos no es aceptable ejemplo 0.20, 0.40");
                        break;                        
                    case 2:
                        alertaError("El valor de la cajita tres no es aceptable ejemplo 0.20, 0.40");
                        break;
                    case 3:
                        alertaError("El valor de la cajita cuatro no es aceptable ejemplo 0.20, 0.40");
                        break;
                    case 4:
                        alertaError("El valor de la cajita cinco no es aceptable ejemplo 0.20, 0.40");
                        break;
                    } 
                    i=valores.length;//hace que termine el ciclo
                    
                }
            }
        }
    }
    return bandera;
    
}
/***************************************************************************************************************************************/
function decimalCorrecto(captado)
{
    var bandera=false;
    var val=[0.2,0.4,0.6,0.8];
    for(var i =0; i <val.length;i++){
        if(val[i]==captado){
            bandera=true;
        }       
    }
    return bandera;
}
/*********************************************************************************************************************/
function busqueda(){
    cerrarAlerta();
    $("#divGuardarPreguntas").css({"display":"none"});
    $("#divguardarRespuestas").css({"display":"none"});
    $("#divBuscarPregunta").css({"display":"block"});
    $("#divTablaPreguntas").css({"display":"block"});
    buscarPreguntasGrid();
}
/*******************************************************************************************************/
function cancelarGuardarPregunta(){
    $("#txtpregunta").val('');  
    $("#ddlmateria").val('-1');
    $("#ddlcapitulo").val('-1');
    $("#ddlcomponente").val('-1');
    $("#divGuardarPreguntas").css({"display":"none"});
    cerrarAlerta();
    
}
/******************************************************************************************************************************/
function buscarPreguntasGrid(){
    var tablita;
    var paramentros = {
        "opt": "cargaPreguntas"
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (ds) {        
            tablita = $("#example").DataTable({
                     data:ds,
                     language:{url:'../Front/js/Spanish.json'},     
                     "bDestroy": true,
                     columns:[
                         {title:"IdPregunta"},
                         {title:"Pregunta"},
                         {title:"TipoComponente"},
                         {title:"Capitulo"},
                         {title:"Materia"},
                         {
                             sortable: false,
                                "width": "20%",
                                "render": function(datas, type, full, meta) {
                                    var buttonID = "rollover_" + full.id;
                                    var editID="edit_"+full.id;                                    
                                    return "<a id=" + buttonID + " class='btn btn-primary rolloverBtn' role='button'    onclick='verPreguntasBloque("+full[0]+",\""+full[1]+"\",\""+full[2]+"\",\""+full[3]+"\",\""+full[4]+"\");' ><img src='../Front/img/Preguntas.svg' width='30px' height='30px'   /></a>&nbsp; <a id=" + editID + " class='btn btn-success rolloverBtn' role='button'    onclick='verRespuestaBloque(" + ds[meta.row][0] + ","+meta.row+",\""+ds[meta.row][2]+"\",\""+ds[meta.row][1]+"\");' ><img src='../Front/img/Respuestas.svg' width='30px' height='30px'   /></a>";
                                }
                         }
                     ]
            });
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
             alertaError(exception + xhr.statusText);
        }
    });
}

/*************************************************************************************************************/
function verPreguntasBloque(idpregunta,pregunta,componente,capitulo,materias){
    cerrarAlerta();
    $("#hdfIdPreguntaEditar").val(idpregunta);
    $("#divEditarPreguntas").css({"display":"block"});
    $("#divEditarRespuesta").css({"display":"none"});
    
    $("#txtPreguntaEditar").val(pregunta);
    
    catalogoEditarMaterias(materias);
    catalagoEditarCapitulos(capitulo,materias);
    catalogoEditarComponente(componente);
}
/*********************************************************************************************************************************************/
function catalogoEditarComponente(componente)
{
    $("#ddlcomponenteeditar").empty();
    var paramentros = {
        "opt": "catalogoComponentes"
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {        		
            var html='';
            if(data.length>0){
                for(var i = 0 ; i<data.length ; i++){
                    if(i==0){
                        html += '<option value="-1">Seleccionar</option>';
                         if(data[i].TipoComponente==componente){
                             html += '<option value="'+data[i].IdComponente+'" selected>'+data[i].TipoComponente+'</option>';
                         }
                         else
                         {
                             html += '<option value="'+data[i].IdComponente+'">'+data[i].TipoComponente+'</option>';
                         }
                    }
                    else
                    {
                        if(data[i].TipoComponente==componente){
                             html += '<option value="'+data[i].IdComponente+'" selected>'+data[i].TipoComponente+'</option>';
                         }
                         else
                         {
                             html += '<option value="'+data[i].IdComponente+'">'+data[i].TipoComponente+'</option>';
                         }
                    }
                    
                }
                $("#ddlcomponenteeditar").append(html);
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {            
             alertaError(exception + xhr.statusText);
        }
    });
}
/********************************************************************************************************************************/
function catalagoEditarCapitulos(capitulo,materias){
     $("#ddlcapituloEditar").empty();
    var paramentros = {
        "opt": "cargarCapitulosCatalogoSinM",
        "materias":materias
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {
            var tml='';
            if(data.length>0){
                for(var i = 0;i < data.length;i++){
                    if(i==0){
                        tml +='<option value="-1">Selecccionar</option>';
                        if(data[i].Capitulo==capitulo)
                        {
                            tml +='<option value="'+data[i].IdCapitulo+'" selected >'+data[i].Capitulo+'</option>';
                        }
                        else
                        {
                            tml +='<option value="'+data[i].IdCapitulo+'" >'+data[i].Capitulo+'</option>';
                        }
                    }
                    else
                    {
                        if(data[i].Materia==capitulo)
                        {
                            tml +='<option value="'+data[i].IdCapitulo+'" selected >'+data[i].Capitulo+'</option>';
                        }
                        else
                        {
                            tml +='<option value="'+data[i].IdCapitulo+'" >'+data[i].Capitulo+'</option>';
                        }
                    }
                }
                $("#ddlcapituloEditar").append(tml);
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
            alertaError(exception + xhr.statusText);
        }
    });
}
/*******************************************************************************************************************************/
function catalogoEditarMaterias( materia){
     $("#ddlmateriaeditar").empty();
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
            var tml='';
            if(data.length>0){
                for(var i = 0;i < data.length;i++){
                    if(i==0){
                        tml +='<option value="-1">Selecccionar</option>';
                        if(data[i].Materia==materia)
                        {
                            tml +='<option value="'+data[i].IdMateria+'" selected >'+data[i].Materia+'</option>';
                        }
                        else
                        {
                            tml +='<option value="'+data[i].IdMateria+'" >'+data[i].Materia+'</option>';
                        }
                    }
                    else
                    {
                        if(data[i].Materia==materia)
                        {
                            tml +='<option value="'+data[i].IdMateria+'" selected >'+data[i].Materia+'</option>';
                        }
                        else
                        {
                            tml +='<option value="'+data[i].IdMateria+'" >'+data[i].Materia+'</option>';
                        }
                    }
                }
                $("#ddlmateriaeditar").append(tml);
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
            alertaError(exception + xhr.statusText);
        }
    });
}

/****************************************************************************************************************************/
function cancelaEditarPregunta(){
    $("#ddlmateriaeditar").val('-1');
    $("#ddlcapituloEditar").val('-1');
    $("#txtPreguntaEditar").val('');
    $("#ddlcomponenteeditar").val('-1');
    
    
    $("#divEditarPreguntas").css({"display":"none"});
}
/****************************************************************************************************************************************/
function cambiarCapitulos(){
    var idmateria = $("#ddlmateriaeditar").val();
    var paramentros = {
        "opt": "cargarCapitulosCatalogo",
        "idmateria":idmateria
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {    
            $("#ddlcapituloEditar").empty();
            var html='';
                for(var i =0;i<= data.length-1;i++){
                    if(i==0)
                    {
                        html+='<option value="-1">Seleccionar </option>';
                        html+='<option value="'+data[i].IdCapitulo+'">'+data[i].Capitulo+'</option>';
                    }
                    else
                    {
                        html+='<option value="'+data[i].IdCapitulo+'">'+data[i].Capitulo+'</option>';
                    }
                }
                $("#ddlcapituloEditar").append(html);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            
            alertaError(exception + xhr.statusText);
        }
    });
}
/****************************************************************************************************************************************************/
function editar(){
    var idpregunta =$("#hdfIdPreguntaEditar").val();
    var idMateria=$("#ddlmateriaeditar").val();
    var idCapitulo=$("#ddlcapituloEditar").val();
    var pregunta=$("#txtPreguntaEditar").val();
    var idComponente=$("#ddlcomponenteeditar").val();
    var paramentros = {
        "opt": "editarPreguntas",
        "idpregunta":idpregunta,"idMateria":idMateria
        ,"idCapitulo":idCapitulo,"pregunta":pregunta,"idComponente":idComponente
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) { 
            if(data[0].Respuesta=='Ok'){
                $("#divEditarPreguntas").css({"display":"none"});
                alertaExito("La pregunta  se edito correctamente");
            }
            else
            {
                alertaError("Al editar Pregunta "+ data[0].Respuesta);
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
           alertaError("Al editar Pregunta "+exception + xhr.statusText);
        }
    });
    
}
/***********************************************************************************************************************************************************************/
function verRespuestaBloque(idpregunta,b,c,d){
    $("#divEditarPreguntas").css({"display":"none"});
    $("#divEditarRespuesta").css({"display":"block"});
    $("#preguntaEditarTxt").val(idpregunta);
    tomarRespuestasValores(idpregunta);
    
}
/***********************************************************************************************************************************************************************************/
function tomarRespuestasValores(idpregunta){
    var paramentros = {
        "opt": "buscarRespuestas",
        "Idpregunta":idpregunta
        };
    $.ajax({
        url:'../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {  
           $("#hdfR1").val(data[0].IdRespuesta);
           $("#txtEditaR1").val(data[0].Respuesta);
           $("#txtEditaV1").val(data[0].Valor);
           $("#hdfR2").val(data[1].IdRespuesta);
           $("#txtEditaR2").val(data[1].Respuesta);
           $("#txtEditaV2").val(data[1].Valor);
           $("#hdfR3").val(data[2].IdRespuesta);
           $("#txtEditaR3").val(data[2].Respuesta);
           $("#txtEditaV3").val(data[2].Valor);
           $("#hdfR4").val(data[3].IdRespuesta);
           $("#txtEditaR4").val(data[3].Respuesta);
           $("#txtEditaV4").val(data[3].Valor);
           $("#hdfR5").val(data[4].IdRespuesta);
           $("#txtEditaR5").val(data[4].Respuesta);
           $("#txtEditaV5").val(data[4].Valor);
           
           
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
            alertaError("Al consultar Respuestas "+exception + xhr.statusText);
        }
    });
}
/************************************************************************************************************************/
function editarRespuestasGuar(r1,r2,r3,r4,r5,v1,v2,v3,v4,v5,id1,id2,id3,id4,id5){
    var idpregunta = $("#preguntaEditarTxt").val();
    var paramentros = {
        "opt": "editarRespuestasValores",
        "r1":r1,"r2":r2,"r3":r3,"r4":r4,"r5":r5,
        "v1":v1,"v2":v2,"v3":v3,"v4":v4,"v5":v5,
        "id1":id1,"id2":id2,"id3":id3,"id4":id4,"id5":id5,
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
            if(data[0].Respuesta=="Ok")
            {
                $("#txtEditaR1").val('');
                $("#txtEditaV1").val('');
                $("#txtEditaR2").val('');
                $("#txtEditaV2").val('');
                $("#txtEditaR3").val('');
                $("#txtEditaV3").val('');
                $("#txtEditaR4").val('');
                $("#txtEditaV4").val('');
                $("#txtEditaR5").val('');
                $("#txtEditaV5").val('');
                $("#divEditarRespuesta").css({"display":"none"});
                
                 alertaExito("Las respuesta se editaron con exito");
            }
            else
            {
                alertaError("Al editar Pregunta "+data[0].Respuesta);
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
             alertaError("Al editar la respuesta "+exception + xhr.statusText);
        }
    });
}
/**********************************************************************************/
function validacionesEditar(){
    var r1 = $("#txtEditaR1").val();
    var v1 = $("#txtEditaV1").val();
    var r2 = $("#txtEditaR2").val();
    var v2 = $("#txtEditaV2").val();
    var r3 = $("#txtEditaR3").val();
    var v3 = $("#txtEditaV3").val();
    var r4 = $("#txtEditaR4").val();
    var v4 = $("#txtEditaV4").val();
    var r5 = $("#txtEditaR5").val();
    var v5 = $("#txtEditaV5").val();
    var id1=$("#hdfR1").val();
    var id2=$("#hdfR2").val();
    var id3=$("#hdfR3").val();
    var id4=$("#hdfR4").val();
    var id5=$("#hdfR5").val();
    
    if (r1!="")
    {
        if(v1!="")
        {
            if(r2!="")
            {
                if(v2!="")
                {
                    if(r3!="")
                    {
                        if(v3!="")
                        {
                            if(r4!="")
                            {
                                if(v4!="")
                                {
                                    if(r5!="")
                                    {
                                        if(v5!="")
                                        {
                                            if(!hayPreguntasRepetidas(r1,r2,r3,r4,r5)){
                                                if(rangosCorrectos(parseFloat(v1),parseFloat(v2),parseFloat(v3),parseFloat(v4),parseFloat(v5))==true){
                                                    if(sumaCorrecta(parseFloat(v1),parseFloat(v2),parseFloat(v3),parseFloat(v4),parseFloat(v5))==true){                                                   
                                                        editarRespuestasGuar(r1,r2,r3,r4,r5,v1,v2,v3,v4,v5,id1,id2,id3,id4,id5);
                                                    }                                                
                                                }
                                            }                                            
                                        }
                                        else
                                        {
                                            alertaError("Favor de agregar un valor en valor cinco");
                                        }
                                    }
                                    else
                                    {
                                        alertaError("Favor de agregar una respuesta en respuesta cinco");
                                    }
                                }
                                else
                                {
                                    alertaError("Favor de agregar un valor en valor cuatro");
                                }
                            }
                            else
                            {
                                alertaError("Favor de agregar una respuesta en respuesta cuatro");
                            }
                        }
                        else
                        {
                            alertaError("Favor de agregar un valor en valor tres");
                        }
                    }
                    else
                    {
                        alertaError("Favor de agregar una respuesta en respuesta tres");
                    }
                }
                else
                {
                    alertaError("Favor de agregar un valor en valor dos");
                }
            }
            else
            {
                alertaError("Favor de agregar una respuesta en respuesta dos");
            }
        }
        else
        {
            alertaError("Favor de agregar un valor en valor uno");
        }
    }
    else
    {
        alertaError("Favor de agregar una respuesta en respuesta uno");
    }
    
}
/**************************************************************************************************************/
function cancelarEditarRespuestas(){
    $("#divEditarRespuesta").css({"display":"none"});
}
/****************************************************************************************************************************************************************************************/
