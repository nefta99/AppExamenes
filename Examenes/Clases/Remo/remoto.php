<?php
header('Content-Type: application/json');
$opcion  = $_POST['opt'];
$json;
 $urls;

switch ($opcion)
{
/************************************************************************************************************************************************************/    
    case "acceso":
        //funcion para reconocer al usuario
        try {
            $usuario =$_POST['usu'];
            $pass=$_POST['pass'];
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
            //$urls="http://".$_SERVER['HTTP_HOST'].$res."Login.php";          
            $urls="http://".$_SERVER['HTTP_HOST']."/AppExamenes/Login.php";          
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
/*******************************************************************************************************************************/
    case "cargarCapitulosCatalogoSinM":
        $materia= $_POST['materias'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->catalogocapitulosSinMateria($materia);
        echo json_encode($res);
        break;
    /****************************************************************************************************************************************************************************/
    case "cargarCapitulosCatalogo":
        $idmateria= $_POST['idmateria'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->catalogocapitulos($idmateria);
        echo json_encode($res);
        break;
/******************************************************************************************************************************************************************************************/
    case "catalogoComponentes":
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->catalogocomponentes();
        echo json_encode($res);
        break;
/****************************************************************************************************************************************************************************/
    case "preguntaGuardar":
        $idmateria= $_POST['idmateria'];
        $idcapitulo= $_POST['idcapitulo'];
        $pregunta= $_POST['pregunta'];
        $idcomponente= $_POST['idcomponente'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->guardarPregunta($idmateria,$idcapitulo,$pregunta,$idcomponente);
        echo json_encode($res);        
        break;
/****************************************************************************************************************************************************************************************/
    case "guardarvalores":
        $r1= $_POST['r1'];
        $r2= $_POST['r2'];
        $r3= $_POST['r3'];
        $r4= $_POST['r4'];
        $r5= $_POST['r5'];
        $v1= $_POST['v1'];
        $v2= $_POST['v2'];
        $v3= $_POST['v3'];
        $v4= $_POST['v4'];
        $v5= $_POST['v5'];
        $idpregunta = $_POST['idpregunta'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->guardavaloresrespuesta($r1,$r2,$r3,$r4,$r5,$v1,$v2,$v3,$v4,$v5,$idpregunta);        
        echo json_encode($res);        
        
        break;
    
    
/*************************************************************************************************************/
    case "cargaPreguntas":
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->buscarPreguntas();        
        echo json_encode($res); 
        break;
/******************************************************************************************************************************/
    case "editarPreguntas":
        $idpregunta = $_POST['idpregunta'];
        $idMateria = $_POST['idMateria'];
        $idCapitulo = $_POST['idCapitulo'];
        $pregunta = $_POST['pregunta'];
        $idComponente = $_POST['idComponente'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->editaPreguntas($idpregunta, $idMateria,$idCapitulo,$pregunta, $idComponente );        
        echo json_encode($res); 
        break;
/*********************************************************************************************************************/
    case "buscarRespuestas":
        $Idpregunta = $_POST['Idpregunta'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->buscarRespuestasValores($Idpregunta );        
        echo json_encode($res); 
        break;
/***************************************************************************************************************************/
    case "editarRespuestasValores":
        $r1 = $_POST['r1'];
        $r2 = $_POST['r2'];
        $r3 = $_POST['r3'];
        $r4 = $_POST['r4'];
        $r5 = $_POST['r5'];
        
        $v1 = $_POST['v1'];
        $v2 = $_POST['v2'];
        $v3 = $_POST['v3'];
        $v4 = $_POST['v4'];
        $v5 = $_POST['v5'];
        
        $id1 = $_POST['id1'];
        $id2 = $_POST['id2'];
        $id3 = $_POST['id3'];
        $id4 = $_POST['id4'];
        $id5 = $_POST['id5'];
        $idpreg = $_POST['idpregunta'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->editarRespuestasGuar($r1,$r2,$r3,$r4,$r5,$v1,$v2,$v3,$v4,$v5,$id1,$id2,$id3,$id4,$id5,$idpreg);
        echo json_encode($res); 
        break;
/************************************************************************************************************/
    case "VerTipoUsuario":
        $usuario = $_POST['usuario'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->valorartipoUsuario($usuario);
        echo json_encode($res); 
        break;
 /************************************************************************************************************************************/
     case "Nombreusuario":
        $usuario = $_POST['usuario'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->verNombreUsuario($usuario);
        echo json_encode($res); 
        break;
    /***********************************************************************************************************************************************/
     case "busquedaUsuario":
        $usuario = $_POST['usuario'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->busquededeUsuario($usuario);
        echo json_encode($res); 
        break;
    /**********************************************************************************************************************************************************/
     case "obtenerPreguntas":
        $idmateria = $_POST['materia'];
        $idcapitulo = $_POST['capitulo'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->buscarpregunta($idmateria,$idcapitulo);
        echo json_encode($res); 
        break;
    /***************************************************************************************************************************/
      case "obtenerRespuestas":
        $idmpregunta = $_POST['idpregunta'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->buscarRespuestas($idmpregunta);
        echo json_encode($res); 
        break;
    /**************************************************************************************************************************************/
    case "guardarHistorialPregunta":
        $idcapitulo = $_POST['idcapitulo'];
        $usuario = $_POST['usuario'];
        $idpregunta = $_POST['idpregunta'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->guardarHistorialPregunta($idcapitulo,$usuario,$idpregunta);
        echo json_encode($res); 
        break;
    /*****************************************************************************************************************************************/
    case "guardarHistorialRespuesta":
        $idhistorialPregunta = $_POST['idhistorialPregunta'];
        $idrespuesta = $_POST['idrespuesta'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->guardarHistorialRespuestass($idhistorialPregunta,$idrespuesta);
        echo json_encode($res); 
        break;
    /*****************************************************************************************************************************************/
    case "obtenerresultadosporPregunta":
        $usuario = $_POST['usuario'];
        $idpregunta = $_POST['idpregunta'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->obterresrespuestasss($usuario,$idpregunta);
        echo json_encode($res); 
        break;
    /*****************************************************************************************************************************************/
     
    case "valoresEjemplo":
        $usuario = $_POST['usuario'];
        $idcapitulo = $_POST['idcapitulo'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->eje($usuario,$idcapitulo);
        echo json_encode($res); 
        break;
    /*****************************************************************************************************************************************/
    case "concerSiYaEvaluo":
        $capitulo = $_POST['capitulo'];
        $usuario = $_POST['usuario'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->hayExamen($capitulo,$usuario);
        echo json_encode($res); 
        break;
    /*****************************************************************************************************************************************/
    case "ayexamenpintar":
        $idmateria = $_POST['materia'];
        $idcapitulo = $_POST['capitulo'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->conocerExamen($idmateria,$idcapitulo);
        echo json_encode($res); 
        break;
    
    /*****************************************************************************************************************************************/
    case "catTipoUsuariosL":
        
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->catalogoTiposUsuarios();
        echo json_encode($res); 
        break;
    
    /*****************************************************************************************************************************************/
    case "salvarDatosUsuario":
        $nombre = $_POST['nombre'];
        $paterno = $_POST['paterno'];
        $materno = $_POST['materno'];
        $tipousuario = $_POST['tipousuario'];
        $usuario = $_POST['usuario'];
        $pass = $_POST['pass'];
        
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->salvarUsuarios($nombre,$paterno,$materno,$tipousuario,$usuario,$pass);
        echo json_encode($res); 
        break;
    
    /*****************************************************************************************************************************************/
    case "tblUsuarios":      
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->tblUsuarios();
        echo json_encode($res); 
        break;
    
    /*****************************************************************************************************************************************/
    case "borrarUsuario":      
        $usuario = $_POST['usurio'];
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();
        $res = $funciones->usuarioborrar($usuario);
        echo json_encode($res); 
        break;
    
    /*****************************************************************************************************************************************/
    case "upusuario":      
        $usuario = $_POST['usuario'];
        $nombre = $_POST['nombre'];
        $paterno = $_POST['paterno'];
        $materno = $_POST['materno'];
        $tipousuario = $_POST['tipousuario'];
        $pass = $_POST['pass'];
        
        require_once '../Funciones/Funciones.php';  
        $funciones = new Funciones();        
        $res = $funciones->upusuario($usuario,$nombre,$paterno,$materno,$tipousuario,$pass);
        echo json_encode($res); 
        break;
    
    /*****************************************************************************************************************************************/
    
}



    
?>

