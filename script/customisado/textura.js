$(document).ready(function(){
   var tablita ;
        $.ajax({
            url:'MostrarTexturas',
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
                         {title:"Textura"},
                         {title:"Precio"},
                         {title:"imagen"}
                     ]
                 });
            }
        });    
   
   
   
   
   //Funcionalidad para el boton agregar
    $("#btnAgragar").click(function(){
      $("#modalAgregar").modal() ;
   });
   
   /**********************************Agregamos los datos de textura en el  servidor*****************************/
   $("#btnSave").click(function(){
      if($("#frmdatos").validationEngine('validate')) 
      {
          //var inputFileImage = document.getElementById('archivoImage');
          //var file = inputFileImage.files[0];
          //var datotitos = new FormData();
          var textura = $("#txtTextura").val();
          var precio = $("#txtprecio").val();
          var filedato =$("#fupImagen").val();
          var datos = new FormData();
          jQuery.each(jQuery('#fupImagen')[0].files, function(i, file) {
            datos.append('file-'+i, file);
          });         
          datos.append(textura,textura);
          datos.append(precio,precio);         
          $.ajax({
              url:'AgregarTextura',
              type:'post',
              enctype: 'multipart/form-data',
              cache: false,
              processData: false,
              contentType: false,
              data:datos,
              dataType:'json',
              success:function(drom){
                  
                   
               //var jsondatos =	jQuery.parseJSON(drom);
                  //alert(drom.valor);
                   //var t = $('#example').DataTable();
                   var id = drom.ids;
                   var ur=drom.liga;
                   
                   if(drom.valor==="Ok")
                   {
                       var t = $('#example').DataTable();
                       t.row.add([
                                     id ,
                                     textura ,
                                     precio ,
                                     ur 

                                 ]).draw( false );
                                 
                                 $("#txtTextura").val('');
                                 $("#txtprecio").val('');
                                 $("#fupImagen").val('');
                   }
                   else
                   {
                       alert("No entro");
                   }
                  
                  //alert(drom.ids);
                  //Ocultamos nuevamente los modales
                  $('#modalAgregar').modal('hide'); 
              }
              
          });
      }
      else
      {
          alert("No validados");
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
     var res = confirm("Desea eliminar la textura");
     if(res===true)
     {
         $.ajax({
             async:false, 
             url:'EliminarTextura',
             type:'post',
             data :{
                 textura:datosTabla[0]
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
 /**Mandamos llamar la ventana*/
 $("#btnupdate").click(function(){
     
      var datosTabla = tablita.row('.selected').data();
      $("#txtTexturaActualizar").val(datosTabla[1]);
      $("#txtprecioActualizar").val(datosTabla[2]);
      $("#hidids").val(datosTabla[0]);
      
     $("#modalActualizar").modal() ;
     
     
 });
  $("#btnSaveUpdate").click(function(){
      
      //Validad la informacion que sea la correcta
      if($("#frmdatos").validationEngine('validate')) 
      {
          var datosTabla = tablita.row('.selected').data();
          var texturas = $("#txtTexturaActualizar").val();
          var precios = $("#txtprecioActualizar").val();
          var datoss = new FormData();
          jQuery.each(jQuery('#fupImagenActualizar')[0].files, function(i, file) {
            datoss.append('file-'+i, file);
          });         
          datoss.append(texturas,texturas);
          datoss.append(precios,precios);         
          datoss.append(datosTabla[0],datosTabla[0]);
          //Mandamos la informacioon necesaria por ajax
          $.ajax({
              url:'ActualizarTextura',
              type:'post',
              enctype: 'multipart/form-data',
              cache: false,
              processData: false,
              contentType: false,
              data:datoss,
              datatype:'json',
              success:function(rumin)
              {
                  //idCampo
                  //textura
                  //imagens
                  //preciosTextura
                  //valor
                  
                  var obj = jQuery.parseJSON(rumin);                            
                  //alert(obj.valor === "Ok");
                  if(obj.valor === "Ok")
                  {
                      //Movemos todo lo que esta en la tabla
                      tablita.row('.selected').remove().draw( false );
                      
                      //Agregamos los dato en la tabla
                      var t = $('#example').DataTable();
                      t.row.add([
                                     obj.idCampo ,
                                     obj.textura ,
                                     obj.preciosTextura ,
                                     obj.imagens                                     
                                 ]).draw( false );
                      
                       //Desaparecemos el objeto
                      $('#modalActualizar').modal('hide'); 
                  }
                  //console.log(rumin);
                  //alert(rumin.valor);
                  
                  
                  
              }
          });
      }
  });
 
 
   
});

