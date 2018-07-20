/*******************************************************************************************************************************************************/
$(document).ready(function(){
    catalogotiposusuarios();
    catalogotiposusuariosupd();
});
/**********************************************************************************************************************************************************/
function catalogotiposusuariosupd(){
    var paramentros = {
        "opt": "catTipoUsuariosL"
        };
    $.ajax({
        url:'../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {
            var html='';
            for(var i =0;i<data.length;i++){
                if(i==0){
                    html+='<option value="X">Seleccione</option>';
                    html+='<option value="'+data[i].IdTipoUsuario+'">'+data[i].TipoUsuario+'</option>';
                }
                else
                {
                    html+='<option value="'+data[i].IdTipoUsuario+'">'+data[i].TipoUsuario+'</option>';
                }
            }
            $("#ddlTipoUsuarioup").append(html);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/**********************************************************************************************************************************************************/
function catalogotiposusuarios(){
    var paramentros = {
        "opt": "catTipoUsuariosL"
        };
    $.ajax({
        url:'../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {
            var html='';
            for(var i =0;i<data.length;i++){
                if(i==0){
                    html+='<option value="X">Seleccione</option>';
                    html+='<option value="'+data[i].IdTipoUsuario+'">'+data[i].TipoUsuario+'</option>';
                }
                else
                {
                    html+='<option value="'+data[i].IdTipoUsuario+'">'+data[i].TipoUsuario+'</option>';
                }
            }
            $("#ddlTipoUsuario").append(html);
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/********************************************************************************************************************************************/
function guardarContenido(){
    $("#divGuardarUsuarios").css({"display":"block"});
    $("#diveditarUsuario").css({"display":"none"});
    $("#divmensaje").css({"display":"none"});
    $("#divtabla").css({"display":"none"});
}
/********************************************************************************************************************************************/
function mostrarTabla(){
    cerrarAlerta();
    $("#divGuardarUsuarios").css({"display":"none"});    
    $("#divmensaje").css({"display":"block"});
    $("#divtabla").css({"display":"block"});
    llenarTablaUsuarios();
    
    
}
/*********************************************************************************************************************************************/
function llenarTablaUsuarios(){
    var tablita;
    var paramentros = {
        "opt": "tblUsuarios"
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (ds) {
            tablita = $("#example").DataTable({
                     data:ds,
                     language:{url:'../Front/js/Spanish.json'},     
                     "bDestroy": true,
                     columns:[
                         {title:"Usuario"},
                         {title:"Nombre"},
                         {title:"ApellidoPaterno"},
                         {title:"ApellidoMaterno"},                         
                         {title:"TipoUsuario"},
                         {title:"Contrasenia"},
                         {
                             sortable: false,
                                "width": "20%",
                                "render": function(datas, type, full, meta) {
                                    var buttonID = "rollover_" + full.id;
                                    var editID="edit_"+full.id;                                    
                                    return "<a id=" + buttonID + " class='btn btn-primary rolloverBtn' role='button'    onclick='eliminar(\"" + ds[meta.row][0] + "\","+meta.row+");' ><img src='../Front/img/eliminar.svg' width='30px' height='30px'   /></a>&nbsp; <a id=" + editID + " class='btn btn-primary rolloverBtn' role='button'    onclick='cargarEditada(\"" + ds[meta.row][0] + "\",\""+ds[meta.row][1]+"\",\""+ds[meta.row][2]+"\",\""+ds[meta.row][3]+"\",\""+ds[meta.row][4]+"\",\""+ds[meta.row][5]+"\");' ><img src='../Front/img/editar.svg' width='30px' height='30px'   /></a>";
                                }
                         }
                     ]
                 });
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
}
/*************************************************************************************************************************************************************/
function eliminar(usuario,numero){
    var con = confirm("¿En realidad quiere eliminar el registro?");
    
    if (con==true){
       var res = mandarPeticionEliminar(usuario);
       if(res.Succes){
           llenarTablaUsuarios();
           alertaExito(res.msg);           
       }
       else
       {
           alertaError(res.msg);
       }
    }
    
}
/*********************************************************************************************************************************************/
function mandarPeticionEliminar(usuario){
    var res;
    var paramentros = {
        "opt": "borrarUsuario",
        "usurio":usuario
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {  
            if(data.Resultado=="Eliminado"){
                res={"Succes":true,"msg":"El usuario fue eliminado de forma exítosa"};
            }
            else
            {
                res={"Succes":false,"msg":"No se pudo eliminar al usuario"};
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return res;
}
/*********************************************************************************************************************************************/
function alertaError(texto)
{
    var htn ='<div class="alert alert-danger" role="alert"  >';    
        htn += '<strong>Error! </strong>'+texto+' </a>.';
        htn += ' </div>';
        
    $("#alertas").html(htn);
}
function alertaExito(texto)
{
    var htn ='<div class="alert alert-success" role="alert"  >';    
        htn += '<strong>Exito! </strong>'+texto+' </a>.';
        htn += ' </div>';
        
    $("#alertas").html(htn);
    
    
}
/******************************************************************************************************/
function cerrarAlerta()
{
    $(".alert").alert('close');
}
/**********************************************************************************************************/
function cancelarupd(){
    $("#divmensaje").css({"display":"none"});
    $("#diveditarUsuario").css({"display":"none"});
    
}
/**********************************************************************************************************/
function cancelarGuardada(){
    $("#divGuardarUsuarios").css({"display":"none"});
    $("#txtNombre").val('');
    $("#txtPaterno").val('');
    $("#txtMaterno").val('');
    $("#txtUsuario").val('');
    $("#txtpassword").val('');
    $("#ddlTipoUsuario").val('X');
    
}
/*************************************************************************************************************************/
function agregarUsuario(){
    $("#divmensaje").css({"display":"none"});
    $("#divtabla").css({"display":"none"});
    var lista;
    var nombre = $("#txtNombre").val();
    var Paterno = $("#txtPaterno").val();
    var materno = $("#txtMaterno").val();
    var tipousuario = $("#ddlTipoUsuario").val();
    var nuevousuario = $("#txtUsuario").val();
    var pass = $("#txtpassword").val();
    if(nombre != null  && nombre != ""){
        if(Paterno!=null && Paterno!=""){
            if(materno!=null && materno!=""){
                if(tipousuario!=null && tipousuario!=""){
                    if(nuevousuario!=null && nuevousuario!=""){
                        if(pass!=null && pass!=""){
                          lista = salvarDatos(nombre,Paterno,materno,tipousuario,nuevousuario,pass);
                          if(lista.succes==true){
                              limpiarcomponentesGuardar();
                              alertaExito(lista.msg);
                          }
                          else
                          {
                              alertaError(lista.msg);
                          }                            
                        }
                        else
                        {
                            alertaError("Favor de agregar la contraseña");
                        }
                    }
                    else
                    {
                        alertaError("Favor de agregar el usuario");
                    }
                }
                else
                {
                    alertaError("Favor de agregar un tipo de usuario");
                }
            }
            else{
                alertaError("Favor de agregar un apellido materno");
            }
        }
        else
        {
            alertaError("Favor de agregar un apellido paterno");
        }
    }
    else
    {
        alertaError("Favor de agregar un nombre");
    }
    
    
    
}
/*****************************************************************************************************************************************/
function limpiarcomponentesGuardar()
{
        $("#txtNombre").val('');
    $("#txtPaterno").val('');
    $("#txtMaterno").val('');
    $("#txtUsuario").val('');
    $("#txtpassword").val('');
    $("#ddlTipoUsuario").val('X');
}
/*************************************************************************************************************************/
function salvarDatos(nombre,paterno,materno,tipousuario,usuario,pass){
    var ls;
    var paramentros = {
        "opt": "salvarDatosUsuario",
        "nombre":nombre,
        "paterno":paterno,
        "materno":materno,
        "tipousuario":tipousuario,
        "usuario":usuario,
        "pass":pass
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {    
            if(data.Resultado="Guardado"){
                ls={"succes":true,"msg":"Valor guardado con exíto"};
            }
            else
            {
                ls={"succes":false,"msg":data.Resultado};
            }
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
        }
    });
    return ls;
}
/*************************************************************************************************************************/
function cargarEditada(usuario,nombre,apaterno,amaterno,tipousuario,contra){
    $("#diveditarUsuario").css({"display":"block"});
    $("#divmensaje").css({"display":"block"});
    $("#txtNombreup").val(nombre);
    $("#txtPaternoup").val(apaterno);
    $("#txtMaternoup").val(amaterno);
    $("#ddlTipoUsuarioup").val(tipousuario);
    $("#txtpasswordup").val(contra);
    $("#txtUsuarioup").val(usuario);
    $("#ddlTipoUsuarioup").find('option:contains("'+tipousuario+'")').prop('selected', true);
    
    
}
/*************************************************************************************************************************/
function editarUsuario(){
    editarUsuarioGrad();
}
/*************************************************************************************************************************/
function editarUsuarioGrad(){
    
   var nombre= $("#txtNombreup").val();
   var paterno =$("#txtPaternoup").val();
   var materno=$("#txtMaternoup").val();
   var tipoUsuario = $("#ddlTipoUsuarioup").val();
   var pass= $("#txtpasswordup").val();
   var usuario=$("#txtUsuarioup").val();
   if(nombre!=null && nombre!=""){
       if(paterno!=null && paterno!=""){
           if(materno!=null && materno!=""){
               if(tipoUsuario!=null && materno!="X"){
                   if(usuario!=null && usuario!=""){
                       if(pass!=null && pass!=""){
                            var res = updateRegistro(usuario,nombre,paterno,materno,tipoUsuario,pass);   
                            if (res.succes){
                                $("#divmensaje").css({"display":"none"});
                                $("#diveditarUsuario").css({"display":"none"});
                                
                                 alertaExito(res.msg);
                            }
                            else
                            {
                                 alertaError(res.msg);
                            }
                       }
                       else
                       {
                           alertaError("Favor de agregar una contraseña");
                       }
                   }
                   else
                   {
                       alertaError("Favor de agregar un usuario");
                   }
               }
               else
               {
                   alertaError("Favor de seleccionar un tipo de usuario");
               }
           }
           else
           {
               alertaError("Favor de agregar un apellido materno");
           }
       }
       else
       {
           alertaError("Favor de agregar un apellido paterno");
       }
   }
   else
   {
        alertaError("Favor de agregar un usuario");
   }
  
    
}
/*************************************************************************************************************************/
function updateRegistro(usuario,nombre,paterno,materno,tipousuario,pass){
    var res;
    
    var paramentros = {
        "opt": "upusuario",
        "usuario":usuario,
        "nombre":nombre,
        "paterno":paterno,
        "materno":materno,
        "tipousuario":tipousuario,
        "pass":pass
        };
    $.ajax({
        url: '../Clases/Remo/remoto.php',
        type: 'POST',
        cache: false,
	async: false,
        data: paramentros,
        dataType: "json",
        success: function (data) {        		
            if(data.Resultado=="Ok")
            {
                res ={"succes":true,"msg":"Se modifico la información"};
            }
            else
            {
                res ={"succes":false,"msg":data.Resultado};
            }
            
            
        },
        error: errorHandler = function (xhr, errorType, exception) {
            console.log(exception + xhr.statusText);
            
            res ={"succes":false,"msg":exception + xhr.statusText};
        }
    });
    return res;
}
/*************************************************************************************************************************/