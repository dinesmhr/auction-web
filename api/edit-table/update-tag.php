<?php
/**
 * Edits -  update tag w.r.t GET parameters
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

  $tag_sql = "UPDATE aw_tags SET title = '" .$title. "' WHERE id='" .$id. "'";
  if ( $CONNECTION->query( $tag_sql ) === TRUE ) {
    $structure['status'] = true;
    $structure['message'] = 'Your tag details update';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );