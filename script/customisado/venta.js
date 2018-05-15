$(document).ready(function(){
    var tablita ;
        $.ajax({
            url:'MostrarVentas',
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
                         {title:"Folio"},
                         {title:"Cliente"},
                         {title:"Fecha venta"},
                         {title:"Monto total"}
                     ]
                 });
            }
        });
    
    
    $("#btnAgragar").click(function(){
       $("#modalAgregar").modal();           
       
    });
    $("#btnAgregarVenta").click(function(){
        if($("#frmdatosAgregar").validationEngine('validate'))
        {
            var cliente = $("#sltCliente").val();            
            var montoTotal = $("#txtMontoTotal").val();
            $.ajax({
                url:'AgregarVentas',
                type:'post',
                data:{
                    clie:cliente,
                    mont:montoTotal
                    
                },
                datatype:'json',
                success:function(exito){
                    var obj = jQuery.parseJSON(exito);    
                    console.log(obj);
                    if(obj.valor==='Ok'){
                        var t = $('#example').DataTable();
                            t.row.add([
                                     obj.folio ,
                                     obj.cliente ,
                                     obj.fecha,
                                     montoTotal 
                                     

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
    
    $('#DelleteRow').click( function () {
        var datosTabla = tablita.row('.selected').data();                
        var res = confirm("Desea eliminar la venta?");
        if(res===true)
        {
            $.ajax({
                async:false, 
                url:'EliminarVenta',
                type:'post',
                data :{
                    filio:datosTabla[0]
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
       var modelo = $('#sltClienteActualizar option').filter(function () { return $(this).html() ==datosTabla[1] ; }).val();               
       $("#sltClienteActualizar").val(modelo);
        
       $("#txtMontoTotalActualizar").val(datosTabla[3]);
       
       $("#modalActualizar").modal();
   });
   
   $("#btnActualizarVenta").click(function(){
      if($("#frmdatosActualizar").validationEngine('validate')){
        var folio = $("#hidids").val();
        var cliente =$("#sltClienteActualizar").val();
        var montoTotal =$("#txtMontoTotalActualizar").val();
        
        $.ajax({
           url:'ActualizarVenta',
           type:'post',
           data:{
              fil:folio,
               cli:cliente,
               mont:montoTotal
               
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
                                     folio ,
                                     datos.cliente ,
                                     datos.fecha,
                                     montoTotal
                                     
                                 ]).draw( false );
                   $('#modalActualizar').modal('hide');
                   
               }
           }
        });
     }
   });
   
   
   
    
});

