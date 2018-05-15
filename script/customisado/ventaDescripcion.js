$(document).ready(function(){
    var tablita ;
        $.ajax({
            url:'MostrarDescripcionVenta',
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
                         {title:"Id DescripcionVenta"},
                         {title:"Id Detalle"},
                         {title:"PrecioUnitario"},
                         {title:"Folio"}
                     ]
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
    
   $("#btnAgragar").click(function(){
      $("#modalAgregar").modal();
   });
   
   $("#btnAgregarDescrionVenta").click(function(){
       if($("#frmdatosAgregar").validationEngine('validate'))  
        {
            var idDetalle = $("#txtidDetalle").val();
            var precioUnitario = $("#txtprecioUnitario").val();
            var folio = $("#txtFolio").val();
            $.ajax({
                url:'AgregarVentaDetalle',
                type:'post',
                data:{
                    idDetaller:idDetalle,
                    precioUnitarior:precioUnitario,
                    folior:folio
                },
                datatype:'json',
                success:function(exito){
                    var obj = jQuery.parseJSON(exito);    
                    console.log(obj);
                    if(obj.valor==='Ok'){
                        var t = $('#example').DataTable();
                            t.row.add([
                                     obj.ids ,
                                     idDetalle ,
                                     precioUnitario ,
                                     folio 

                            ]).draw( false );
                    }
                }
            });
        }
   });
   
   
   
      
    $("#DelleteRow").click(function(){
        var datosTabla = tablita.row('.selected').data();                
     var res = confirm("Desea eliminar la descripcion de la venta?");
     if(res===true)
     {
         $.ajax({
             async:false, 
             url:'EliminarDescripcionVenta',
             type:'post',
             data :{
                 descripcionventar:datosTabla[0]
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
    
    
    
   
});

