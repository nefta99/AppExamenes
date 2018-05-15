<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Maestra
 *
 * @author neftaly
 */
class Maestra {
    //put your code here
    private $link;
    
    public function link(){
        $ligas= "
        <script src='../csspracticas/cssinicio/jquery/jquery-3.2.1.min.js' type='text/javascript'></script>
        <script src='../csspracticas/cssinicio/inicio.js' type='text/javascript'></script>
        <link href='../csspracticas/cssinicio/inicio.css' rel='stylesheet' type='text/css'/>
        ";
        
        $this->link=$ligas;
        return $this->link;
    }
}
