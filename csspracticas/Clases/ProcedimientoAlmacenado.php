<?php



/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProcedimientoAlmacenado
 *
 * @author nef
 */
class ProcedimientoAlmacenado {
    //put your code here
    var $permiso;
    var $rawdata;
    function validaPermiso($usuario,$pantalla)
    {
        require_once 'Conexiones.php';
        /*Creamos la instancia del objeto. Ya estamos conectados*/
        $bd=  Conexiones::getInstance();
        //$pantalla ='usuarios.php';
        $sql='CALL sp_verificar_permisos(\''.$usuario.'\',\''.$pantalla.'\');';
        /*Ejecutamos la query*/
        $stmt = $bd->ejecutar($sql);
        $this-> rawdata = array(); //creamos un array
        $i=0;
        /*Realizamos un bucle para ir obteniendo los resultados*/
        while ($x=$bd->obtener_fila($stmt,0)){
            $this-> permiso = $x[0];
             //$rawdata[$i] = $permiso;
                $i++;
        }
        return $this->permiso;
    }
    function tomarMenus($usuario)
    {
        require_once 'Conexiones.php';
        /*Creamos la instancia del objeto. Ya estamos conectados*/
        $ds=  Conexiones::getInstance();
        //$pantalla ='usuarios.php';
        $sql='CALL sp_mostrar_menus (\''.$usuario.'\')';        
        
        /*Ejecutamos la query*/
        $rrsul=$ds->nuevointeno($sql);

    }
    
    function mostrarMenus($usuario)
    {
       //include_once ()'ConServidor.php')
        require_once 'ConServidor.php';
        $base = new ConServidor();        
        $datos = array();
        $sql='CALL sp_mostrar_menus (\''.$usuario.'\')';        
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit();
                        /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=0;
            while($obj = $resultado->fetch_object()){
                  $datos[$i] =array('Pantalla'=>$obj->Pantalla,'Link'=>$obj->Link,'Icono'=>$obj->icono) ;
                  $i++;
                    
            } 
                /* Observar que no se puede ejecutar ninguna función que interactue con el
                   servidor hasta que el conjunto de resultados se haya cerrado. Todas las llamadas devolverán un
                   error 'out of sync' */
                
            $resultado->close();
        }
        $mysqli->close();
        return $datos;
    }
    
    
   function  mostrarUsuarios()
   {
        require_once 'ConServidor.php';
        $base = new ConServidor();        
        $datos = array();
        $sql='CALL sp_ver_usurios ();';        
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit();
                        /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=0;
            $codificado="[";
            while($obj = $resultado->fetch_object()){
                  $datos[$i] =array('Rol'=>$obj->Rol,'Nombre'=>$obj->nombre,'Paterno'=>$obj->apaterno,'Materno'=>$obj->amaterno,'Usuario'=>$obj->usuario,'Colonia'=>$obj->colonia,'Telefono'=>$obj->telefono) ;
                  
                  if($obj->Contador == $i)
                  {
                      $codificado .= "[\"".$obj->Rol."\",\"".$obj->nombre."\",\"".$obj->apaterno."\",\"".$obj->amaterno."\",\"".$obj->usuario."\",\"".$obj->colonia."\",\"".$obj->telefono."\"]";
                  }
                  else
                  {
                      $codificado .= "[\"".$obj->Rol."\",\"".$obj->nombre."\",\"".$obj->apaterno."\",\"".$obj->amaterno."\",\"".$obj->usuario."\",\"".$obj->colonia."\",\"".$obj->telefono."\"],";
                  }
                  
                  
                  $i++;
                    
            } 
            $codificado.="]";
                /* Observar que no se puede ejecutar ninguna función que interactue con el
                   servidor hasta que el conjunto de resultados se haya cerrado. Todas las llamadas devolverán un
                   error 'out of sync' */
                
            $resultado->close();
        }
        $mysqli->close();
        return $codificado;
   }
   
   function tomarcatlogoRoles()
   {
       require_once 'ConServidor.php';
        $base = new ConServidor();        
        $datos = array();
        $sql='CALL sp_roles_vista ();';        
        $mysqli = new mysqli($base->getServidor(),$base->getUsuario(), $base->getPassword(), $base->getBasedeDatos());
        /* comprobar la conexión */
        if ($mysqli->connect_errno) {
            printf("Falló la conexión: %s\n", $mysqli->connect_error);
            exit();
                        /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
        }
        if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {                
            $i=0;            
            while($obj = $resultado->fetch_object()){
                  $datos[$i] =array('Id_rol'=>$obj->id_rol,'Rol'=>$obj->Rol);            
                  $i++;                    
            } 
            
                /* Observar que no se puede ejecutar ninguna función que interactue con el
                   servidor hasta que el conjunto de resultados se haya cerrado. Todas las llamadas devolverán un
                   error 'out of sync' */
                
            $resultado->close();
        }
        $mysqli->close();
        return $datos;
   }
    
}
