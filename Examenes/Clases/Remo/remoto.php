<?php
header('Content-Type: application/json');
$opcion  = $_POST['opt'];
$json;
 $urls;

switch ($opcion)
{
    case "Login":
        $usuario =$_POST['txtusuario'];
        $pass=$_POST['txtpassword'];
        require_once'../Funciones/Funciones.php';
        $funciones = new Funciones();
        $resul = $funciones->validarUsuario($usuario,$pass);
        //Validamos los datos del usurio
        if ($resul =="Valido"){            
            session_start();
            if (!isset($_SESSION['usuario'])) 
            {
                $_SESSION['usuario'] = $usuario;
            }             
            $res = $funciones->tomarSubdominio();   
            $urls="http://".$_SERVER['HTTP_HOST'].$res."Vistas/Default.php";          
            $urls = "Location: ".$urls;
            
        }
        else 
        {
            $res = $funciones->tomarSubdominio();   
            $urls="http://".$_SERVER['HTTP_HOST'].$res."Vistas/ErrorLogin.php";          
            $urls = "Location: ".$urls;
        }
        
        
        
        
        
        header($urls);
        break;
    
    case "Inicio":
            require_once '../Funciones/Funciones.php';  
            $funciones = new Funciones();
            $res = $funciones->InformacionGeneral();   
           
            echo $res;
        break;
    case "TomaInfoInicial":
         $json= "[";
//         $json .='{"Fruta": "Manzana" },';
//         $json .='{"Fruta": "Platano" },';
         $json .='{"Fruta": "Mango" }';
         $json.="]";
    
    echo  $json;
    
        break;
    case "AgregarPaginas":
        $titulo = $_POST["titulo"];
        $body= $_POST["body"];
        $leyendaHtml= $_POST["leyendaHtml"];
        $Leyendacss= $_POST["Leyendacss"];
        $CssMostrar= $_POST["CssMostrar"];
        $ubicacion=$_POST["ubicacion"];
        $link=$_POST["Link"];
        if($titulo=="")
        {
            $titulo="No hay";
        }
        if($body==""){
            $body="No hay";
        }
        if($leyendaHtml==""){
            $leyendaHtml="No hay";
        }
        if($CssMostrar=="")        
        {
            $CssMostrar="No hay";
        }
        if($Leyendacss=="")    {
            $Leyendacss="No hay";
        }    
        if($ubicacion==""){
           $ubicacion="No hay";
        }
        if($link==""){
            $link=="No hay";
        }
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->AgregarPaginas($titulo,$body,$leyendaHtml,$Leyendacss,$CssMostrar,$ubicacion,$link);
        echo $res;           
        
        
        
        break;
    case "LlenarGridAgregar":
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res =$funciones->llenargridAgregar();
        echo $res; 
        break;
}
/*
if($opcion="Ejemplo")
{
    $json= "[";
    $json .='{"Fruta": "Manzana" },';
    $json .='{"Fruta": "Platano" },';
    $json .='{"Fruta": "Mango" }';
    $json.="]";
    //$ar = json_decode($json);
    echo  $json;
    
    //En javascrip se manda llamar así:
    //console.log(datos[0].Fruta);
    
}*/
?>

