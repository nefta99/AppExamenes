$(document).ready(function(){
    var tablita ;
        $.ajax({
            url:'MostrarDetalleProducto',
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
                         {title:"Modelo"},
                         {title:"Color"},
                         {title:"Material"},
                         {title:"Textura"},
                         {title:"Cubierta"},
                         {title:"Tamanio"},
                         {title:"urlProducto"}
                     ]
                 });
            }
        });  
        
        $("#btnAgragar").click(function(){
           $("#modalAgregar").modal();
            //alert("Hola");
        });
        //btnProductoActualizar
        $("#btnProductoAgregar").click(function(){
            if($("#frmdatosAgregarDatosr").validationEngine('validate')) 
            {
                var modelo =   $("#txtModelo").val();
                var color =    $("#txtColor").val();
                var material = $("#txtMaterial").val();
                var producto = $("#sltproducto").val();
                var textura =  $("#slttextura").val();
                var cubierta = $("#sltcubierta").val();
                var tamanio =  $("#txttamanio").val();
                var datos = new FormData();
                jQuery.each(jQuery('#filefoto')[0].files, function(i, file) {
                    datos.append('file-'+i, file);
                });         
                datos.append(modelo,modelo);
                datos.append(color,color);
                datos.append(material,material);
                datos.append(producto,producto);
                datos.append(textura,textura);
                datos.append(cubierta,cubierta);
                datos.append(tamanio,tamanio);
                $.ajax({
                    url:'AgregarDetalleProducto',
                    type:'post',
                    enctype: 'multipart/form-data',
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: datos,
                    dataType:'json',
                    success:function(drom){
                        
                        console.log(drom)
                        if(drom.valor==="Ok")
                        {
                            var t = $('#example').DataTable();
                            t.row.add([
                                        drom.ids ,
                                        drom.Producto ,
                                        modelo ,
                                        color,
                                        material,
                                        drom.Textura,
                                        drom.Cubierta,
                                        drom.liga

                                ]).draw( false );
                                
                                  $("#txtModelo").val('');
                                  $("#txtColor").val('');
                                  $("#txtMaterial").val('');
                                  $("#sltproducto").val('');
                                  $("#slttextura").val('');
                                  $("#sltcubierta").val('');
                                  $("#txttamanio").val('');
                                  $('#modalAgregar').modal('hide'); 
                        }
                    }
                });
                
            }
            else
            {
                alert("Hoay datos incorrectos");
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
        /**Elimina el registro*/
        $("#DelleteRow").click(function(){
            var datosTabla = tablita.row('.selected').data();                
            var res = confirm("Desea eliminar la textura");
            if(res===true){
                $.ajax({
                async:false, 
                url:'EliminarDetalleProducto',
                type:'post',
                data :{
                    detalle:datosTabla[0]
                },
                success:function(data){
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
        /*Actualizar modales*/
        $("#btnupdate").click(function(){
               var datosTabla = tablita.row('.selected').data();
               $("#hidids").val(datosTabla[0]);             
               
              //Seleccionamos nuestro select con los campos necesarios
               var producto= $('#sltproductoActualizar option').filter(function () { return $(this).html() ==datosTabla[1] ; }).val();
               $("#sltproductoActualizar").val(producto);
               $("#txtModeloActuzalizar").val(datosTabla[2]);
               $("#txtColorActualizar").val(datosTabla[3]);
               $("#txtMaterialActualizar").val(datosTabla[4]);
               
               var textura = $('#slttexturaActualizar option').filter(function () { return $(this).html() ==datosTabla[5] ; }).val();               
               $("#slttexturaActualizar").val(textura);
               
               var cubierta = $('#sltcubiertaActualizar option').filter(function () { return $(this).html() ==datosTabla[6] ; }).val();                              
               $("#sltcubiertaActualizar").val(cubierta);      
               
               $("#txttamanioActualizar").val(datosTabla[7]);
               
               //mostramos el madal 
               $("#modalActualizar") .modal();
        });
        /*Para actualizar la informacion*/
        $("#btnProductoActualizar").click(function(){
            if($("#frmdatosActualizar").validationEngine('validate')){
                
                var modelo =   $("#txtModeloActuzalizar").val();
                var color =    $("#txtColorActualizar").val();
                var material = $("#txtMaterialActualizar").val();
                var producto = $("#sltproductoActualizar").val();
                var textura =  $("#slttexturaActualizar").val();
                var cubierta = $("#sltcubiertaActualizar").val();
                var tamanio =  $("#txttamanioActualizar").val();
                var id = $("#hidids").val();
                
                var datos = new FormData();
                jQuery.each(jQuery('#filefotoActualizar')[0].files, function(i, file) {
                    datos.append('file-'+i, file);
                });         
                datos.append(modelo,modelo);
                datos.append(color,color);
                datos.append(material,material);
                datos.append(producto,producto);
                datos.append(textura,textura);
                datos.append(cubierta,cubierta);
                datos.append(tamanio,tamanio);
                datos.append(id,id);
                $.ajax({
                    url:'ActualizacionDetalleProducto',
                    type:'post',
                    enctype: 'multipart/form-data',
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: datos,
                    dataType:'json',
                    success:function(drom){
                        
                        console.log(drom)
                        if(drom.valor==="Ok")
                        {
                            tablita.row('.selected').remove().draw( false );
                            var t = $('#example').DataTable();
                            t.row.add([
                                     id ,
                                     drom.producto ,
                                     modelo ,
                                     color,
                                     material,
                                     drom.textura,
                                     drom.cubierta,
                                     tamanio,
                                     drom.liga
                                 ]).draw( false );
                      
                        //Desaparecemos el objeto
                        $('#modalActualizar').modal('hide'); 
                        }
                    }
                });
            }
            else{
                alert("Hay datos erroneps");
            }
        });
        
        
});