<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Conexiones
 *
 * @author nef
 */
class Conexiones {
   //put your code here
        private $servidor="nefmaker.com";
        private $usuario='logerdod';
        private $password='nef123loginFederation';
        private $base_datos='PaginasCreator';
        private $link;
        private $stmt;
        private $array;
        
        static $_instance;
        /*La función construct es privada para evitar que el objeto pueda ser creado mediante new*/
        private function __construct(){
          $this->conectar();
        }
      
        /*Evitamos el clonaje del objeto. Patrón Singleton*/
        private function __clone(){ }

       
        /*Función encargada de crear, si es necesario, el objeto. Esta es la función que debemos llamar desde fuera de la clase para instanciar el objeto, y así, poder utilizar sus métodos*/
        public static function getInstance(){
            if (!(self::$_instance instanceof self)){
                self::$_instance=new self();
            }
            return self::$_instance;
        }
        /*Realiza la conexión a la base de datos.*/
        private function conectar(){
           $this->link=mysql_connect($this->servidor, $this->usuario, $this->password);
           mysql_select_db($this->base_datos,$this->link);
           @mysql_query("SET NAMES 'utf8'");
        }

    
        /*Método para ejecutar una sentencia sql*/
       public function ejecutar($sql){
           $this->stmt=mysql_query($sql,$this->link) or die(mysql_error());
           return $this->stmt;

       }
    
    public function nuevointeno($sql){
           $datos = array();
           $mysqli = new mysqli($this->servidor, $this->usuario, $this->password, $this->base_datos);
           /* comprobar la conexión */
            if ($mysqli->connect_errno) {
                printf("Falló la conexión: %s\n", $mysqli->connect_error);
                exit();
                        /* Si se ha de recuperar una gran cantidad de datos se emplea MYSQLI_USE_RESULT */
            }
            if ($resultado = $mysqli->query($sql, MYSQLI_USE_RESULT)) {
                
                $i=0;
                while($obj = $resultado->fetch_object()){
                    $datos[$i] =array('Pantalla'=>$obj->Pantalla,'Link'=>$obj->Link) ;
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
       
        /*Método para obtener una fila de resultados de la sentencia sql*/
       public function obtener_fila($stmt,$fila){
         if ($fila==0){
            $this->array=mysql_fetch_array($stmt);
         }else{
            mysql_data_seek($stmt,$fila);
            $this->array=mysql_fetch_array($stmt);
         }
         return $this->array;
       }

       //Devuelve el último id del insert introducido
       public function lastID(){
        return mysql_insert_id($this->link);
       }
       
}