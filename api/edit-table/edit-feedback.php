<?php
/**
 * Edits -  create feedback record
 * 
 * @package Auction Web
 */
header("Access-Control-Allow-Origin: *");

// get posted input data
$decoded_data = json_decode(file_get_contents("php://input"), true );

require_once '../functions.php';
if( is_db_connected() ) {
  extract( $GLOBALS );
  $name     = isset( $decoded_data["name"] ) ? $decoded_data["name"] : '';
  $email    = isset( $decoded_data["email"] ) ? $decoded_data["email"] : '';
  $feedback = isset( $decoded_data["feedback"] ) ? $decoded_data["feedback"] : '';

  $feedback_sql = "INSERT INTO aw_feedbacks( email, name, feedback ) VALUES( '" .$email. "', '" .$name. "', '" .$feedback. "' )";
  if ( $CONNECTION->query( $feedback_sql ) === TRUE ) {
    $structure['status'] = true;
    $structure['message'] = 'Your feedback form is submitted';
  } else {
    $structure['status'] = false;
    $structure['message'] = 'Error in creating new record';
  }
} else {
    $structure['status'] = false;
    $structure['message'] = 'Database connection error';
}
echo json_encode( $structure );