/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var tablita;
               $.ajax({
                    url:'Dos',
                    type:'post',
                    data: {
                        user:"",
                        bress:""
                    },
                    dataType: 'json',
                    success: function(dataSet){
                        //ponemos los datos del json que tiene en nuestro servidor
                       tablita =$('#example').DataTable( {
                                                data: dataSet,
                                                columns: [
                                                    { title: "ids" },
                                                    { title: "nombres" },
                                                    { title: "apaterno" },
                                                    { title: "amaterno" },
                                                    { title: "colonia" },
                                                    { title: "telefono" },
                                                    { title: "correo" },
                                                    { title: "usuario" },
                                                    { title: "pasword" },
                                                    { title: "rol" },
                                                    { title: "domicilio" }
                                                    
                                                    
                                                ]
                                                
                       });
                    }                    
               }); 
    
      
    
   $("#addRow").click(function(){
       $('#myModal').modal();
   });
   
   /**********************************Agregamos los dato ala tabla*********************************************************/
               $("#btnSave").click(function(){
                   if($("#frmDaost").validationEngine('validate'))
                   {
                       var vrnombre=$("#txtnombre").val();
                       var vrpartno=$("#txtapaterno").val();
                       var vrmaterno=$("#txtamaterno").val();
                       var vrdomicilio=$("#txtdomicilio").val();
                       var vrcolonia=$("#txtcolonia").val();
                       var vrtelefono=$("#txttelefono").val();
                       var vrcorreo=$("#txtcorreo").val();
                       var vrusuario=$("#txtusuario").val();
                       var vrcontrasenia=$("#txtcontrasenia").val();
                       var vrtipo=$("#selecRol").val();
                       var rol = $("#selecRol option:selected").text();
                       
                       $.ajax({
                           url:'AgregarUsuarioRol',
                           type:'post',
                           data :{
                                nombre : vrnombre,
                                paterno : vrpartno,
                                materno : vrmaterno,
                                domicilio : vrdomicilio,
                                colonia : vrcolonia,
                                telefono : vrtelefono,
                                correo : vrcorreo,
                                usuario : vrusuario,
                                contrasenia : vrcontrasenia,
                                tipo : vrtipo
                           },
                           datatype:'json',
                           success:function(datos)
                           {
                               var obj = jQuery.parseJSON(datos);                            
                               if(obj.valor === "Ok")
                               {
                                //con esta funcion lo que hacemos es agregar los datos en la la tablahtml    
                                var t = $('#example').DataTable();
                                  var counter = 1;

                                 t.row.add([
                                     counter ,
                                     vrnombre ,
                                     vrpartno ,
                                     vrmaterno ,
                                     vrcolonia ,
                                     vrtelefono ,
                                     vrcorreo ,
                                     vrusuario,
                                     vrcontrasenia ,
                                     rol ,
                                     vrdomicilio

                                 ]).draw( false );

                                 counter++;
                               }
                                                              
                               $("#txtnombre").val('');
                               $("#txtapaterno").val('');
                               $("#txtamaterno").val('');
                               $("#txtdomicilio").val('');
                               $("#txtcolonia").val('');
                               $("#txttelefono").val('');
                               $("#txtcorreo").val('');
                               $("#txtusuario").val('');
                               $("#txtcontrasenia").val('');
                               $("#selecRol").val('');                       
                           }
                       });
                   }
                 
               });
               
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
                    var res = confirm("Desea eliminar el usuario");
                    if(res===true)
                    {
                        $.ajax({
                           async:false, 
                            url:'EliminarUsuario',
                            type:'post',
                            data: {
                                    usuario:datosTabla[0]
                            },
                            success: function(regreso){                               
                                var obj = jQuery.parseJSON( regreso );                            
                                if(obj.valor === "Ok")
                                {
                                    tablita.row('.selected').remove().draw( false );
                                }
                            }                          
                        });
                    }
                                        
                } );
               
               
                //pongo los datos en el modal para que se muestren
               $("#btnupdate").click(function(){
                   var datosTabla = tablita.row('.selected').data();
                   $("#txtid").val(datosTabla[0]);
                   $("#txtupdateNombre").val(datosTabla[1]);
                   $("#txtupdatePaterno").val(datosTabla[2]);
                   $("#txtupdateMaterno").val(datosTabla[3]);
                   $("#txtupdateColonia").val(datosTabla[4]);
                   $("#txtupdateTelefono").val(datosTabla[5]);
                   $("#txtupdateCorreo").val(datosTabla[6]);
                   $("#txtupdateUsuario").val(datosTabla[7]);
                   $("#txtupdateContrasenia").val(datosTabla[8]);                   
                   //$("#slupdatesol option:selected").text(datosTabla[9]);
                   var s = datosTabla[9];
                   if(datosTabla[9]==="Administrador")
                   {
                       $("#slupdatesol").val(1)
                   }
                   else
                   {
                       $("#slupdatesol").val(2)
                   }
                   $("#txtupdateDomicilio").val(datosTabla[10]);
                   //$("#slupdatesol").val(datosTabla[9]);
                   
                   
                   $('#modalUpdate').modal();
                   
               });
   
                //Actualizamos los datos en servidor
                $("#btnSetUpdate").click(function(){
                   var vrid = $("#txtid").val();
                   var vrnombre =$("#txtupdateNombre").val();
                   var vrpaterno=$("#txtupdatePaterno").val();
                   var vrmaterno =$("#txtupdateMaterno").val();
                   var vrcolonia = $("#txtupdateColonia").val();
                   var vrtelefono = $("#txtupdateTelefono").val();
                   var vrcorreo =  $("#txtupdateCorreo").val();
                   var vrusuario = $("#txtupdateUsuario").val();
                   var vrcontrasenia =$("#txtupdateContrasenia").val();
                   var vrdomicilio =$("#txtupdateDomicilio").val();
                   var vrol = $("#slupdatesol").val();
                    var rol = $("#slupdatesol option:selected").text();
                  
                   
                   $.ajax({
                        url:'ActualizacionUsuario',
                        type:'post',
                        data :{
                            id: vrid,
                            nombre: vrnombre,
                            paterno: vrpaterno,
                            materno: vrmaterno,
                            domicilio: vrdomicilio,
                            colonia: vrcolonia,
                            telefono: vrtelefono,
                            correo: vrcorreo,
                            usuario: vrusuario,
                            contrasenia:vrcontrasenia,
                            tipo: vrol
                            
                        },
                        datatype:'json',
                        success: function(datos)
                        {
                            var obj = jQuery.parseJSON(datos);                            
                               alert(obj.valor === "Ok");
                               //Eliminamos el registro selecciondo
                               tablita.row('.selected').remove().draw( false );
                               //Agregamos los dato en la tabla
                               var t = $('#example').DataTable();
                                  var counter = 1;

                                 t.row.add([
                                     counter ,
                                     vrnombre ,
                                     vrpaterno ,
                                     vrmaterno ,
                                     vrcolonia ,
                                     vrtelefono ,
                                     vrcorreo ,
                                     vrusuario,
                                     vrcontrasenia ,
                                     rol ,
                                     vrdomicilio       
                                 ]).draw( false );

                                 counter++;
                                 //Cerramos el modal
                                 $('#modalUpdate').modal('hide'); 
                               
                        }
                      
                   });
                   
                   
                   
               });
   
});
