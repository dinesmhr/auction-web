<?php
/**
 * Update -  bid status with get parameter
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");
if( !isset( $_GET['id'] ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once '../functions.php';
if( is_db_connected() ) {
  extract( $GLOBALS );
    $status   = isset( $_GET['status'] ) ? $_GET['status'] : 'sold_out';
    $bid_sql = 'UPDATE aw_bids SET bid_status="' .$status. '" WHERE id="' .$_GET['id']. '"';
    if ( $CONNECTION->query( $bid_sql ) === TRUE ) {
        $structure['status'] = true;
        $structure['message'] = 'Record updated successfully';
      } else {
        $structure['status'] = false;
        $structure['message'] = 'Error in updating record';
      }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );