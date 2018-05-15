$(document).ready(function(){
    
    var tablita ;
        $.ajax({
            url:'MostrarProductos',
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
                         {title:"Producto"},
                         {title:"Descripcion"}
                         
                     ]
                 });
            }
        });
    
    
    $("#btnAgragar").click(function(){
       $("#modalAgregar").modal() ;
    });
    /* Agregamos el producto**/
    $("#btnguardarProducto").click(function(){
        if($("#frmdatos").validationEngine('validate')) 
        {
            var vrProducto = $("#txtproducto").val();
            var vrDescripcion = $("#txtDescripcion").val();
            $.ajax({
                url:'AgregarProducto',
                type:'post',
                data: {
                    producto:vrProducto,
                    descripcion:vrDescripcion
                },
                dataType:'json',
                success: function(datos){
                    //console.log(datos);
                    //var obj = jQuery.parseJSON(datos);                            
                    if(datos.valor === "Ok")
                    {
                        //no falta agregar los datos para que se muestren enla tabla.
                       
                        
                        //Limpiamos las variables
                        $("#txtproducto").val('');
                        $("#txtDescripcion").val('');
                        //ocultamos el modal
                        $('#modalAgregar').modal('hide'); 
                    }
                }
            });
        }
        else
        {
            alert("Haya datos no validos");
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
     var res = confirm("Desea eliminar el producto");
     if(res===true)
     {
         $.ajax({
             async:false, 
             url:'EliminarProducto',
             type:'post',
             data :{
                 producto:datosTabla[0]
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
 
 
 /****** actualizamos los tipos**********************************/
 
 $("#btnupdate").click(function(){
     var datosTabla = tablita.row('.selected').data();
     $("#txtproductoActualizar").val(datosTabla[1]);
      $("#txtDescripcionActualizar").val(datosTabla[2]);
      $("#hidids").val(datosTabla[0]);
      
     $("#modalActualizar").modal();
 });
 
 $("#btnProductoActualizar").click(function(){
     if($("#frmdatos").validationEngine('validate')){
        var vrid = $("#hidids").val();
        var vpproducto =$("#txtproductoActualizar").val();
        var ddescripcion =$("#txtDescripcionActualizar").val();
        $.ajax({
           url:'ActualizarProducto',
           type:'post',
           data:{
               id:vrid,
               producto:vpproducto,
               descripcion:ddescripcion
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
                                     vpproducto ,
                                     ddescripcion 
                                     
                                 ]).draw( false );
                   $('#modalActualizar').modal('hide');
                   
               }
           }
        });
        
     }
     else{
         alert("Datos invalidos");
     }
     
 });
 
 
    
});