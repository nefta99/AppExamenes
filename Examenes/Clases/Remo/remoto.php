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
        $valores = array('TipoUsuario' =>$resul , 'url' => $urls );        
        //$valores = array('TipoUsuario' =>$resul );        
        
        echo json_encode($valores);
   
        break;
 /****************************************************************************************************************/
    case "guarMaterias":
        $materia = $_POST['mat'];
        $usuario = $_POST['usuario'];
        
        require_once'../Funciones/Funciones.php';
        $funciones = new Funciones();
        $resul = $funciones->guardarMaterias($materia,$usuario);    
        $valores = array('salida' =>$resul  );    
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
/******************************************************************************************************************/
    case "cargarMaterias":
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->cargaMaterias();
        echo json_encode($res);
        break;
/***********************************************************************************************************************/
    case "editarMateria":
        $id=$_POST['id'];
        $materia=$_POST['materia'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->editarmaterias($id,$materia);  
        echo json_encode($res);
        break;
/*********************************************************************************************************************************/
    case "eliminarMateria":
        $id=$_POST['id'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->eliminarMaterias($id);
         echo json_encode($res);
        break;
/************************************************************************************************************************************************/
    case "cargarMateriasCatalogo":
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->catalogomaterias();
        echo json_encode($res);
        break;
/*************************************************************************************************************************************************************/
    case "guardarcapitulos":
        $idmateria= $_POST['idmateria'];
        $capitulo= $_POST['capitulo'];
        $usuario= $_POST['usuario'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->guardacapitulos($idmateria,$capitulo,$usuario);
        echo json_encode($res);
        break;
/*********************************************************************************************************************************************************/
    case "cargarCapitulos":
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->cargarCapitulos();
        echo json_encode($res);
        break;
/********************************************************************************************************************************************************************/
    case "editarCapitulos":
        $idmateria= $_POST['idmateria'];
        $capitulo= $_POST['capitulo'];
        $idcapitulo= $_POST['idcapitulo'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->editarCapitulos($idmateria,$capitulo,$idcapitulo);
        echo json_encode($res);
        break;
/*************************************************************************************************************************************************************/
    case "borrarCapitulo":
         $idcapitulo= $_POST['idcapitulo'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->eliminacapitulo($idcapitulo);
        echo json_encode($res);
        break;
/****************************************************************************************************************************************************************************/
}



    
?>

