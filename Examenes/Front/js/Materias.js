
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
    
    //inavilitamos las otras vistas para ver datos;
}

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