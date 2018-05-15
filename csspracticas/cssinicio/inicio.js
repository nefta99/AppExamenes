

$(document).ready(function(){
    tomarpaginas();
});

function tomarpaginas()
{
    $.ajax({
                           url:'../csspracticas/Clases/Remo/remoto.php',                           
                           type:'post',
                           data :{
                                opt : 'Inicio'                                
    
                           },
                           datatype:'json',
                           success:function(datos)
                           {
                               //var obj = jQuery.parsJSON(datos);
                               //console.log(datos[0].Fruta);
                               //console.log(datos);
                               //datos[i].Titulo
                               //datos[i].Titulo
                               //Recoremos todo el arreglo para sacar la informacion 
                               var strDatos="";
                               for(var i = 0; i<=datos.length-1;i++){
                                   
                                   strDatos +="<div class='subcontenido'>";
                                   strDatos += "<a href=\""+datos[i].Link+"\">"+datos[i].Titulo+"</a>";
                                   strDatos+="</div>";                                       
                               }
                               $("#contenedor").html(strDatos);
                                
                         
                               
                               
                           },error: function(xhr, status ,error){
                               
                               alert(error);
                           }
                           
    });
}