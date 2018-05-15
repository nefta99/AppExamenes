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
      private $servidor="nefmaker.com";
      private $usuario='logerdod';
      private $password='nef123loginFederation';
      private $base_datos='PaginasCreator';
      
       
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
