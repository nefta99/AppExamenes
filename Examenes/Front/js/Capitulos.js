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
/***************************************************************************************************************/
function mostrarContenido(){
    $("#divGuardarCapitulos").css({"display" :"block"});
    $("#divBuscarCapitulo").css({"display" :"none"});
    $("#divTablaMaterias").css({"display":"none"});
    catalogomaterias();
    
    
}
/***************************************************************************************/
function catalogomaterias()
{
     $("#ddlmateria").empty();
    var paramentros = {
        "opt": 'cargarMateriasCatalogo'
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
/***********************************************************************************************************/
function guardarCapitulosnuevos(){
    cerrarAlerta();
    if($("#ddlmateria").val() != "")
    {
        if($("#txtcapitulo").val()!="")
        {
            guardar($("#ddlmateria").val(),$("#txtcapitulo").val(),$("#hdfusuario").val());
        }
        else
        {
            alertaError("Favor de agregar un capitulo");
        }
    }
    else
    {
        alertaError("Favor de seleccionar una materia");
    }
}
/**********************************************************************************************/
function guardar(idmateria,capitulo,usuario)
{
    var paramentros = {
        "opt": "guardarcapitulos",
        "idmateria":idmateria,
        "capitulo":capitulo,
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
            $("#txtcapitulo").val('');
            if(data[0].Resultado=="Ok")
            {
                alertaExito("La informacion a sido guardada correctamente");
            }
            else
            {
                  alertaError("No se puede repetir dos veces el capitulo devido a que ya ésta guardado");
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/********************************************************************************************************************************************************************/
function mostrarBuscarCapitulos(){
    $("#divGuardarCapitulos").css({"display":"none"});
    $("#divBuscarCapitulo").css({"display":"block"});
    $("#divTablaMaterias").css({"display":"block"});
    cargartablaCapitulos();
}
/****************************************************************************************************************************************************/
function cargartablaCapitulos()
{
    cerrarAlerta(); 
    var tablita;
    var paramentros = {
        "opt": "cargarCapitulos"
        };
    $.ajax({
        url:'../Clases/Remo/remoto.php',
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
                         {title:"IdCapitulo"},
                         {title:"Capitulo"},
                         {title:"Materia"},
                         {title:"Quien guardo"},
                         {title:"FechaGuardado"},
                         {
                             sortable: false,
                                "width": "20%",
                                "render": function(datas, type, full, meta) {
                                    var buttonID = "rollover_" + full.id;
                                    var editID="edit_"+full.id;                                    
                                    return "<a id=" + buttonID + " class='btn btn-primary rolloverBtn' role='button'    onclick='eliminar(" + ds[meta.row][0] + ","+meta.row+");' ><img src='../Front/img/EliminarR.png' width='30px' height='30px'   /></a>&nbsp; <a id=" + editID + " class='btn btn-primary rolloverBtn' role='button'    onclick='cargarEditada(" + ds[meta.row][0] + ","+meta.row+",\""+ds[meta.row][2]+"\",\""+ds[meta.row][1]+"\");' ><img src='../Front/img/update.png' width='30px' height='30px'   /></a>";
                                }
                         }
                     ]
                 });
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/************************************************************************************************************************************************/
function cargarEditada(idcapitulo,registroN,materia,capitulo){
    $("#divactualizarCapitulo").css({"display":"block"});
    $("#hdfIdcaputulo").val(idcapitulo);
    $("#txtcapituloeditar").val(capitulo);
    precargarmaterias(materia);
}
/***************************************************************************************************************************************************************************/
function precargarmaterias(materia){
     $("#ddlmateriaeditar").empty();
    var paramentros = {
        "opt": 'cargarMateriasCatalogo'
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
                    if(data[i].Materia==materia){
                        html+='<option value="-1">Seleccionar </option>';
                        html+='<option  selected value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                    }
                    else
                    {
                        html+='<option value="-1">Seleccionar </option>';
                        html+='<option  value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                    }              
                    
                }
                else
                {
                    if(data[i].Materia==materia){
                        html+='<option selected value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                    }
                    else
                    {
                        html+='<option value="'+data[i].IdMateria+'">'+data[i].Materia+'</option>';
                    }
                }
            }
            $("#ddlmateriaeditar").append(html);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/****************************************************************************************************************/
function editar(){
   var idmateria =$("#ddlmateriaeditar").val();
   var capitulo =$("#txtcapituloeditar").val();
   var idcapitulo =$("#hdfIdcaputulo").val();
   
   var paramentros = {
        "opt": "editarCapitulos",
        "idmateria":idmateria,
        "capitulo":capitulo,
        "idcapitulo":idcapitulo
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {    
            if(data[0].Resultado=='Ok'){
                cargartablaCapitulos();
                alertaExito("La información a sido editada correctamente");
                $("#txtcapituloeditar").val('');
            }
            else
            {
                alertaError("Sucedio algo extraño en la aplicación.");
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
   
}
/*************************************************************************************************************/
function eliminar(id,row){
    var con = confirm('¿Desea eliminar el capitulo?');
    if(con==true){
        var paramentros = {
        "opt": "borrarCapitulo",
        "idcapitulo":id
        };
        $.ajax({
            url: '../Clases/Remo/remoto.php',
            type: 'POST',
            cache: false,
            async: false,
            data: paramentros,
            dataType: "json",
            success: function (data) {  
                if(data[0].Resultado=="Ok")
                {
                   alertaExito("La información se a eliminado correctamente!");
                   cargartablaCapitulos();
                }
                else
                {
                    alertaError("Sucedio un error a la hora de borar! :(");
                    
                }
            },
            error: errorHandler = function (xhr, errorType, exception) {
                console.log(exception + xhr.statusText);
            }
        });
    }
}
/***********************************************************************************************************************************/
function cancelaEditar(){
    $("#txtcapituloeditar").val('');
    $("#divactualizarCapitulo").css({"display":"none"});
}