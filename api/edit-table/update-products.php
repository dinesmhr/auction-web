<?php
/**
 * Edits -  create, update, modify and delete users w.r.t GET parameters
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
  $id       = isset( $decoded_data["id"] ) ? $decoded_data["id"] : '';
  $title    = isset( $decoded_data["title"] ) ? $decoded_data["title"] : '';
  $description  = isset( $decoded_data["description"] ) ? $decoded_data["description"] : '';
  $specifications = isset( $decoded_data["specifications"] ) ? serialize( $decoded_data["specifications"] ) : '';
  $initialBid     = isset( $decoded_data["initialBid"] ) ? $decoded_data["initialBid"] : '';
  $maxBid         = isset( $decoded_data["maxBid"] ) ? $decoded_data["maxBid"] : '';
  $deadlineDate   = isset( $decoded_data["deadlineDate"] ) ? serialize( $decoded_data["deadlineDate"] ) : '';
  $images         = isset( $decoded_data["images"] ) ? $decoded_data["images"] : '';

  foreach( $images as $image ) :
    if( isset( $image['dataUrl'] ) ) {
      if( !empty($image['dataUrl']) && !file_exists($image['dataUrl']) ) {
        $image_parts = explode(";base64,", $image['dataUrl']);
          $image_base64 = base64_decode($image_parts[1]);
          $filedir = '../../uploads/' .date("Y"). '/';
          if( !is_dir( $filedir ) ) {
            mkdir($filedir);
          }
          if( !defined('UPLOAD_DIR') ) {
            define( 'UPLOAD_DIR', $filedir );
          }
          $image_type_aux = explode("image/", $image_parts[0]);
          $image_type = $image_type_aux[1];
          $file = UPLOAD_DIR . uniqid() . '.' .$image_type;
          file_put_contents( $file, $image_base64 );
          $images_path[] = $file;
      } else {
        $images_path[] = $image['dataUrl'];
      }
    } else {
      $images_path[] = '';
    }
  endforeach;
  $product_sql = "UPDATE aw_products SET title = '" .$title. "', description = '" .$description. "', specifications = '" .$specifications. "', initial_bid = '" .$initialBid. "', max_bid = '" .$maxBid. "', deadline_date = '" .$deadlineDate. "', images_path = '" .serialize($images_path). "' WHERE id = '" .$id. "'";
  if ( $CONNECTION->query( $product_sql ) === TRUE ) {
    $structure['status'] = true;
    $structure['message'] = 'Your product form is submitted. Your product is under verification!! Thank you for your patience';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );