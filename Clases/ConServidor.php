<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ConServidor
 *
 * @author nef
 */
class ConServidor {
    //put your code here
      private $servidor="localhost:3306";
      private $usuario='root';
      private $password='';
      private $base_datos='examene';
      
       
       /* 
       * 
       */
       function getServidor()
       {
           return $this->servidor;
       }
       function getUsuario()
       {
           return $this->usuario;
       }
       function getPassword()
       {
           return $this->password;
       }
       
       function getBasedeDatos()
       {
           return $this->base_datos;
       }
}
