<?php
/**
 * Edits -  create, update, modify and delete tags w.r.t GET parameters
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
  $title    = isset( $decoded_data["title"] ) ? $decoded_data["title"] : '';

  $tag_sql = "INSERT INTO aw_tags( title ) VALUES( '" .$title. "' )";
  if ( $CONNECTION->query( $tag_sql ) === TRUE ) {
    $structure['status'] = true;
    $structure['message'] = 'Your tag details added';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );