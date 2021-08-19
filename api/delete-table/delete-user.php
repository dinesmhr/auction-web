<?php
/**
 * Delete -  delete users w.r.t GET parameters
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once '../functions.php';

if( is_db_connected() ) {
  extract( $GLOBALS );
    $id = isset( $_GET['id'] ) ? $_GET['id'] : '';
    $user_sql = 'UPDATE aw_users SET status="draft" WHERE id="' .$id. '"';
    if ( $CONNECTION->query( $user_sql ) === TRUE ) {
        $structure['status'] = true;
        $structure['message'] = 'Record deleted successfully';
      } else {
        $structure['status'] = false;
        $structure['message'] = 'Error in deleting new record';
      }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );