$(document).ready(function(){
   $("#btnAgregar").click(function(){
        //agregar();
       $('#agregarda').modal('show');
        
   });
   
   llenagrid();
         //$("#modalAgregar").modal() ;
         
   $("#btnGuardar").click(function(){
      agregar();
   });
});

function llenagrid()
{
    var tablita;
    $.ajax({
                           url:'../csspracticas/Clases/Remo/remoto.php',
                           type:'post',
                           data :{
                               opt:'LlenarGridAgregar'                               
    
                           },
                           datatype:'json',
                           success:function(dataSet)
                           {
                               console.log(dataSet);
                               tablita = $('#example').DataTable( {
                                                data: dataSet,
                                                columns: [
                                                    { title: "Id" },
                                                    { title: "Body" },
                                                    { title: "LleyendaHtml" },
                                                    { title: "Leyendacss" },
                                                    { title: "CssMostrar" },
                                                    { title: "Ubicacion" },
                                                    { title: "Link" },
                                                    { title: "Titulo" }
                                                    
                                                    
                                                ]
                                                
                                        });
                           }
    });
}

function agregar()
{
    
    var titulo = $("#txtTitulo").val();
    var body = $("#txtbody").val();
    var leyendaHtml = $("#txtleyendaHtml").val();
    var htmlmostra = $("#txthtmlmostrar").val();
    var Leyendacss = $("#txtLeyendacss").val();
    var CssMostrar = $("#txtCssMostrar").val();
    var ubicacion = $("#txtubicacion").val();
    var link = $("#txtlink").val();
    
//    console.log(titulo);
//    console.log(body);
//    console.log(leyendaHtml);
//    console.log(htmlmostra);
//    console.log(Leyendacss);
//    console.log(CssMostrar);
//    console.log(ubicacion);
    

    $.ajax({
                           url:'Clases/Remo/remoto.php',
                           type:'post',
                           data :{
                                opt : 'AgregarPaginas',
                                titulo :titulo,
                                body:body,
                                leyendaHtml:leyendaHtml,
                                Leyendacss:Leyendacss,
                                CssMostrar:CssMostrar,
                                ubicacion:ubicacion,
                                Link:link
                                
    
                           },
                           datatype:'json',
                           success:function(datos)
                           {
                               console.log(datos + ""); 
                               if(datos[0].Mensaje == 'Ok'){
                                    alert("La información se agrego correctamente");
                                    llenagrid();
                                }
                                else
                                {
                                    alert("Tristemente no se agrego la información");
                                }
                           },
                           error: function(xhr, status, error) {
                                //var err = eval("(" +error  + ")");
                                alert(error);
                           }
    });
    
    
}