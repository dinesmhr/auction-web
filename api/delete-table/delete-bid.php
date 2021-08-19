<?php
/**
 * Delete -  delete bid w.r.t GET parameters
 * 
 * @package Auction Web
 */

header("Access-Control-Allow-Origin: *");
require_once '../functions.php';
if( is_db_connected() ) {
  extract( $GLOBALS );
    $id = isset( $_GET['id'] ) ? $__GET['id'] : '';
    $bid_sql = 'UPDATE aw_bids SET bid_status="draft" WHERE bid_id="' .$id. '"';
    if ( $CONNECTION->query( $bid_sql ) === TRUE ) {
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