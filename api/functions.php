<?php
/**
 * Handles the functioning and file connection.
 * 
 * @package Auction Web
 * @since 1.0.0
 */

 /**
  * Check if database connection is established. 
  *
  * @since 1.0.0
  *
  */
  if( !function_exists( 'is_db_connected' ) ) :
    function is_db_connected() {
        require 'connection.php';
        $status = new Connect_Database();
        $GLOBALS["CONNECTION"] = $status->connect;
        $bool = $status->is_db_connected();
        return $bool['status'];
    }
  endif;