$(document).ready(function(){
    var tablita ;
        $.ajax({
            url:'MostrarListaPrecio',
            type:'post',
            data:
            {
                varis:''
            },
            dataType:'json',
            success: function(dataset)
            {
                 tablita = $("#example").DataTable({
                     data:dataset,
                     columns:[
                         {title:"id"},
                         {title:"Modelo"},
                         {title:"PrecioLista"},
                         {title:"PrecioVenta"}
                     ]
                 });
            }
        });   
    
    /*Boton agregar*/
    $("#btnAgragar").click(function(){
        $("#modalAgregar").modal();
    });
    
    /*Agregamos los datos al servidor*/
    $("#btnListaPrecioAgregar").click(function(){
        if($("#frmdatosAgregar").validationEngine('validate'))  
        {
            var modelo = $("#sltModelo").val();
            var precioLista = $("#txtPrecioLista").val();
            var precioVenta = $("#txtPrecioVenta").val();
            $.ajax({
                url:'AgregarPrecioLista',
                type:'post',
                data:{
                    mod:modelo,
                    prelis:precioLista,
                    preven:precioVenta
                },
                datatype:'json',
                success:function(exito){
                    var obj = jQuery.parseJSON(exito);    
                    console.log(obj);
                    if(obj.valor==='Ok'){
                        var t = $('#example').DataTable();
                            t.row.add([
                                     obj.ids ,
                                     obj.modelo ,
                                     precioLista ,
                                     precioVenta 

                            ]).draw( false );
                    }
                }
            });
        }
    });
    
      /*Modo para seleccionar una line en la tabla*/ 
   $('#example').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            tablita.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }                    
    });
    
        /* Eliminar datos de la textuta**/
 $('#DelleteRow').click( function () {
     var datosTabla = tablita.row('.selected').data();                
     var res = confirm("Desea eliminar el precio lista?");
     if(res===true)
     {
         $.ajax({
             async:false, 
             url:'EliminarPrecioLista',
             type:'post',
             data :{
                 ListaPrecio:datosTabla[0]
             },
             success:function(data)
             {
                 //algp ara
                 var obj = jQuery.parseJSON( data );                      
                 
                 if(obj.valor==="Ok")
                 {
                     tablita.row('.selected').remove().draw( false );
                 }
             }
         });
     }
     
 });
 
 
 $("#btnupdate").click(function(){
      var datosTabla = tablita.row('.selected').data();
     
     $("#hidids").val(datosTabla[0]);
     var modelo = $('#sltModeloActualizar option').filter(function () { return $(this).html() ==datosTabla[1] ; }).val();               
     $("#sltModeloActualizar").val(modelo);
     
     $("#txtPrecioListaActualiza").val(datosTabla[2]);
      
     $("#txtPrecioVentaActualizar").val(datosTabla[3]);      
      
     $("#modalActualizar").modal();
 });   
 
 $("#btnListaPrecioActualizar").click(function(){
     if($("#frmdatosActualizar").validationEngine('validate')){
        var vrid = $("#hidids").val();
        var modelo =$("#sltModeloActualizar").val();
        var Preciolista =$("#txtPrecioListaActualiza").val();
        var preciVenta =$("#txtPrecioVentaActualizar").val();
        $.ajax({
           url:'ActualizarListaPrecio',
           type:'post',
           data:{
               id:vrid,
               modelo:modelo,
               lista:Preciolista,
               venta:preciVenta
           },
           dataType:'json',
           success:function(datos){
               console.log(datos);
               
              if(datos.valor==='Ok'){
                   //Eliminamos el registro selecciondo
                   tablita.row('.selected').remove().draw( false );
                   //Agregamos los dato en la tabla
                   var t = $('#example').DataTable();
                   t.row.add([
                                     vrid ,
                                     datos.modelo ,
                                     Preciolista,
                                     preciVenta
                                     
                                 ]).draw( false );
                   $('#modalActualizar').modal('hide');
                   
               }
           }
        });
     }
     
 });
 
    
    
});


