<?php
/**
 * Update -  product status with get parameter
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
    $status   = isset( $_GET['status'] ) ? $_GET['status'] : 'verified';
    $product_sql = 'UPDATE products SET status="' .$status. '" WHERE id="' .$_GET['id']. '"';
    if ( $CONNECTION->query( $product_sql ) === TRUE ) {
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