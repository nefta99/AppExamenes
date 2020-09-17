<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Ambientes
 *
 * @author L03036903
 */
class Ambientes {
    //put your code here
    private $ambi="DEVL"; /*  DEVL || PROD   */
    
    function getAmbiente()
       {
           return $this->ambi;
       }
     
}
