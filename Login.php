<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
    
        <title>Login</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="imagenes/manza.ico">
        <!-- estos son para las validaciones -->
        <link href="script/enginne/css/validationEngine.jquery.css" rel="stylesheet" type="text/css"/>
        <script src="script/enginne/js/jquery-1.8.2.min.js" type="text/javascript"></script>
        <script src="script/enginne/js/languages/jquery.validationEngine-es.js" type="text/javascript"></script>
        <script src="script/enginne/js/jquery.validationEngine.js" type="text/javascript"></script>
        
        <!--Esto es para boostrapt-->
        <link href="script/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="script/bootstrap/css/styles.css" rel="stylesheet" type="text/css"/>
        
        <script>
            $(document).ready(function () {
                //para mandar credenciales al servidor
                jQuery("#signupform").validationEngine();

                $("#btnOk").click(function (event) {

                    var userVar = $('#login-username').val();
                    var passVar = $('#login-password').val();
//
//                    var ecrUser = encodeURIComponent("=" + userVar);
//                    var ecrPass = encodeURIComponent("=" + passVar);
            //        url = "../cocinas/Pantallas/Default.php?usu="+userVar+"&pass="+passVar+"";
                    //url ="";
            
                    
//                    location.href = url;
                        
//                      redirect_by_post('../cocinas/Pantallas/Default.php', {
//                                        usu: userVar,
//                                        pass: passVar
//                      }, true);
//                    
                    $.ajax({
                        url:'../cocinas/Sessiones/ValidarSession.php',
                        type:'post',
                        data:{
                            usu: userVar,
                            pass: passVar
                        },
                        datatype:'json',
                        success:function(datos){
                            //lo que va hacer
                            console.log(datos)
                            document.location.href='../cocinas/Pantallas/Vistas/Default.php'
                        }
                    });

                });

                //para mandar a registrar al usuario registra al usuario                
                $("#btn-signup").click(function () {
                    //Validamos campos
                    if ($("#signupform").validationEngine('validate'))
                    {
                        //true                       
                        var nombreVar = $('#txtnombre').val();
                        var apaternoar = $('#txtapaterno').val();
                        var amateroVar = $('#txtAMaterno').val();
                        var domicilioVar = $('#txtDomiciolio').val();
                        var coloniaVar = $('#txtColonia').val();
                        var telefonoVar = $('#txttelefono').val();
                        var correoVar = $('#txtcorreo').val();
                        var usuarioVar = $('#txtUsuario').val();
                        var passVar = $('#txtpassword').val();

                        // Si en vez de por post lo queremos hacer por get, cambiamos el $.post por $.get
                        $.post('Registrar', {
                            nombre: nombreVar,
                            apaterno: apaternoar,
                            amaterno: amateroVar,
                            domicilio: domicilioVar,
                            colonia: coloniaVar,
                            telefono: telefonoVar,
                            correo: correoVar,
                            usuario: usuarioVar,
                            pass: passVar
                        }, function (responseText) {
                            alert(responseText);

                            $('#txtnombre').val('');
                            $('#txtapaterno').val('');
                            $('#txtAMaterno').val('');
                            $('#txtDomiciolio').val('');
                            $('#txtColonia').val('');
                            $('#txttelefono').val('');
                            $('#txtcorreo').val('');
                            $('#txtUsuario').val('');
                            $('#txtpassword').val('');
                        });
                    }
                    else
                    {
                        //false
                        alert('Datos no validados');
                    }
                });

            });
            
            
            function redirect_by_post(purl, pparameters, in_new_tab) {
                pparameters = (typeof pparameters == 'undefined') ? {} : pparameters;
                in_new_tab = (typeof in_new_tab == 'undefined') ? true : in_new_tab;

                var form = document.createElement("form");
                $(form).attr("id", "reg-form").attr("name", "reg-form").attr("action", purl).attr("method", "post").attr("enctype", "multipart/form-data");
                if (in_new_tab) {
                    $(form).attr("target", "_blank");
                }
                $.each(pparameters, function(key) {
                    $(form).append('<input type="text" name="' + key + '" value="' + this + '" />');
                });
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
                
               
                    
                return false;
                }           
        </script>
        
        
    </head>
    <body>
         <div class="container">    
            <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div class="panel panel-info" >
                    <div class="panel-heading">
                        <div class="panel-title">Sign In</div>
                        <div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#">Forgot password?</a></div>
                    </div>     

                    <div style="padding-top:30px" class="panel-body" >

                        <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>

                        <form id="loginform" class="form-horizontal" role="form">

                            <div style="margin-bottom: 25px" class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input id="login-username" type="text" class="form-control" name="user" value="" placeholder="usuario">                                        
                            </div>

                            <div style="margin-bottom: 25px" class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input id="login-password" type="password" class="form-control" name="pass" placeholder="password">
                            </div>



                            <div style="margin-top:10px" class="form-group">
                                <!-- Button -->

                                <div class="col-sm-12 controls">
                                    <a id="btnOk" href="#" class="btn btn-success">Login  </a>
                                    <!--     <a id="btn-fblogin" href="#" class="btn btn-primary">Login with Facebook</a>-->

                                </div>
                            </div>


                            <div class="form-group">
                                <div class="col-md-12 control">
                                    <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%" >
                                        No tienes cuenta? 
                                        <a href="#" onClick="$('#loginbox').hide();
                                                $('#signupbox').show()">
                                            Registrarte aqui
                                        </a>
                                    </div>
                                </div>
                            </div>    
                        </form>     



                    </div>                     
                </div>  
            </div>
            <div id="signupbox" style="display:none; margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <div class="panel-title">Registrarse</div>
                        <div style="float:right; font-size: 85%; position: relative; top:-10px"><a id="signinlink" href="#" onclick="$('#signupbox').hide();
                                $('#loginbox').show()">Sign In</a></div>
                    </div>  
                    <div class="panel-body" >
                        <form id="signupform" class="form-horizontal" role="form">

                            <div id="signupalert" style="display:none" class="alert alert-danger">
                                <p>Error:</p>
                                <span></span>
                            </div>



                            <div class="form-group">
                                <label for="txtnombre" class="col-md-3 control-label">Nombre</label>
                                <div class="col-md-9">
                                    <input type="text" id="txtnombre"    class="form-control validate[required] text-input" name="txtnombre" placeholder="Nombre">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="txtapaterno" class="col-md-3 control-label">Apellido Paterno</label>
                                <div class="col-md-9">
                                    <input type="text" id="txtapaterno" class="form-control " name="txtapaterno" placeholder="Apellido parterno">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtAMaterno" class="col-md-3 control-label">Apellido Materno</label>
                                <div class="col-md-9">
                                    <input type="text" id="txtAMaterno" class="form-control validate[required] text-input"  name="txtAMaterno" placeholder="Apellido materno">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtDomiciolio" class="col-md-3 control-label">Domicilio</label>
                                <div class="col-md-9">
                                    <input type="text" id="txtDomiciolio" class="form-control validate[required] text-input" name="txtDomiciolio" placeholder="Domicilio">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtColonia" class="col-md-3 control-label">Colonia</label>
                                <div class="col-md-9">
                                    <input type="text" id="txtColonia" class="form-control validate[required] text-input" name="txtColonia" placeholder="Colonia">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txttelefono" class="col-md-3 control-label">Telefono</label>
                                <div class="col-md-9">
                                    <input type="text" id="txttelefono" class="form-control validate[required] text-input" name="txttelefono" placeholder="Telefono">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtcorreo" class="col-md-3 control-label">Correo</label>
                                <div class="col-md-9">
                                    <input type="text" id="txtcorreo" class="form-control validate[required] text-input" name="txtcorreo" placeholder="Correo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtUsuario" class="col-md-3 control-label">Usuario</label>
                                <div class="col-md-9">
                                    <input type="text" id="txtUsuario" class="form-control validate[required] text-input" name="txtUsuario" placeholder="Usuario">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtpassword" class="col-md-3 control-label">Password</label>
                                <div class="col-md-9">
                                    <input type="password" class="form-control validate[required] text-input" id="txtpassword" name="txtpassword" placeholder="Password">
                                </div>
                            </div>


                            <div class="form-group">
                                <!-- Button -->                                        
                                <div class="col-md-offset-3 col-md-9">
                                    <button id="btn-signup" type="button" class="btn btn-info"><i class="icon-hand-right"></i> &nbsp Resgistrase</button>
                                <!--<span style="margin-left:8px;">or</span>  -->
                                </div>
                            </div>
                        </form>
                        <div style="border-top: 1px solid #999; padding-top:20px"  class="form-group">

                            <!-- <div class="col-md-offset-3 col-md-9">
                                 <button id="btn-fbsignup" type="button" class="btn btn-primary"><i class="icon-facebook"></i>   Sign Up with Facebook</button>
                             </div>   -->                                        

                        </div>




                    </div>
                </div>




    </body>
</html>
