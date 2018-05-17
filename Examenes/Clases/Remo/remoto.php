<?php
header('Content-Type: application/json');
$opcion  = $_POST['opt'];
$json;
 $urls;

switch ($opcion)
{
/***********************************************************************************************************************************************************/
    case "Login":
        //funcion para reconocer al usuario
        try {
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
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        }
        
        
        break;
 /*******************************************************************************************************************************************************/       
    case "CrearMenu":
        header('Content-Type: application/json');
        //Funcion para crear menu solo reconoce el tipo de usuario
        $usuario = $_POST['user'];
        require_once'../Funciones/Funciones.php';
        $funciones = new Funciones();
        $resul = $funciones->tipoUsuario($usuario);
        $res = $funciones->tomarSubdominio();
        $urls="http://".$_SERVER['HTTP_HOST'].$res."Vistas/";        
        //$valores = array('TipoUsuario' =>$resul , 'url' => $urls );        
        $valores = array('TipoUsuario' =>$resul );        
        
        echo json_encode($valores);
   
        break;
    
 /************************************************************************************************************************************************************/   
    case "Inicio":
            require_once '../Funciones/Funciones.php';  
            $funciones = new Funciones();
            $res = $funciones->InformacionGeneral();   
           
            echo $res;
        break;
    
/***********************************************************************************************************************************************/
    case "cerrarSession":
            //Funcion para cerrar sessioness
            require_once'../Funciones/Funciones.php';
            $funciones = new Funciones();
            $res = $funciones->tomarSubdominio();   
            $urls="http://".$_SERVER['HTTP_HOST'].$res."Vistas/Login.php";          
            $valores = array('ur' =>$urls);
            session_start();
            unset($_SESSION["usuario"]);             
            session_destroy();
            echo json_encode($valores);
        break;
/*********************************************************************************************/
    case "LlenarGridAgregar":
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res =$funciones->llenargridAgregar();
        echo $res; 
        break;
}
/***********************************************************************************************************************/
?>

