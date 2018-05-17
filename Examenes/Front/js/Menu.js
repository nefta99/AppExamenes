
$(document).ready(function(){
    $("#ACerrar").click(function(){
        cerrarSession();
    });
    llenarMenu();
    
});
function cerrarSession()
{
    var paramentros = {
        "opt"  : "cerrarSession"
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) { 
            
            window.location=data.ur;
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
function llenarMenu(){
    var usuario = $("#hdfusuario").val();
    var paramentros = {
        "opt"  : "CrearMenu",
        "user" : usuario
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
            if(data.TipoUsuario=="Administrador")
            {
               
                html+='<li><a href="'+data.url +'Materias">Materias</a></li>';
                html+='<li><a href="'+data.url +'Capitulos">Capitulos</a></li>';
                html+='<li><a href="'+data.url +'Preguntas" >Preguntas</a></li>';
                html+='<li><a href="'+data.url+'Examenes" >Examenes</a></li>';
                html+='<li><a href="'+data.url+'Resultados">Resultados</a></li>';
                html+='<li><a href="'+data.url+'Alumnos" >Alumnos</a></li>';
                html+='<li><a href="'+data.url+'Administrador" >Administrador</a></li>';
                
                
            }
            else
            {
                //usuario con perfil de alumno
                
                html+='<li><a href="'+data.url+'Examenes" >Examenes</a></li>';
                html+='<li><a href="'+data.url+'Resultados">Resultados</a></li>';
                
                
            }
            
            $("#crearmenu").append(html);
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}