<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Login </title>
        <link href="../../Boostrap/css/Boostrapt.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div>
            <form action="../Clases/Remo/remoto.php" method="post"  >
                <div class="container">
                    <div class="row">
                    <div class="col-md-1">
                        <label>Usuario</label>
                    </div>
                    <div class="col-md-1">
                        <input type="text" name="txtusuario" id="txtUsuario"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <label>Contrasena</label>
                    </div>
                    <div class="col-md-1">
                        <input type="password" name="txtpassword" id="txtpassword"/>
                    </div>
                </div>
                <div class="row">
                    
                    <div class="col-md-1">
                        <input type="submit" name="btnsubmit" value="Login" class="btn btn-success">
                    </div>
                    
                </div>
                </div>             
                
                
                
                <input type="hidden" name="opt" value="Login">
                
                
            </form>
            
        </div>        
    </body>
    <script src="../../Boostrap/js/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="../../Boostrap/js/bootstrap.min.js" type="text/javascript"></script>
    
</html>
