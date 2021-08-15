<?php
/**
 * Edits -  create bids w.r.t POST parameters
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");

// get posted input data
$decoded_data = json_decode(file_get_contents("php://input"), true );
if( !isset( $decoded_data["submit"] ) ) {
    $structure['status'] = false;
    $structure['message'] = 'Insufficient parameters';
    echo json_encode( $structure );
    return;
}

require_once '../functions.php';
if( is_db_connected() ) {
  extract( $GLOBALS );
  $userId   = isset( $decoded_data["userId"] ) ? $decoded_data["userId"] : '';
  $productId   = isset( $decoded_data["productId"] ) ? $decoded_data["productId"] : '';
  $bid_amount       = isset( $decoded_data["bid_amount"] ) ? $decoded_data["bid_amount"] : '';
  $bid_difference   = isset( $decoded_data["bid_difference"] ) ? $decoded_data["bid_difference"] : '';
  $bid_status       = isset( $decoded_data["bid_status"] ) ? $decoded_data["bid_status"] : 'active';
  $action           = isset( $decoded_data["action"] ) ? $decoded_data["action"] : '';
  if( isset( $decoded_data["action"] ) ) {
    $bid_status = 'win';
    $product_update_sql = "UPDATE aw_products SET status = 'bid_success' WHERE id = '" .$productId. "'";
    $CONNECTION->query( $product_update_sql );
    // update previous bid status
    $bid_update_sql = "UPDATE aw_bids SET bid_status = 'bid_lose' WHERE product_id = '" .$productId. "'";
    $CONNECTION->query( $bid_update_sql );
  } else {
    // update previous bid status
    $bid_update_sql = "UPDATE aw_bids SET bid_status = 'beat' WHERE product_id = '" .$productId. "'";
    $CONNECTION->query( $bid_update_sql );
  }

  $bid_sql = "INSERT INTO aw_bids( user_id, product_id, bid_amount, bid_difference, bid_status) VALUES( '" .$userId. "', '" .$productId. "','" .$bid_amount. "', '" .$bid_difference. "', '" .$bid_status. "')";

  if ( $CONNECTION->query( $bid_sql ) === TRUE ) {
    $structure['status'] = true;
    $structure['message'] = 'Your bid is created';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );