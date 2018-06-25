<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Funciones
 *
 * @author nef
 */



class Funciones {
/********************************************************************************************************************/
     private $json;

     
/********************************************************************************************************************/       
       
       public function tomarSubdominio(){           
         require_once '../Ambientes.php';
         $ambiente = new Ambientes();             
         if ($ambiente->getAmbiente()=="DEVL")
         {
             $jsons= "/AppExamenes/Examenes/";
         }
         if ($ambiente->getAmbiente()=="PROD")
         {
            $jsons= "/Examenes/";
         } 
         $this->json= $jsons;                  
         return $this->json;
       }
       
/**********************************************************************************************************************/       
    public function InformacionGeneral(){
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();
        $sql='CALL sp_informacion;';        
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit();/* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=0;
            $sjons="[";
            while($obj = $resultado->fetch_object()){            
                 $pantallas[]= array('Id'=>$obj->Id,'Titulo'=>$obj->Titulo,'Link'=>$obj->Link);
                  $i++;                   
            }                                         
            $resultado->close();
        }   
        $mysqli->close();
        $sjons = json_encode($pantallas);
        return $sjons;
    }
/***********************************************************************************************************************************/               
       
       public function Tomarpaginas(){
           require_once '../Conexiones.php';           
           /*Creamos la instancia del objeto. Ya estamos conectados*/
           $bd=  Conexiones::getInstance();
           
           $sql='CALL sp_tomarpagina(\''.$usuario.'\');';
           /*Ejecutamos la query*/
           $stmt = $bd->ejecutar($sql);
           $this-> rawdata = array(); //creamos un array
           $i=0;
           /*Realizamos un bucle para ir obteniendo los resultados*/
           while ($x=$bd->obtener_fila($stmt,0)){
               $this-> permiso = $x[0];
                    $i++;
           }
           return $this->json;
       }
/***********************************************************************************************************************************/       
       
    public function AgregarPaginas($titulo,$body,$leyendaHtml,$Leyendacss,$CssMostrar,$ubicacion,$link){
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_AgregarPaginas(\'$titulo\',\'$body\',\'$leyendaHtml\',\'$Leyendacss',\'$CssMostrar\',\'$ubicacion\',\'$link\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit();    /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=0;
            $sjons="[";
            while($obj = $resultado->fetch_object()){                  
                 $pantallas[]= array('Mensaje'=>$obj->Mensaje);
                  $i++;                    
            }                                         
            $resultado->close();
        }   
        $mysqli->close();
        $sjons = json_encode($pantallas);
        return $sjons;
    }
/************************************************************************************************************************************************************/
    public function llenargridAgregar(){
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_llenarGridAgregar();";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit();  /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;
            $sjons="[";
            while($obj = $resultado->fetch_object()){                  
                 //$pantallas[]= array('Mensaje'=>$obj->Mensaje);                
                 if($i==$obj->Contador){
                     $sjons.="[\"".$obj->Id."\", \"".$obj->Body."\",\"".$obj->LleyendaHtml."\",\"".$obj->Leyendacss."\",\"".$obj->CssMostrar."\",\"".$obj->Ubicacion."\",\"".$obj->Link."\",\"".$obj->Titulo."\"]";
                 }
                 else{
                     $sjons.="[\"".$obj->Id."\",\"".$obj->Body."\",\"".$obj->LleyendaHtml."\",\"".$obj->Leyendacss."\",\"".$obj->CssMostrar."\",\"".$obj->Ubicacion."\",\"".$obj->Link."\",\"".$obj->Titulo."\"],";
                 }                 
                  $i++;                    
            }
            $sjons .="]"; 
            $resultado->close();
        }   
        $mysqli->close();

        return $sjons;
    }
/*********************************************************************************************************************************************************************************************************************************/               
    function validarUsuario($usuario,$pass){
        $sjons="";
        try {
            require_once '../ConServidor.php';
            $base = new ConServidor();        
            $datos = array();        
            $sql = "CALL sp_ValidaUsario(\'$usuario\',\'$pass\');";
            $sql = str_replace("\'","'",$sql);
            $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
            /* comprobar la conexión */
            if ($mysqli->connect_errno) {
                printf("Falló la conexión: %s\n", $mysqli->connect_error);
                exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
            }
            if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
                $i=1;            
                $sjons="";
                while($obj = $resultado->fetch_object()){                   
                    $sjons.="".$obj->Resultado."";                              
                    $i++;                    
                }
                $sjons .="";            
                $resultado->close();
            }   
            $mysqli->close();        
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        }
        
        return $sjons;
    }
/*******************************************************************************************************************************************************************************************************************************************/
    function tipoUsuario($usuario){
         $sjons="";
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_tipoUsuario(\'$usuario\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit();                        /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;            
            while($obj = $resultado->fetch_object()){                                                  
                     $sjons.= $obj->TipoUsuario;                 
                  $i++;                    
            } 
            $resultado->close();
        }   
        $mysqli->close();  
        return $sjons;    
    }
/******************************************************************************************************************************************************/
    function guardarMaterias($materia,$usuario){
        $sjons="";
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_GuardarMaterias(\'$materia\',\'$usuario\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;            
            while($obj = $resultado->fetch_object()){                  
                 //$pantallas[]= array('Mensaje'=>$obj->Mensaje);                
                     $sjons.= $obj->Salida;                
                  $i++;                    
            }                     
            $resultado->close();
        }   
        $mysqli->close();  
        return $sjons;    
    }
/**************************************************************************************************************************************************************/
    function cargaMaterias()
    {
         $sjons="";
         $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_mostrarMaterias();";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                 //$pantallas[]= array('IdMateria'=>$obj->IdMateria, 'Nombre'=>$obj->Nombre,'FechaCreacion'=>$obj->FechaCreacion,'CreadoPor'=>$obj->CreadoPor);
                 $pantallas[]= array($obj->IdMateria,$obj->Nombre,$obj->FechaCreacion,$obj->CreadoPor);                   
                  $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
/************************************************************************************************************************************************************************************************/
    function editarmaterias($id,$materia){
        $sjons="";
         $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_editarMateria($id,\'$materia');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                 //$pantallas[]= array('IdMateria'=>$obj->IdMateria, 'Nombre'=>$obj->Nombre,'FechaCreacion'=>$obj->FechaCreacion,'CreadoPor'=>$obj->CreadoPor);
                 $sjons= array('Resultado'=>$obj->Resultado);                   
                  $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $sjons;
    }
 /******************************************************************************************************************************************************************/
    function eliminarMaterias($id){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_eliminarMaterias($id);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                 //$pantallas[]= array('IdMateria'=>$obj->IdMateria, 'Nombre'=>$obj->Nombre,'FechaCreacion'=>$obj->FechaCreacion,'CreadoPor'=>$obj->CreadoPor);
                 $sjons= array('Resultado'=>$obj->Resultado);                   
                  $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $sjons;
    }
/******************************************************************************************************************************************************************************/
    function catalogomaterias()    {
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_mostrarMaterias();";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('IdMateria'=>$obj->IdMateria, 'Materia'=>$obj->Nombre);
                //$pantallas[]= array($obj->IdMateria,$obj->Nombre,$obj->FechaCreacion,$obj->CreadoPor);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
/****************************************************************************************************************************************************************************************/
    function guardacapitulos($idmateria,$capitulo,$usuario){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_guardarCapitulos(\'$idmateria\',\'$capitulo\',\'$usuario\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('Resultado'=>$obj->Salida);
                //$pantallas[]= array($obj->IdMateria,$obj->Nombre,$obj->FechaCreacion,$obj->CreadoPor);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
/*******************************************************************************************************************************************/
    function cargarCapitulos()    {
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_cargarCapitulos();";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                //$pantallas[]= array('Resultado'=>$obj->Salida);
                $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
/***************************************************************************************************************************************/
    function editarCapitulos($idmateria,$capitulo,$idcapitulo)
    {
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_editarCapitulo(\'$idmateria\',\'$idcapitulo\',\'$capitulo\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('Resultado'=>$obj->Resultado);
               // $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;   
    }
 /*****************************************************************************************************************************************************/
    function eliminacapitulo($idcapitulo){
           $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_borrarCapitulo($idcapitulo);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('Resultado'=>$obj->Resultado);
               // $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
    }
/**********************************************************************************************************************************************************************************/
function catalogocapitulosSinMateria($materia){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_catalogoCapituloSinM(\'$materia\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('IdCapitulo'=>$obj->IdCapitulo,'Capitulo'=>$obj->Capitulo);
               // $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
}
/**********************************************************************************************************************************************************************/
    function catalogocapitulos($idmateria){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_catalogoCapitulo($idmateria);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('IdCapitulo'=>$obj->IdCapitulo,'Capitulo'=>$obj->Capitulo);
               // $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
    }
    /*********************************************************************************************************************************************************/
    function catalogocomponentes(){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_catalogoComponentes();";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('IdComponente'=>$obj->IdComponente,'TipoComponente'=>$obj->TipoComponente);
               // $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
    }
    /*****************************************************************************************************************************************************************************/
    function guardarPregunta($idmateria,$idcapitulo,$pregunta,$idcomponente){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_guardarPregunta($idmateria,$idcapitulo,\'$pregunta\',$idcomponente);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('Resultado'=>$obj->Resultado,'IdPregunta'=>$obj->IdPregunta);
               // $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
    }
/********************************************************************************************************/
    function guardavaloresrespuesta($r1,$r2,$r3,$r4,$r5,$v1,$v2,$v3,$v4,$v5,$idpregunta){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_guardarvaloresRespuesta(\'$r1\',\'$r2\',\'$r3\',\'$r4\',\'$r5\',$v1,$v2,$v3,$v4,$v5,$idpregunta);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('Respuesta'=>$obj->Respuesta);
               // $pantallas[]= array($obj->IdCapitulo,$obj->Capitulo,$obj->Materia,$obj->CreadoPor,$obj->FechaCreacion);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
    }
 /***************************************************************************************************************************************************/
    function buscarPreguntas()
    {
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_cargarPreguntas();";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                //$pantallas[]= array('IdPregunta'=>$obj->Respuesta);
               $pantallas[]= array($obj->IdPregunta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
    }
 /************************************************************************************************************************************************************/   
    function editaPreguntas($idpregunta, $idMateria,$idCapitulo,$pregunta, $idComponente ){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_editarPreguntas($idpregunta,$idMateria,$idCapitulo,\'$pregunta\',$idComponente);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('Respuesta'=>$obj->Salida);
               //$pantallas[]= array($obj->IdPregunta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas; 
    }
    /**********************************************************************************************************************************************************************/
    function buscarRespuestasValores($Idpregunta){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_buscarRespuestaValores($Idpregunta);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('IdRespuesta'=>$obj->IdRespuesta,'Respuesta'=>$obj->Respuesta,'Valor'=>$obj->Valor);
               //$pantallas[]= array($obj->IdRespuesta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
    /***************************************************************************************/
    function editarRespuestasGuar($r1,$r2,$r3,$r4,$r5,$v1,$v2,$v3,$v4,$v5,$id1,$id2,$id3,$id4,$id5,$idpreg){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_editarRespuestag(\'$r1\',\'$r2\',\'$r3\',\'$r4\',\'$r5\',$v1,$v2,$v3,$v4,$v5,$id1,$id2,$id3,$id4,$id5,$idpreg);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                  
                $pantallas[]= array('Respuesta'=>$obj->Respuesta);
               //$pantallas[]= array($obj->IdRespuesta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
    /***********************************************************************************************************/
    function valorartipoUsuario($usuario){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_tipoUsuario (\'$usuario\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){    
                //$sjons= array('Resultado'=>$obj->Resultado);        
                $pantallas= array('TipoUsuario'=>$obj->TipoUsuario);
               //$pantallas[]= array($obj->IdRespuesta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
    
    /****************************************************************************************************************************************/
    function verNombreUsuario($usuario){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_verNombre (\'$usuario\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){    
                
                //$pantallas= array('TipoUsuario'=>$obj->TipoUsuario);
                $pantallas[]= array('Nombre'=>$obj->Nombre,'ApellidoPaterno'=>$obj->ApellidoPaterno,'ApellidoMaterno'=>$obj->ApellidoMaterno);
               //$pantallas[]= array($obj->IdRespuesta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
    /****************************************************************************************************************************************************/
    function busquededeUsuario($usuario){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_busquedaUsuario (\'$usuario\');";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){    
                
                //$pantallas= array('TipoUsuario'=>$obj->TipoUsuario);
                $pantallas[]= array('Nombre'=>$obj->Nombre,'ApellidoPaterno'=>$obj->ApellidoPaterno,'ApellidoMaterno'=>$obj->ApellidoMaterno,'Resultado'=>$obj->Resultado);
               //$pantallas[]= array($obj->IdRespuesta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
    /****************************************************************************************************************************************************************/
    function buscarpregunta($idmateria,$idcapitulo){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_buscarPregunta ($idmateria,$idcapitulo);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                    
                //$pantallas= array('TipoUsuario'=>$obj->TipoUsuario);
                $pantallas[]= array('IdPregunta'=>$obj->IdPregunta,'Pregunta'=>$obj->Pregunta,'TipoComponente'=>$obj->TipoComponente);
               //$pantallas[]= array($obj->IdRespuesta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
    /****************************************************************************************************************************************************************************/
    function buscarRespuestas($idmpregunta){
        $sjons="";
        $pantalla;
        require_once '../ConServidor.php';
        $base = new ConServidor();        
        $datos = array();        
        $sql = "CALL sp_buscarRespuestas ($idmpregunta);";
        $sql = str_replace("\'","'",$sql);
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit(); /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=1;           
            while($obj = $resultado->fetch_object()){                    
                //$pantallas= array('TipoUsuario'=>$obj->TipoUsuario);
                $pantallas[]= array('IdRespuesta'=>$obj->IdRespuesta,'Respuesta'=>$obj->Respuesta);
               //$pantallas[]= array($obj->IdRespuesta,$obj->Pregunta,$obj->TipoComponente,$obj->Capitulo,$obj->Materia);                   
                $i++;                    
            }             
            $resultado->close();
        }   
        $mysqli->close();  
        return $pantallas;
    }
    /**************************************************************************************************************************************************************************************/
}
