<html>
    <head>
        <meta charset="UTF-8">
        <!--<link rel="shortcut icon" href="../imagenes/manza.ico">-->
<!--        <link href="cssinicio/inicio.css" rel="stylesheet" type="text/css"/>
        <script src="cssinicio/jquery/jquery-3.2.1.min.js" type="text/javascript"></script>
       -->
       
       
               <!--Esto es para boostrapt-->
        

        <?php
            require_once './Clases/Maestra.php';
            $base = new Maestra(); 
            echo $base->link();
        ?>
        <script src="cssinicio/inicio.js" type="text/javascript"></script>
        <title>Default</title>
    </head> 
    <body>       
        <div class="contenedor" id="contenedor" >
                   
            
        </div>
    </body>
</html>