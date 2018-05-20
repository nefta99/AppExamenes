
function pruebados()
{
    //alertaExito('Hola que hace');
    alertaError('Hola que hace');
}
function prueba()
{
    cerrarAlerta();
   
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

function cerrarAlerta()
{
    $(".alert").alert('close');
}
function mostrarContenido(){
    $("#divGuardarMaterias").css({"display" :"block"});
    $("#divBuscarMaterias").css({"display":"none"});
    $("#divTablaMaterias").css({"display":"none"});
    
    
    //inavilitamos las otras vistas para ver datos;
}
/*****************************************************************************************************/
function guardarMateriasNuevas(){
    var materia =$("#txtmateria").val();
    var usuario =$("#hdfusuario").val();
     cerrarAlerta();
    if(materia!="")
    {
        var paramentros = {
        "opt": "guarMaterias",
        "mat":materia,
        "usuario": usuario

        };
        $.ajax({
            url: '../Clases/Remo/remoto.php',
            type: 'POST',
            cache: false,
            async: false,
            data: paramentros,
            dataType: "json",
            success: function (data) {        		
                if(data.salida=="Ok"){
                    $("#txtmateria").val('');                   
                    alertaExito("La información se agrego correctamente");
                }
                else
                {
                    $("#txtmateria").val('');
                    alertaError("Esta informacion ya esta guardada en la base de datos");
                }
            },
            error: errorHandler = function (xhr, errorType, exception) {
                console.log(exception + xhr.statusText);
            }
        });
    }
    else
    {
         alertaError("Favor de agregar una materia en el cuadro de texto");
    }
}

/********************************************************************************************************************************/    
function mostrarBuscarMaterias()
{
     cerrarAlerta();   
    $("#divGuardarMaterias").css({"display":"none"});
    $("#divBuscarMaterias").css({"display":"block"});
     $("#divTablaMaterias").css({"display":"block"});
    
    llenarTablaMaterias();
    
}
/********************************************************************************************************************************************/
function llenarTablaMaterias()
{
    cerrarAlerta(); 
    var tablita;
    var paramentros = {
        'opt':'cargarMaterias'
        };
    $.ajax({
            url:'../Clases/Remo/remoto.php',
            type:'POST',
            data: paramentros,
            dataType:'json',
            success: function(ds)
            {
                 tablita = $("#example").DataTable({
                     data:ds,
                     language:{url:'../Front/js/Spanish.json'},     
                     "bDestroy": true,
                     columns:[
                         {title:"IdMateria"},
                         {title:"Materia"},
                         {title:"Creado"},
                         {title:"Guardado"},
                         {
                             sortable: false,
                                "width": "20%",
                                "render": function(datas, type, full, meta) {
                                    var buttonID = "rollover_" + full.id;
                                    var editID="edit_"+full.id;                                    
                                    return "<a id=" + buttonID + " class='btn btn-primary rolloverBtn' role='button'    onclick='eliminar(" + ds[meta.row][0] + ","+meta.row+");' ><img src='../Front/img/EliminarR.png' width='30px' height='30px'   /></a>&nbsp; <a id=" + editID + " class='btn btn-primary rolloverBtn' role='button'    onclick='cargarEditada(" + ds[meta.row][0] + ","+meta.row+",\""+ds[meta.row][1]+"\");' ><img src='../Front/img/update.png' width='30px' height='30px'   /></a>";
                                }
                         }
                     ]
                 });
                ////Agregamos los dato en la tabla
                //var t = $('#example').DataTable();
                //for(var i=0;i<=dataset.length-1;i++){
                //   t.row.add([
                //             dataset[i].IdMateria ,
                //             dataset[i].Nombre ,
                //             dataset[i].FechaCreacion ,
                //             dataset[i].CreadoPor                                     
                //   ]).draw( false );
                //
                //}
                //
                ////Desaparecemos el objeto
                
                 
                 
            },error: errorHandler = function (xhr, errorType, exception) {
                //console.log(exception + xhr.statusText);
                alertaError(exception + xhr.statusText);
            }
        });    
}
/***********************************************************************************************************************/
function cargarEditada(id,registro,materia){
    $("#divactualizarMaterias").css({"display":"block"});    
    $("#txtActualizaMateria").val(materia);
    $("#hdfId").val(id);   
    cerrarAlerta(); 
    
}
/***********************************************************************************************************************************/
function editarMateriaupd(){
    var materia= $("#txtActualizaMateria").val();
    var id= $("#hdfId").val();   
    $("#divactualizarMaterias").css({"display":"none"});  
    if (materia!="")
    {
        var paramentros = {
        "opt": "editarMateria",
        "materia":materia,
        "id":id
        };
        $.ajax({
            url:'../Clases/Remo/remoto.php',
            type: 'POST',
            cache: false,
            async: false,
            data: paramentros,
            dataType: "json",
            success: function (data) {
                if(data.Resultado=='Ok')
                {
                    $("#txtActualizaMateria").val('');                
                    llenarTablaMaterias();
                    alertaExito("La información se edito correctamente");
                }
            },
            error: errorHandler = function (xhr, errorType, exception) {
                console.log(exception + xhr.statusText);
            }
        });
    }
    else
    {
        alertaError("Favor de agrega un nombre a la materia");
    }
    
    
}
/****************************************************************************************************************************************/
function eliminar(id,numeroGrid){
    var con = confirm("¿En realidad quiere eliminar el registro?");
    if (con==true){
        mandarPeticionEliminar(id,numeroGrid);
    }
}
/*****************************************************************************************************************************************************/
function mandarPeticionEliminar(id,numerogrid){
    var paramentros = {
        "opt": "eliminarMateria",
        "id":id
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) { 
            if(data.Resultado=="Ok"){
                llenarTablaMaterias();
                alertaExito("Se eliminado correctamente la materia");
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            //console.log(exception + xhr.statusText);
            alertaError(exception + xhr.statusText);
        }
    });
}
/********************************************************************************************************************************/