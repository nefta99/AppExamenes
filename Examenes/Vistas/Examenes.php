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
    <link href="../../datatable/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../Boostrap/css/Boostrapt.css" rel="stylesheet" type="text/css"/>
   
    
</head>

<body>
    
    <input type="hidden" id="hdfusuario" value = "<?php echo $usuario; ?>">
    <nav>
        <ul id="crearmenu">            
            <li><a href="#" id="ACerrar">Cerrar</a></li>
        </ul>
    </nav>
<!--    aquí va la zona de trabajo-->
 <!--    Termina zona de trabajo-->
</body>
<script src="../../Boostrap/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="../../Boostrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../../datatable/js/jquery.dataTables.min.js" type="text/javascript"></script>


<script src="../Front/js/Menu.js" type="text/javascript"></script>
<script src="../Front/js/Materias.js" type="text/javascript"></script>
</html>
