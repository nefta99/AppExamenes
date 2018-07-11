<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
<?php session_start(); ?>    
<?php $usuario= $_SESSION['usuario'];?>
<head>
    <meta charset="UTF-8">
    <title>Examenes</title>
    <link href="../Front/css/Menus.css" rel="stylesheet" type="text/css"/> 
    <link href="../../Boostrap/css/Boostrapt.css" rel="stylesheet" type="text/css"/>
    <style>
        .tamanioDibujo{
            max-width: 50%;
            display:block;
            margin-left:auto;
            margin-right:auto;
            margin-top: auto;
            margin-bottom: auto;
        }
    </style>
</head>

<body>
    
    <input type="hidden" id="hdfusuario" value = "<?php echo $usuario; ?>">
    <nav>
        <ul id="crearmenu">            
            <li><a href="#" id="ACerrar">Cerrar</a></li>
        </ul>
    </nav>
<!--    aquí va la zona de trabajo-->
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="tamanioDibujo" >
                <img src="../Front/img/Examen.svg">
            </div>
        </div>
    </div>
    
</div>
        
    
</body>
<script src="../../Boostrap/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="../../Boostrap/js/bootstrap.min.js" type="text/javascript"></script>

<script src="../Front/js/Menu.js" type="text/javascript"></script>
</html>
